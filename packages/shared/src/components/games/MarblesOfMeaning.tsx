import React from 'react';
import styles from './MarblesOfMeaning.module.css';

interface MarblesOfMeaningProps {
  onComplete: (stars: number) => void;
  currentStars: number;
}

const MarblesOfMeaning: React.FC<MarblesOfMeaningProps> = ({ onComplete, currentStars }) => {
  return (
    <div className={styles.container}>
      <h2>弹珠游戏</h2>
      <p>Coming soon...</p>
    </div>
  );
};

export default MarblesOfMeaning; 