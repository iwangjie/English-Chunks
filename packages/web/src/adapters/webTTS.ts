import type { TTSAdapter, TTSOptions } from '@english-chunks/shared';

export class WebTTSAdapter implements TTSAdapter {
  private async getOpenAISpeechSettings(): Promise<{ apiUrl: string; apiKey: string } | null> {
    if (typeof window === 'undefined') return null;

    const savedSettings = localStorage.getItem('openAISpeechSettings');
    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch (error) {
        console.error('Error parsing OpenAI speech settings:', error);
      }
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
    if (typeof window === 'undefined') return;

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
    if (typeof window === 'undefined') return;

    try {
      const openAISettings = await this.getOpenAISpeechSettings();
      if (openAISettings?.apiUrl && openAISettings?.apiKey) {
        await this.playOpenAITTS(text);
      } else {
        await this.playBrowserTTS(text, options);
      }
    } catch (error) {
      console.error('Error playing TTS:', error);
      // Fallback to browser TTS
      await this.playBrowserTTS(text, options);
    }
  }

  async stop(): Promise<void> {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
  }

  async getVoices(): Promise<string[]> {
    if (typeof window === 'undefined') return [];
    return window.speechSynthesis.getVoices().map(v => v.name);
  }
}
