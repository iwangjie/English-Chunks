import React, { useState } from 'react';
import styles from './ChunkCard.module.css';
import type { Chunk } from '@/services/chunkService';
import MarkdownRenderer from './MarkdownRenderer';
import YouGlishModal from './YouGlishModal';

interface ChunkProps {
    chunk: Chunk;
}

const ChunkCard: React.FC<ChunkProps> = ({ chunk }) => {
    const [isYouGlishOpen, setIsYouGlishOpen] = useState(false);

    // Ensure chunk has all required properties with default values
    const safeChunk = {
        chunk: chunk.chunk || '',
        pronunciation: chunk.pronunciation || '',
        chinese_meaning: chunk.chinese_meaning || '',
        suitable_scenes: Array.isArray(chunk.suitable_scenes) ? chunk.suitable_scenes : [],
    };

    const playAudio = () => {
        // 从localStorage获取设置
        const savedSettings = localStorage.getItem('userSettings');
        let voice = 'en-US-JennyNeural';
        let speed = 1.0;

        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                voice = settings.voice || voice;
                speed = settings.speed || speed;
            } catch (error) {
                console.error('Error parsing settings:', error);
            }
        }

        const utterance = new SpeechSynthesisUtterance(safeChunk.chunk);
        utterance.lang = 'en-US';
        utterance.rate = speed;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.voice = window.speechSynthesis.getVoices().find(v => v.name === voice) || null;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardContent} onClick={playAudio}>
                    <h3 className={styles.chunk}>{safeChunk.chunk}</h3>
                    <p className={styles.pronunciation}>{safeChunk.pronunciation}</p>
                    <p className={styles.meaning}>{safeChunk.chinese_meaning}</p>
                    {safeChunk.suitable_scenes.length > 0 && (
                        <div className={styles.scenes}>
                            {safeChunk.suitable_scenes.map((scene, index) => (
                                <span key={index} className={styles.scene}>
                                    {scene}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.cardActions}>
                    <button 
                        className={styles.actionButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsYouGlishOpen(true);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                    </button>
                    <button className={styles.actionButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button className={styles.actionButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.5 5H9.5a3.5 3.5 0 0 0-3.5 3.5v9A3.5 3.5 0 0 0 9.5 21h8a3.5 3.5 0 0 0 3.5-3.5v-9a3.5 3.5 0 0 0-3.5-3.5z"></path>
                            <path d="M14.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                            <path d="M18 8.5h.5"></path>
                        </svg>
                    </button>
                    <button className={styles.actionButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <YouGlishModal
                isOpen={isYouGlishOpen}
                onClose={() => setIsYouGlishOpen(false)}
                query={safeChunk.chunk}
            />
        </>
    );
};

export default ChunkCard; 