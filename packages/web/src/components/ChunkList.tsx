'use client';

import React, { useEffect, useState } from 'react';
import ChunkCard from './ChunkCard';
import { getChunks } from '@/services/chunkService';
import type { Chunk } from '@/services/chunkService';
import styles from './ChunkList.module.css';

const ChunkList = () => {
    const [chunks, setChunks] = useState<Chunk[]>([]);

    useEffect(() => {
        const loadChunks = async () => {
            const data = await getChunks();
            setChunks(data);
        };

        loadChunks();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>English Chunks Practice</h1>
            <div className={styles.grid}>
                {chunks.map((chunk, index) => (
                    <ChunkCard key={index} chunk={chunk} />
                ))}
            </div>
        </div>
    );
};

export default ChunkList; 