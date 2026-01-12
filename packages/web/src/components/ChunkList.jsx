import React from 'react';
import ChunkCard from './ChunkCard';
import { chunks } from '../data/chunks';
import styles from './ChunkList.module.css';

const ChunkList = () => {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {chunks.map((chunk, index) => (
                    <ChunkCard key={index} chunk={chunk} />
                ))}
            </div>
        </div>
    );
};

export default ChunkList; 