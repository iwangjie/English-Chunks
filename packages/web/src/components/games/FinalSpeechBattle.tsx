import React from 'react';
import styles from './FinalSpeechBattle.module.css';

interface FinalSpeechBattleProps {
  onComplete: (stars: number) => void;
  currentStars: number;
}

const FinalSpeechBattle: React.FC<FinalSpeechBattleProps> = ({ onComplete, currentStars }) => {
  return (
    <div className={styles.container}>
      <h2>最终演讲对决</h2>
      <p>Coming soon...</p>
    </div>
  );
};

export default FinalSpeechBattle; 