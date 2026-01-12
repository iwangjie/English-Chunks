// Storage adapter interface
export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

// TTS adapter interface
export interface TTSOptions {
  voice?: string;
  speed?: number;
  pitch?: number;
  volume?: number;
}

export interface TTSAdapter {
  speak(text: string, options?: TTSOptions): Promise<void>;
  stop(): Promise<void>;
  getVoices(): Promise<string[]>;
}

// Audio recording adapter interface
export interface AudioRecordingAdapter {
  startRecording(): Promise<void>;
  stopRecording(): Promise<Blob>;
  isRecording(): boolean;
}

// Navigation adapter interface
export interface NavigationAdapter {
  navigate(path: string): void;
  getCurrentPath(): string;
}

// Platform type
export type PlatformType = 'web' | 'desktop';

// Combined platform adapters
export interface PlatformAdapters {
  storage: StorageAdapter;
  tts: TTSAdapter;
  audio?: AudioRecordingAdapter;
  navigation: NavigationAdapter;
  platform: PlatformType;
}
