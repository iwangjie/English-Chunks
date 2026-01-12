import React from 'react';
import styles from './GlassBridgeGrammar.module.css';

interface GlassBridgeGrammarProps {
  onComplete: (stars: number) => void;
  currentStars: number;
}

const GlassBridgeGrammar: React.FC<GlassBridgeGrammarProps> = ({ onComplete, currentStars }) => {
  return (
    <div className={styles.container}>
      <h2>玻璃桥游戏</h2>
      <p>Coming soon...</p>
    </div>
  );
};

export default GlassBridgeGrammar; 