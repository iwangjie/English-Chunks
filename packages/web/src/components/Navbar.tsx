'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import styles from './Navbar.module.css';

const GitHubIcon = () => (
    <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
);

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoLink}>
                    <Logo />
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
                        <Link href="/" className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`}>
                            首页
                        </Link>
                        <Link href="/scenes" className={`${styles.menuItem} ${pathname === '/scenes' ? styles.active : ''}`}>
                            场景练习
                        </Link>
                        <Link href="/pronunciation" className={`${styles.menuItem} ${pathname === '/pronunciation' ? styles.active : ''}`}>
                            发音纠错
                        </Link>
                        <Link href="/squid-game" className={`${styles.menuItem} ${pathname === '/squid-game' ? styles.active : ''}`}>
                            鱿鱼游戏
                        </Link>
                        <Link href="/about" className={`${styles.menuItem} ${pathname === '/about' ? styles.active : ''}`}>
                            关于
                        </Link>
                        <Link href="/settings" className={`${styles.menuItem} ${pathname === '/settings' ? styles.active : ''}`}>
                            设置
                        </Link>
                    </div>

                    <a
                        href="https://github.com/iwangjie/english-chunks"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#4B5563',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F3F4F6';
                            e.currentTarget.style.color = '#2563EB';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#4B5563';
                        }}
                    >
                        <GitHubIcon />
                    </a>

                    <button 
                        className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
} 