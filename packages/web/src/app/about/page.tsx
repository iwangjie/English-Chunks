'use client';

import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>关于英语块</h1>

            <section className={styles.section}>
                <h2>什么是英语块？</h2>
                <p>
                    英语块是一个创新的英语学习工具，专注于帮助学习者掌握地道的英语表达方式。
                    不同于传统的单词或句子学习，我们将实用的英语表达切分成易于理解和记忆的"块"，
                    让你能够更自然地组织语言，提升口语表达能力。
                </p>
            </section>

            <section className={styles.section}>
                <h2>核心功能</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>智能提取</strong>
                        <p>从任意英语文本中自动提取适合初学者的英语表达块，包含发音、含义和使用场景。</p>
                    </li>
                    <li>
                        <strong>场景化学习</strong>
                        <p>每个英语块都标注了适用的场景，帮助你在正确的语境中使用这些表达。</p>
                    </li>
                    <li>
                        <strong>发音指导</strong>
                        <p>集成了 YouGlish 视频学习系统，让你能看到母语者如何在实际对话中使用这些表达。</p>
                    </li>
                    <li>
                        <strong>播放控制</strong>
                        <p>支持视频速度调节、重播和跳转功能，方便反复练习和深入学习。</p>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>学习建议</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>循序渐进</strong>
                        <p>从简单的日常对话场景开始，逐步过渡到更复杂的表达方式。</p>
                    </li>
                    <li>
                        <strong>情境记忆</strong>
                        <p>注意每个英语块的使用场景，在相似场景中尝试运用。</p>
                    </li>
                    <li>
                        <strong>反复练习</strong>
                        <p>使用 YouGlish 观看不同母语者的发音和用法，帮助加深理解。</p>
                    </li>
                    <li>
                        <strong>实践应用</strong>
                        <p>将学到的英语块融入日常对话，通过实践来巩固记忆。</p>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>技术特点</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>AI 驱动</strong>
                        <p>使用先进的 AI 技术智能分析和提取有价值的英语表达块。</p>
                    </li>
                    <li>
                        <strong>实时处理</strong>
                        <p>支持实时文本分析和英语块提取，快速获取学习材料。</p>
                    </li>
                    <li>
                        <strong>视频集成</strong>
                        <p>无缝集成 YouGlish 视频学习系统，提供丰富的真实语言环境。</p>
                    </li>
                    <li>
                        <strong>响应式设计</strong>
                        <p>完美适配各种设备，随时随地学习英语。</p>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>未来规划</h2>
                <p>
                    我们将持续优化和扩展英语块的功能，计划添加更多学习工具和练习模式，
                    打造更完整的英语学习生态系统。欢迎提供反馈和建议，帮助我们做得更好！
                </p>
            </section>
        </div>
    );
} 