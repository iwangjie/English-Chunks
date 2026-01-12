interface SpeechSettings {
    voice: string;
    speed: number;
}

interface OpenAISpeechSettings {
    apiUrl: string;
    apiKey: string;
}

const isBrowser = typeof window !== 'undefined';

export class SpeechUtils {
    private static async getSettings(): Promise<SpeechSettings> {
        const defaultSettings: SpeechSettings = {
            voice: 'en-US-JennyNeural',
            speed: 1.0
        };

        if (!isBrowser) return defaultSettings;

        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                return {
                    voice: settings.voice || defaultSettings.voice,
                    speed: settings.speed || defaultSettings.speed
                };
            } catch (error) {
                console.error('Error parsing settings:', error);
            }
        }
        return defaultSettings;
    }

    private static async getOpenAISpeechSettings(): Promise<OpenAISpeechSettings | null> {
        if (!isBrowser) return null;

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

    private static async playBrowserTTS(text: string): Promise<void> {
        if (!isBrowser) return;

        const settings = await this.getSettings();
        const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, ''));
        utterance.lang = 'en-US';
        utterance.rate = settings.speed;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.voice = window.speechSynthesis.getVoices().find(v => v.name === settings.voice) || null;
        window.speechSynthesis.speak(utterance);
    }

    private static async playOpenAITTS(text: string): Promise<void> {
        if (!isBrowser) return;

        const settings = await this.getOpenAISpeechSettings();
        if (!settings) {
            throw new Error('OpenAI speech settings not configured');
        }

        try {
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
        } catch (error) {
            console.error('Error playing OpenAI TTS:', error);
            throw error;
        }
    }

    public static async playTTS(text: string): Promise<void> {
        if (!isBrowser) return;

        try {
            const openAISettings = await this.getOpenAISpeechSettings();
            if (openAISettings?.apiUrl && openAISettings?.apiKey) {
                await this.playOpenAITTS(text);
            } else {
                await this.playBrowserTTS(text);
            }
        } catch (error) {
            console.error('Error playing TTS:', error);
            // 如果 OpenAI TTS 失败，回退到浏览器 TTS
            await this.playBrowserTTS(text);
        }
    }
} 