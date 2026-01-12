'use client';

import React, { useEffect, useState } from 'react';
import styles from './SettingsForm.module.css';

// 定义设置的类型
interface Settings {
    ai: {
        provider: 'openai' | 'gemini';
        apiKey: string;
        apiUrl: string;
        modelName: string;
    };
    englishLevel: string;
    voice: string;
    speed: number;
}

interface OpenAISpeechSettings {
    apiUrl: string;
    apiKey: string;
}

// 默认设置
const defaultSettings: Settings = {
    ai: {
        provider: 'openai',
        apiKey: '',
        apiUrl: 'https://api-proxy.me/openai',
        modelName: 'gpt-4o',
    },
    englishLevel: 'elementary',
    voice: 'en-US-JennyNeural',
    speed: 1.0,
};

// 英语等级选项
const englishLevels = [
    { value: 'kindergarten', label: '英语幼儿园' },
    { value: 'elementary', label: '英语小学生' },
    { value: 'junior', label: '英语初中生' },
    { value: 'university', label: '英语大学生' },
    { value: 'postdoc', label: '英语博士后' },
];

// Edge TTS 音色列表
const voices = [
    'en-US-JennyNeural',
    'en-US-GuyNeural',
    'en-GB-SoniaNeural',
    'en-GB-RyanNeural',
    'en-AU-NatashaNeural',
    'en-AU-WilliamNeural',
    'en-CA-ClaraNeural',
    'en-CA-LiamNeural',
];

const SettingsForm = () => {
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [message, setMessage] = useState('');
    const [openAISpeechSettings, setOpenAISpeechSettings] = useState<OpenAISpeechSettings>({
        apiUrl: '',
        apiKey: ''
    });

    // 加载设置
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings({
                    ...defaultSettings,
                    ...parsed,
                    ai: {
                        ...defaultSettings.ai,
                        ...(parsed.ai || {}),
                    }
                });
            } catch (error) {
                console.error('Error loading settings:', error);
                setSettings(defaultSettings);
            }
        }

        const savedOpenAISpeechSettings = localStorage.getItem('openAISpeechSettings');
        if (savedOpenAISpeechSettings) {
            try {
                setOpenAISpeechSettings(JSON.parse(savedOpenAISpeechSettings));
            } catch (error) {
                console.error('Error parsing OpenAI speech settings:', error);
            }
        }
    }, []);

    // 保存设置
    const saveSettings = () => {
        try {
            localStorage.setItem('userSettings', JSON.stringify(settings));
            setMessage('设置已保存');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage('保存设置失败');
        }
    };

    // 导出用户数据
    const exportData = () => {
        try {
            const data = {
                settings,
                // 这里可以添加其他需要导出的用户数据
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'user-data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting data:', error);
            setMessage('导出数据失败');
        }
    };

    const handleOpenAISpeechSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOpenAISpeechSettings(prev => {
            const newSettings = {
                ...prev,
                [name]: value
            };
            localStorage.setItem('openAISpeechSettings', JSON.stringify(newSettings));
            return newSettings;
        });
    };

    return (
        <div className={styles.form}>
            <section className={styles.section}>
                <h2>AI 设置</h2>
                <div className={styles.field}>
                    <label htmlFor="provider">AI 提供商</label>
                    <select
                        id="provider"
                        value={settings.ai.provider}
                        onChange={(e) => setSettings({
                            ...settings,
                            ai: { ...settings.ai, provider: e.target.value as 'openai' | 'gemini' }
                        })}
                    >
                        <option value="openai">OpenAI</option>
                        <option value="gemini">Gemini</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="apiKey">API Key</label>
                    <input
                        type="password"
                        id="apiKey"
                        value={settings.ai.apiKey}
                        onChange={(e) => setSettings({
                            ...settings,
                            ai: { ...settings.ai, apiKey: e.target.value }
                        })}
                        placeholder={`输入你的 ${settings.ai.provider === 'openai' ? 'OpenAI' : 'Gemini'} API Key`}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="apiUrl">API URL</label>
                    <input
                        type="text"
                        id="apiUrl"
                        value={settings.ai.apiUrl}
                        onChange={(e) => setSettings({
                            ...settings,
                            ai: { ...settings.ai, apiUrl: e.target.value }
                        })}
                        placeholder={`输入 ${settings.ai.provider === 'openai' ? 'OpenAI' : 'Gemini'} API 的URL`}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="modelName">模型名称</label>
                    <input
                        type="text"
                        id="modelName"
                        value={settings.ai.modelName}
                        onChange={(e) => setSettings({
                            ...settings,
                            ai: { ...settings.ai, modelName: e.target.value }
                        })}
                        placeholder="输入模型名称，如 gpt-3.5-turbo"
                    />
                </div>
            </section>

            <section className={styles.section}>
                <h2>英语等级</h2>
                <div className={styles.field}>
                    <select
                        value={settings.englishLevel}
                        onChange={(e) => setSettings({
                            ...settings,
                            englishLevel: e.target.value
                        })}
                    >
                        {englishLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            <section className={styles.section}>
                <h2>语音设置</h2>
                <div className={styles.field}>
                    <label htmlFor="voice">发音音色</label>
                    <select
                        id="voice"
                        value={settings.voice}
                        onChange={(e) => setSettings({
                            ...settings,
                            voice: e.target.value
                        })}
                    >
                        {voices.map((voice) => (
                            <option key={voice} value={voice}>
                                {voice}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.field}>
                    <label htmlFor="speed">发音速度: {settings.speed}</label>
                    <input
                        type="range"
                        id="speed"
                        min="0.4"
                        max="1.0"
                        step="0.1"
                        value={settings.speed}
                        onChange={(e) => setSettings({
                            ...settings,
                            speed: parseFloat(e.target.value)
                        })}
                    />
                </div>
            </section>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>OpenAI 语音配置（可选）</h2>
                <div className={styles.field}>
                    <label htmlFor="openai-speech-api-url">API 地址：</label>
                    <input
                        type="text"
                        id="openai-speech-api-url"
                        name="apiUrl"
                        value={openAISpeechSettings.apiUrl}
                        onChange={handleOpenAISpeechSettingsChange}
                        placeholder="https://api.openai.com/v1/audio/speech"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="openai-speech-api-key">API Key：</label>
                    <input
                        type="password"
                        id="openai-speech-api-key"
                        name="apiKey"
                        value={openAISpeechSettings.apiKey}
                        onChange={handleOpenAISpeechSettingsChange}
                        placeholder="sk-..."
                    />
                </div>
            </div>

            <div className={styles.actions}>
                <button onClick={saveSettings} className={styles.saveButton}>
                    保存设置
                </button>
                <button onClick={exportData} className={styles.exportButton}>
                    导出数据
                </button>
            </div>

            {message && <div className={styles.message}>{message}</div>}
        </div>
    );
};

export default SettingsForm; 