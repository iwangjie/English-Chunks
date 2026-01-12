'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { levels, GameLevel } from '@/data/gameLevels';
import WordDalgona from '@/components/games/WordDalgona';
import TugOfTongues from '@/components/games/TugOfTongues';
import MarblesOfMeaning from '@/components/games/MarblesOfMeaning';
import GlassBridgeGrammar from '@/components/games/GlassBridgeGrammar';
import RedLightGreenLight from '@/components/games/RedLightGreenLight';
import FinalSpeechBattle from '@/components/games/FinalSpeechBattle';
import styles from './page.module.css';

interface GameProgress {
  currentLevel: number;
  stars: number;
  levelStars: { [key: number]: number };
}

export default function LevelPage({ params }: { params: { levelId: string } }) {
  const router = useRouter();
  const levelId = parseInt(params.levelId);
  const level = levels.find(l => l.id === levelId);
  
  const [progress, setProgress] = useState<GameProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('squidGameProgress');
      return saved ? JSON.parse(saved) : {
        currentLevel: 1,
        stars: 0,
        levelStars: {}
      };
    }
    return {
      currentLevel: 1,
      stars: 0,
      levelStars: {}
    };
  });

  useEffect(() => {
    if (!level) {
      router.push('/squid-game');
      return;
    }

    const index = levels.findIndex(l => l.id === levelId);
    if (index > progress.currentLevel || progress.stars < level.minStars) {
      router.push('/squid-game');
    }
  }, [level, levelId, progress.currentLevel, progress.stars, router]);

  const handleGameComplete = (earnedStars: number) => {
    const newProgress = {
      ...progress,
      stars: progress.stars + earnedStars - (progress.levelStars[levelId] || 0),
      levelStars: {
        ...progress.levelStars,
        [levelId]: earnedStars
      }
    };
    
    if (earnedStars === 3 && levelId === progress.currentLevel) {
      newProgress.currentLevel = Math.min(levels.length - 1, progress.currentLevel + 1);
    }
    
    setProgress(newProgress);
    localStorage.setItem('squidGameProgress', JSON.stringify(newProgress));
  };

  if (!level) return null;

  const GameComponent = {
    1: WordDalgona,
    2: TugOfTongues,
    3: MarblesOfMeaning,
    4: GlassBridgeGrammar,
    5: RedLightGreenLight,
    6: FinalSpeechBattle
  }[level.id];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{level.name}</h1>
      <div className={styles.gameContainer}>
        {GameComponent && (
          <GameComponent
            onComplete={handleGameComplete}
            currentStars={progress.levelStars[levelId] || 0}
          />
        )}
      </div>
      <button 
        className={styles.backButton}
        onClick={() => router.push('/squid-game')}
      >
        返回关卡选择
      </button>
    </div>
  );
} 