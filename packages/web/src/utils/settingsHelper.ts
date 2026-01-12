import { useRouter } from 'next/navigation';

interface AISettings {
    provider: 'openai' | 'gemini';
    apiKey: string;
    apiUrl: string;
    modelName: string;
}

export const checkAndRedirectAPISettings = (
    aiSettings: AISettings | undefined,
    router: ReturnType<typeof useRouter>
): boolean => {
    if (!aiSettings || 
        !aiSettings.apiKey || 
        !aiSettings.apiUrl || 
        !aiSettings.modelName) {
        router.push('/settings');
        alert('请先配置API设置（API Key、API URL和模型名称）');
        return false;
    }
    return true;
}; 