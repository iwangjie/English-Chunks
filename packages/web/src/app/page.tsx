'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        <span className={styles.gradientText}>英语学习助手</span>
                        <div className={styles.subtitle}>AI驱动的英语学习体验</div>
                    </h1>
                    <p className={styles.description}>
                        通过场景对话和发音练习提升你的英语水平
                    </p>
                </div>
                <div className={styles.heroGraphic}>
                    <svg className={styles.blob} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#2563EB" d="M45.7,-58.9C59.9,-51.4,72.5,-38.6,77.7,-23.1C82.9,-7.6,80.8,10.6,73.1,25.9C65.4,41.2,52.1,53.6,37.4,60.9C22.7,68.2,6.6,70.3,-8.6,67.9C-23.8,65.5,-38.1,58.5,-50.5,48.1C-62.9,37.7,-73.4,23.8,-76.3,8.1C-79.2,-7.6,-74.5,-25.1,-64.2,-37.8C-53.9,-50.5,-38,-58.4,-23,-62.7C-8,-67,-4,-67.7,6.3,-66.1C16.6,-64.5,31.5,-66.5,45.7,-58.9Z" transform="translate(100 100)" />
                    </svg>
                    <div className={styles.iconGrid}>
                        <div className={`${styles.icon} ${styles.iconFloat1}`}>🎯</div>
                        <div className={`${styles.icon} ${styles.iconFloat2}`}>🗣️</div>
                        <div className={`${styles.icon} ${styles.iconFloat3}`}>🎓</div>
                        <div className={`${styles.icon} ${styles.iconFloat4}`}>🔊</div>
                    </div>
                </div>
            </div>

            <div className={styles.features}>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <svg className={styles.featureSvg} viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                        </svg>
                    </div>
                    <h2>场景练习</h2>
                    <p>选择或自定义场景，生成地道的英语对话。支持：</p>
                    <ul>
                        <li>日常对话场景</li>
                        <li>职场沟通场景</li>
                        <li>自定义场景内容</li>
                        <li>智能抽取英语短语</li>
                    </ul>
                    <Link href="/scenes" className={styles.button}>
                        开始练习
                    </Link>
                </div>

                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <svg className={styles.featureSvg} viewBox="0 0 24 24">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
                        </svg>
                    </div>
                    <h2>发音纠错</h2>
                    <p>练习常用英语表达的发音。包含：</p>
                    <ul>
                        <li>常见口语缩读</li>
                        <li>标准发音示例</li>
                        <li>录音对比功能</li>
                        <li>详细发音要点</li>
                    </ul>
                    <Link href="/pronunciation" className={styles.button}>
                        练习发音
                    </Link>
                </div>
            </div>

            <div className={styles.settings}>
                <div className={styles.settingsIcon}>
                    <svg className={styles.featureSvg} viewBox="0 0 24 24">
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                    </svg>
                </div>
                <h2>个性化设置</h2>
                <p>根据你的需求自定义学习体验：</p>
                <ul>
                    <li>选择 AI 模型（OpenAI/Gemini）</li>
                    <li>调整英语难度级别</li>
                    <li>设置发音语音和速度</li>
                    <li>配置 OpenAI 语音服务</li>
                </ul>
                <Link href="/settings" className={styles.button}>
                    调整设置
                </Link>
            </div>
        </div>
    );
}
