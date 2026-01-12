import type { TTSAdapter, TTSOptions } from '@english-chunks/shared';
import { invoke } from '@tauri-apps/api/core';

interface OpenAISpeechSettings {
  apiUrl: string;
  apiKey: string;
}

export class TauriTTSAdapter implements TTSAdapter {
  private async getOpenAISpeechSettings(): Promise<OpenAISpeechSettings | null> {
    try {
      const result = await invoke<string | null>('get_item', { key: 'openAISpeechSettings' });
      if (result) {
        return JSON.parse(result);
      }
    } catch (error) {
      console.error('Error getting OpenAI speech settings:', error);
    }
    return null;
  }

  private async playBrowserTTS(text: string, options?: TTSOptions): Promise<void> {
    if (typeof window === 'undefined') return;

    const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, ''));
    utterance.lang = 'en-US';
    utterance.rate = options?.speed ?? 1;
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;

    if (options?.voice) {
      utterance.voice = window.speechSynthesis.getVoices().find(v => v.name === options.voice) || null;
    }

    window.speechSynthesis.speak(utterance);
  }

  private async playOpenAITTS(text: string): Promise<void> {
    const settings = await this.getOpenAISpeechSettings();
    if (!settings) {
      throw new Error('OpenAI speech settings not configured');
    }

    const response = await fetch(settings.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${settings.apiKey}`
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text.replace(/\*\*/g, ''),
        voice: 'alloy'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get audio from OpenAI');
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    await audio.play();
  }

  async speak(text: string, options?: TTSOptions): Promise<void> {
    try {
      const openAISettings = await this.getOpenAISpeechSettings();
      if (openAISettings?.apiUrl && openAISettings?.apiKey) {
        await this.playOpenAITTS(text);
      } else {
        // Try native TTS first, fall back to browser TTS
        try {
          await invoke('speak', { text, options });
        } catch {
          await this.playBrowserTTS(text, options);
        }
      }
    } catch (error) {
      console.error('Error playing TTS:', error);
      // Fallback to browser TTS
      await this.playBrowserTTS(text, options);
    }
  }

  async stop(): Promise<void> {
    try {
      await invoke('stop_speaking');
    } catch {
      // Fallback to browser
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    }
  }

  async getVoices(): Promise<string[]> {
    try {
      const voices = await invoke<{ id: string; name: string }[]>('get_voices');
      if (voices.length > 0) {
        return voices.map(v => v.name);
      }
    } catch {
      // Fallback to browser voices
    }

    if (typeof window !== 'undefined') {
      return window.speechSynthesis.getVoices().map(v => v.name);
    }
    return [];
  }
}
