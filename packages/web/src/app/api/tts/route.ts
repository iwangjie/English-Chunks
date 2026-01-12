import { NextResponse } from 'next/server';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.text) {
            return NextResponse.json(
                { message: 'Text is required' },
                { status: 400 }
            );
        }

        // 创建音频配置
        const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
        
        // 创建语音配置
        const speechConfig = sdk.SpeechConfig.fromEndpoint(
            new URL('wss://eastus.api.cognitive.microsoft.com/sts/v1.0/issuetoken'),
            ''  // 不需要密钥，因为我们使用的是免费服务
        );
        
        // 设置语音参数
        speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
        
        // 创建语音合成器
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        // 构建 SSML
        const ssml = `
            <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
                   xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US">
                <voice name="en-US-JennyNeural">
                    <prosody rate="+0%" pitch="+0Hz">
                        ${body.text}
                    </prosody>
                </voice>
            </speak>
        `.trim();

        // 合成音频
        const result = await new Promise<sdk.SpeechSynthesisResult>((resolve, reject) => {
            synthesizer.speakSsmlAsync(
                ssml,
                result => {
                    synthesizer.close();
                    resolve(result);
                },
                error => {
                    synthesizer.close();
                    reject(error);
                }
            );
        });

        // 将 ArrayBuffer 转换为 Uint8Array 以获取长度
        const audioData = new Uint8Array(result.audioData);

        // 检查结果
        if (audioData.length === 0) {
            throw new Error('No audio data generated');
        }

        // 返回音频数据
        return new NextResponse(audioData, {
            headers: {
                'Content-Type': 'audio/wav',
                'Content-Length': audioData.length.toString(),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch (error) {
        console.error('TTS Error:', error);
        return NextResponse.json(
            { 
                message: 'Error generating speech', 
                error: error instanceof Error ? error.message : String(error)
            },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );
    }
}

export async function OPTIONS(request: Request) {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
} 