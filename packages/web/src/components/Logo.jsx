import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="10" height="10" rx="2" fill="#2563EB" />
                <rect x="18" y="4" width="10" height="10" rx="2" fill="#3B82F6" opacity="0.8" />
                <rect x="4" y="18" width="10" height="10" rx="2" fill="#60A5FA" opacity="0.6" />
                <rect x="18" y="18" width="10" height="10" rx="2" fill="#93C5FD" opacity="0.4" />
            </svg>
            <span className={styles.logoText}>英语块</span>
        </div>
    );
};

export default Logo; 