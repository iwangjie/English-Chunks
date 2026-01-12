import React from 'react';
import styles from './RedLightGreenLight.module.css';

interface RedLightGreenLightProps {
  onComplete: (stars: number) => void;
  currentStars: number;
}

const RedLightGreenLight: React.FC<RedLightGreenLightProps> = ({ onComplete, currentStars }) => {
  return (
    <div className={styles.container}>
      <h2>红绿灯游戏</h2>
      <p>Coming soon...</p>
    </div>
  );
};

export default RedLightGreenLight; 