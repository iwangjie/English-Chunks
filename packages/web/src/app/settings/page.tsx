'use client';

import React from 'react';
import SettingsForm from '@/components/SettingsForm';
import styles from './page.module.css';

export default function SettingsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>设置</h1>
            <SettingsForm />
        </div>
    );
} 