import React, { useState, useEffect, useCallback } from 'react';
import styles from './WordDalgona.module.css';

interface Props {
  onComplete: (stars: number) => void;
  currentStars: number;
}

const DIFFICULTY_SETTINGS = {
  1: { timeLimit: 60, wordLength: 5, mistakes: 3 },
  2: { timeLimit: 45, wordLength: 7, mistakes: 2 },
  3: { timeLimit: 30, wordLength: 9, mistakes: 1 }
};

const WORD_LISTS = {
  1: ['HELLO', 'WORLD', 'APPLE', 'SMILE', 'HAPPY', 'LEARN'],
  2: ['PROGRAM', 'ENGLISH', 'STUDENT', 'TEACHER', 'READING'],
  3: ['EDUCATION', 'CHALLENGE', 'KNOWLEDGE', 'ADVENTURE', 'EXCELLENT']
};

const WordDalgona: React.FC<Props> = ({ onComplete, currentStars }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [difficulty, setDifficulty] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [crackedPattern, setCrackedPattern] = useState<boolean[][]>([]);

  const initializeGame = (diff: number) => {
    const words = WORD_LISTS[diff as keyof typeof WORD_LISTS];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setRevealedLetters(new Array(randomWord.length).fill(false));
    setMistakes(0);
    setTimeLeft(DIFFICULTY_SETTINGS[diff as keyof typeof DIFFICULTY_SETTINGS].timeLimit);
    setScore(0);
    setDifficulty(diff);
    setGameState('playing');
    
    // 创建达尔戈纳饼干的裂纹模式
    const pattern = Array(10).fill(null).map(() => 
      Array(10).fill(false)
    );
    setCrackedPattern(pattern);
  };

  const handleLetterClick = (index: number) => {
    if (revealedLetters[index] || gameState !== 'playing') return;

    const newRevealedLetters = [...revealedLetters];
    newRevealedLetters[index] = true;
    setRevealedLetters(newRevealedLetters);

    // 添加裂纹效果
    const newPattern = crackedPattern.map(row => [...row]);
    const centerX = Math.floor(Math.random() * 10);
    const centerY = Math.floor(Math.random() * 10);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const x = centerX + i;
        const y = centerY + j;
        if (x >= 0 && x < 10 && y >= 0 && y < 10) {
          newPattern[x][y] = true;
        }
      }
    }
    setCrackedPattern(newPattern);

    // 检查是否完成单词
    const isWordComplete = newRevealedLetters.every(letter => letter);
    if (isWordComplete) {
      setScore(prev => prev + difficulty);
      if (score + 1 >= 5 && difficulty < 3) {
        setDifficulty(prev => prev + 1);
        initializeGame(difficulty + 1);
      } else {
        initializeGame(difficulty);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [timeLeft, gameState]);

  const endGame = () => {
    setGameState('end');
    let stars = 1;
    if (score >= 10) stars = 2;
    if (score >= 15) stars = 3;
    onComplete(stars);
  };

  return (
    <div className={styles.container}>
      {gameState === 'start' && (
        <div className={styles.startScreen}>
          <h2>单词达尔戈纳</h2>
          <p>小心翼翼地"刻出"正确的单词，不要弄碎糖饼！</p>
          <p>当前最高星星数: {currentStars}⭐</p>
          <div className={styles.difficultyButtons}>
            <button onClick={() => initializeGame(1)}>简单模式</button>
            <button onClick={() => initializeGame(2)}>中等模式</button>
            <button onClick={() => initializeGame(3)}>困难模式</button>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className={styles.gameScreen}>
          <div className={styles.gameInfo}>
            <div>时间: {timeLeft}s</div>
            <div>得分: {score}</div>
            <div>难度: {difficulty}</div>
          </div>
          
          <div className={styles.dalgona}>
            <div className={styles.cracksOverlay}>
              {crackedPattern.map((row, i) => (
                <div key={i} className={styles.crackRow}>
                  {row.map((cracked, j) => (
                    <div 
                      key={j} 
                      className={`${styles.crackCell} ${cracked ? styles.cracked : ''}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.word}>
              {currentWord.split('').map((letter, index) => (
                <div
                  key={index}
                  className={`${styles.letter} ${revealedLetters[index] ? styles.revealed : ''}`}
                  onClick={() => handleLetterClick(index)}
                >
                  {revealedLetters[index] ? letter : '?'}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {gameState === 'end' && (
        <div className={styles.endScreen}>
          <h2>游戏结束!</h2>
          <p>最终得分: {score}</p>
          <button onClick={() => setGameState('start')}>再玩一次</button>
        </div>
      )}
    </div>
  );
};

export default WordDalgona; 