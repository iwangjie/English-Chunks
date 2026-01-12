import { SettingsForm } from '@english-chunks/shared';

export default function SettingsPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>设置</h1>
      <SettingsForm />
    </main>
  );
}
