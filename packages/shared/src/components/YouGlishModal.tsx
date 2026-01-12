import React, { useEffect, useRef, useState } from 'react';
import styles from './YouGlishModal.module.css';

declare global {
    interface Window {
        YG: any;
        onYouglishAPIReady: () => void;
    }
}

interface YouGlishModalProps {
    isOpen: boolean;
    onClose: () => void;
    query: string;
}

const YouGlishModal: React.FC<YouGlishModalProps> = ({ isOpen, onClose, query }) => {
    const widgetRef = useRef<HTMLDivElement>(null);
    const widgetInstanceRef = useRef<any>(null);
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);

    useEffect(() => {
        if (!isOpen) return;

        window.onYouglishAPIReady = () => {
            if (widgetRef.current) {
                initializeWidget();
            }
        };

        if (window.YG) {
            initializeWidget();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://youglish.com/public/emb/widget.js';
        script.async = true;

        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            if (widgetInstanceRef.current) {
                try {
                    widgetInstanceRef.current.close();
                } catch (e) {
                    console.error('Error closing widget:', e);
                }
                widgetInstanceRef.current = null;
            }
        };
    }, [isOpen, query]);

    const initializeWidget = () => {
        if (!widgetRef.current || !query) return;

        try {
            if (widgetInstanceRef.current) {
                widgetInstanceRef.current.close();
                widgetInstanceRef.current = null;
            }

            widgetInstanceRef.current = new window.YG.Widget(widgetRef.current.id, {
                width: Math.floor(widgetRef.current.clientWidth),
                height: Math.floor(widgetRef.current.clientHeight),
                components: 1847,
                events: {
                    'onFetchDone': (event: any) => {
                        setTotalResults(event.totalResult);
                        if (event.totalResult === 0) {
                            console.log("No results found");
                        }
                    },
                    'onVideoChange': (event: any) => {
                        setCurrentTrack(event.trackNumber);
                    },
                    'onError': (event: any) => {
                        console.error("YouGlish error:", event);
                    }
                }
            });

            setTimeout(() => {
                if (widgetInstanceRef.current) {
                    widgetInstanceRef.current.fetch(query, "english");
                }
            }, 0);
        } catch (error) {
            console.error('Error initializing widget:', error);
        }
    };

    const handleSpeedChange = (speed: number) => {
        if (widgetInstanceRef.current) {
            widgetInstanceRef.current.setSpeed(speed);
            setCurrentSpeed(speed);
        }
    };

    const handlePrevious = () => {
        if (widgetInstanceRef.current) {
            widgetInstanceRef.current.previous();
        }
    };

    const handleNext = () => {
        if (widgetInstanceRef.current) {
            widgetInstanceRef.current.next();
        }
    };

    const handleReplay = () => {
        if (widgetInstanceRef.current) {
            widgetInstanceRef.current.replay();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div className={styles.header}>
                    <h3>YouGlish - "{query}"</h3>
                    <div className={styles.trackInfo}>
                        {totalResults > 0 && (
                            <span>Video {currentTrack} of {totalResults}</span>
                        )}
                    </div>
                </div>

                <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapper}>
                        <div id="youglish-widget" ref={widgetRef}></div>
                    </div>
                    <div className={styles.controlsWrapper}>
                        <div className={styles.controls}>
                            <div className={styles.speedControls}>
                                <span>Speed:</span>
                                {[0.5, 0.75, 1, 1.25, 1.5].map(speed => (
                                    <button
                                        key={speed}
                                        className={`${styles.speedButton} ${currentSpeed === speed ? styles.active : ''}`}
                                        onClick={() => handleSpeedChange(speed)}
                                    >
                                        {speed}x
                                    </button>
                                ))}
                            </div>
                            <div className={styles.navigationControls}>
                                <button onClick={handlePrevious} className={styles.navButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                                    </svg>
                                    Previous
                                </button>
                                <button onClick={handleReplay} className={styles.navButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                        <path d="M3 3v5h5"/>
                                    </svg>
                                    Replay
                                </button>
                                <button onClick={handleNext} className={styles.navButton}>
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouGlishModal; 