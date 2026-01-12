// Chunk types
export interface Chunk {
  chunk: string;
  pronunciation: string;
  chinese_meaning: string;
  suitable_scenes: string[];
}

// Scene types
export interface Scene {
  id: string;
  title: string;
  description: string;
  icon: string;
  isCustom?: boolean;
}

// Game types
export interface GameLevel {
  id: number;
  name: string;
  description: string;
  icon: string;
  minStars: number;
}

// AI Config types
export interface AIConfig {
  provider: 'openai' | 'gemini';
  apiKey: string;
  apiUrl: string;
  modelName: string;
  englishLevel: string;
}

export interface AISettings {
  provider: 'openai' | 'gemini';
  apiKey: string;
  apiUrl: string;
  modelName: string;
}

// Speech types
export interface SpeechSettings {
  voice: string;
  speed: number;
}

export interface OpenAISpeechSettings {
  apiUrl: string;
  apiKey: string;
}

// User settings
export interface UserSettings {
  voice: string;
  speed: number;
  englishLevel: string;
  aiSettings?: AISettings;
  openAISpeechSettings?: OpenAISpeechSettings;
}

// Scene response from AI
export interface SceneResponse {
  dialogue: string;
  chunks: Chunk[];
}

// Game progress
export interface GameProgress {
  totalStars: number;
  completedLevels: number[];
  levelScores: Record<number, number>;
}
