import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { scenes } from '@/data/scenes';
import { generateSceneContent } from '@/services/aiService';
import { checkAndRedirectAPISettings } from '@/utils/settingsHelper';
import ChunkCard from './ChunkCard';
import MarkdownRenderer from './MarkdownRenderer';
import styles from './SceneList.module.css';

const SceneList = () => {
    const router = useRouter();
    const [selectedScene, setSelectedScene] = useState<string | null>(null);
    const [chunks, setChunks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dialogue, setDialogue] = useState<string>('');
    const [processingStep, setProcessingStep] = useState<'idle' | 'generating'>('idle');
    const [progress, setProgress] = useState(0);
    const [customSceneInput, setCustomSceneInput] = useState('');
    const [additionalContext, setAdditionalContext] = useState('');
    const [isDialogueExpanded, setIsDialogueExpanded] = useState(false);

    const handleSceneClick = async (sceneId: string) => {
        setSelectedScene(sceneId);
        setAdditionalContext('');  // 清空附加信息
        if (sceneId === 'custom') {
            return;
        }

        const savedSettings = localStorage.getItem('userSettings');
        if (!savedSettings) {
            router.push('/settings');
            alert('请先配置API设置');
            return;
        }

        const settings = JSON.parse(savedSettings);
        if (!checkAndRedirectAPISettings(settings.ai, router)) {
            return;
        }
    };

    const handleSceneSubmit = async () => {
        if (selectedScene === 'custom' && !customSceneInput.trim()) return;

        const savedSettings = localStorage.getItem('userSettings');
        if (!savedSettings) {
            router.push('/settings');
            alert('请先配置API设置');
            return;
        }

        const settings = JSON.parse(savedSettings);
        if (!checkAndRedirectAPISettings(settings.ai, router)) {
            return;
        }

        await generateSceneDialogue(selectedScene!, selectedScene === 'custom' ? customSceneInput : undefined);
    };

    const generateSceneDialogue = async (sceneId: string, customPrompt?: string) => {
        setLoading(true);
        setError(null);
        setDialogue('');
        setChunks([]);
        setProgress(0);
        setProcessingStep('generating');

        try {
            const savedSettings = localStorage.getItem('userSettings');
            if (!savedSettings) {
                throw new Error('请先在设置中配置 API 信息');
            }

            const settings = JSON.parse(savedSettings);
            const config = {
                provider: settings.ai.provider,
                apiKey: settings.ai.apiKey,
                apiUrl: settings.ai.apiUrl,
                modelName: settings.ai.modelName,
                englishLevel: settings.englishLevel
            };

            const scene = scenes.find(s => s.id === sceneId);
            if (!scene && !customPrompt) return;

            // 构建完整的场景描述
            let sceneDescription = customPrompt || scene!.title;
            if (additionalContext && sceneId !== 'custom') {
                sceneDescription += ` (Additional context: ${additionalContext})`;
            }

            const result = await generateSceneContent(
                sceneDescription,
                config,
                (dialogueText) => {
                    setDialogue(dialogueText);
                    setProgress(Math.min(90, (dialogueText.length / 500) * 90));
                }
            );

            setDialogue(result.dialogue);
            setChunks(result.chunks);
            setProgress(100);
            setProcessingStep('idle');
            setIsDialogueExpanded(false);

        } catch (err) {
            console.error('Error generating scene content:', err);
            setError(err instanceof Error ? err.message : '生成内容时出错');
            setSelectedScene(null);
            setProcessingStep('idle');
        } finally {
            setLoading(false);
        }
    };

    const getLoadingMessage = () => {
        return processingStep === 'generating' ? '正在生成内容...' : '';
    };

    const getSceneInputPlaceholder = (sceneId: string) => {
        const scene = scenes.find(s => s.id === sceneId);
        if (!scene) return '';
        
        switch (sceneId) {
            case 'custom':
                return '请输入你想练习的具体场景，例如：在咖啡店点一杯拿铁';
            case 'chat':
                return '可以补充具体对象，例如：和同事、和老婆、和朋友等';
            case 'interview':
                return '可以补充具体职位，例如：Java程序员、产品经理、设计师等';
            default:
                return `可以补充具体场景细节，丰富对话内容`;
        }
    };

    return (
        <div className={styles.container}>
            {!selectedScene ? (
                <div className={styles.grid}>
                    {scenes.map((scene) => (
                        <div
                            key={scene.id}
                            className={styles.sceneCard}
                            onClick={() => handleSceneClick(scene.id)}
                        >
                            <div className={styles.icon} dangerouslySetInnerHTML={{ __html: scene.icon }} />
                            <h3>{scene.title}</h3>
                            <p>{scene.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.dialogueContainer}>
                    <button
                        className={styles.backButton}
                        onClick={() => {
                            setSelectedScene(null);
                            setChunks([]);
                            setDialogue('');
                            setProcessingStep('idle');
                            setCustomSceneInput('');
                            setAdditionalContext('');
                            setProgress(0);
                        }}
                    >
                        返回场景列表
                    </button>

                    <div className={styles.sceneInputContainer}>
                        {selectedScene === 'custom' ? (
                            <input
                                type="text"
                                className={styles.sceneInput}
                                value={customSceneInput}
                                onChange={(e) => setCustomSceneInput(e.target.value)}
                                placeholder={getSceneInputPlaceholder('custom')}
                            />
                        ) : (
                            <input
                                type="text"
                                className={styles.sceneInput}
                                value={additionalContext}
                                onChange={(e) => setAdditionalContext(e.target.value)}
                                placeholder={getSceneInputPlaceholder(selectedScene)}
                            />
                        )}
                        <button
                            className={styles.generateButton}
                            onClick={handleSceneSubmit}
                            disabled={(selectedScene === 'custom' && !customSceneInput.trim()) || loading}
                        >
                            生成对话
                        </button>
                    </div>

                    {processingStep !== 'idle' && (
                        <div className={styles.loading}>
                            {getLoadingMessage()}
                            <div className={styles.progressContainer}>
                                <div 
                                    className={styles.progressBar} 
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            {processingStep === 'generating' && dialogue && (
                                <div className={styles.dialoguePreview}>
                                    <MarkdownRenderer content={dialogue} />
                                </div>
                            )}
                        </div>
                    )}
                    
                    {error && <div className={styles.error}>{error}</div>}
                    
                    {dialogue && (
                        <>
                            <div className={styles.dialogueCollapse}>
                                <div 
                                    className={styles.dialogueHeader}
                                    onClick={() => setIsDialogueExpanded(!isDialogueExpanded)}
                                >
                                    <span>原始对话{isDialogueExpanded ? ' (点击收起)' : ' (点击展开)'}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            transform: isDialogueExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                                <div className={`${styles.dialogueContent} ${isDialogueExpanded ? styles.expanded : ''}`}>
                                    <MarkdownRenderer content={dialogue} />
                                </div>
                            </div>
                            {chunks.length > 0 && (
                                <div className={styles.chunksGrid}>
                                    {chunks.map((chunk, index) => (
                                        <ChunkCard key={index} chunk={chunk} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SceneList; 