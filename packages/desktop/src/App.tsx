import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { PlatformProvider, type PlatformAdapters } from '@english-chunks/shared';
import { TauriStorageAdapter, TauriTTSAdapter, TauriNavigationAdapter } from './adapters';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ScenesPage from './pages/ScenesPage';
import PronunciationPage from './pages/PronunciationPage';
import SettingsPage from './pages/SettingsPage';
import SquidGamePage from './pages/SquidGamePage';
import GameLevelPage from './pages/GameLevelPage';
import AboutPage from './pages/AboutPage';

function AppContent() {
  const navigate = useNavigate();

  const adapters: PlatformAdapters = {
    storage: new TauriStorageAdapter(),
    tts: new TauriTTSAdapter(),
    navigation: new TauriNavigationAdapter(navigate),
    platform: 'desktop',
  };

  return (
    <PlatformProvider adapters={adapters}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenes" element={<ScenesPage />} />
        <Route path="/pronunciation" element={<PronunciationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/squid-game" element={<SquidGamePage />} />
        <Route path="/squid-game/:levelId" element={<GameLevelPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </PlatformProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
