import { useParams, useNavigate } from 'react-router-dom';

export default function GameLevelPage() {
  const { levelId } = useParams();
  const navigate = useNavigate();

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/squid-game')}
        style={{
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          background: '#f3f4f6',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        返回关卡列表
      </button>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        关卡 {levelId}
      </h1>
      <p>游戏内容即将推出...</p>
    </main>
  );
}
