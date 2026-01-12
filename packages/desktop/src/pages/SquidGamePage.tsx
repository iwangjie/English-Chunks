import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLevel, levels, useStorage } from '@english-chunks/shared';

export default function SquidGamePage() {
  const navigate = useNavigate();
  const storage = useStorage();
  const [totalStars, setTotalStars] = useState(0);
  const [levelScores, setLevelScores] = useState<Record<number, number>>({});

  useEffect(() => {
    const loadProgress = async () => {
      const progress = await storage.getItem('gameProgress');
      if (progress) {
        const parsed = JSON.parse(progress);
        setTotalStars(parsed.totalStars || 0);
        setLevelScores(parsed.levelScores || {});
      }
    };
    loadProgress();
  }, [storage]);

  const handleLevelClick = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (level && totalStars >= level.minStars) {
      navigate(`/squid-game/${levelId}`);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>鱿鱼游戏</h1>
        <p style={{ color: '#666' }}>总星数: {totalStars} ⭐</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {levels.map((level) => (
          <GameLevel
            key={level.id}
            level={level}
            isLocked={totalStars < level.minStars}
            onClick={() => handleLevelClick(level.id)}
            earnedStars={levelScores[level.id] ?? 0}
          />
        ))}
      </div>
    </main>
  );
}
