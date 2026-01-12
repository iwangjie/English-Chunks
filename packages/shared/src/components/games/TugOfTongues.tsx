import React from 'react';
import styles from './TugOfTongues.module.css';

interface TugOfTonguesProps {
  onComplete: (stars: number) => void;
  currentStars: number;
}

const TugOfTongues: React.FC<TugOfTonguesProps> = ({ onComplete, currentStars }) => {
  return (
    <div className={styles.container}>
      <h2>拔河游戏</h2>
      <p>Coming soon...</p>
    </div>
  );
};

export default TugOfTongues; 