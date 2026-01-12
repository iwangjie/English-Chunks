import { SceneList } from '@english-chunks/shared';

export default function ScenesPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>场景练习</h1>
      <SceneList />
    </main>
  );
}
