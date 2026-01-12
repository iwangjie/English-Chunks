'use client';

import React, { useState, useRef } from 'react';
import styles from './page.module.css';
import { SpeechUtils } from '@/utils/speechUtils';

const commonSentences = [
    {
        text: "I'd like a **cup of coffee**, please.",
        translation: "我想要一杯咖啡，谢谢。",
        focus: "注意 'd like 的连读和 coffee 的重音",
        context: "在咖啡店点餐",
        formality: "通用",
        emphasis: ["cup of coffee"]
    },
    {
        text: "**Could you** repeat that, please?",
        translation: "请您再说一遍好吗？",
        focus: "注意 Could you 的弱读，通常发音类似 'Cud ya'",
        context: "听不清对方说话时",
        formality: "礼貌正式",
        emphasis: ["Could you"]
    },
    {
        text: "**What do you do** for a living?",
        translation: "你是做什么工作的？",
        focus: "注意 What do you 的连读，通常发音类似 'Whaddya'",
        context: "初次见面社交场合",
        formality: "通用",
        emphasis: ["What do you do"]
    },
    {
        text: "**Nice to meet** you!",
        translation: "很高兴见到你！",
        focus: "注意 Nice to 的连读，meet 的重音",
        context: "初次见面",
        formality: "通用",
        emphasis: ["Nice to meet"]
    },
    {
        text: "I'm **gonna** go to the **movies**.",
        translation: "我要去看电影。",
        focus: "注意 gonna 是 going to 的口语形式，movies 的重音在第一个音节",
        context: "日常对话",
        formality: "非正式",
        emphasis: ["gonna", "movies"]
    },
    {
        text: "**Would you mind** if I opened the window?",
        translation: "介意我开一下窗户吗？",
        focus: "注意 Would you 的连读，mind 的语调上扬",
        context: "请求许可",
        formality: "正式礼貌",
        emphasis: ["Would you mind"]
    },
    {
        text: "**What's up** with you?",
        translation: "你最近怎么样？",
        focus: "注意 What's up 的连读，通常发音类似 'Wassup'",
        context: "朋友间打招呼",
        formality: "非常非正式",
        emphasis: ["What's up"]
    },
    {
        text: "I **should've** done it earlier.",
        translation: "我早该做这件事的。",
        focus: "注意 should've 的缩读，不要发成 should of",
        context: "表达后悔",
        formality: "通用",
        emphasis: ["should've"]
    },
    {
        text: "**Lemme** think about it.",
        translation: "让我想想。",
        focus: "注意 Lemme 是 Let me 的口语形式",
        context: "需要时间思考时",
        formality: "非正式",
        emphasis: ["Lemme"]
    },
    {
        text: "**Gimme** a minute.",
        translation: "给我一分钟。",
        focus: "注意 Gimme 是 Give me 的口语形式",
        context: "需要一点时间时",
        formality: "非正式",
        emphasis: ["Gimme"]
    },
    {
        text: "I **dunno** what to do.",
        translation: "我不知道该怎么办。",
        focus: "注意 dunno 是 don't know 的口语形式",
        context: "表达困惑",
        formality: "非正式",
        emphasis: ["dunno"]
    },
    {
        text: "**Wanna** grab some lunch?",
        translation: "想去吃午饭吗？",
        focus: "注意 Wanna 是 want to 的口语形式",
        context: "邀请用餐",
        formality: "非正式",
        emphasis: ["Wanna"]
    },
    {
        text: "**Gotta** run, catch you later!",
        translation: "我得走了，回头见！",
        focus: "注意 Gotta 是 got to 的口语形式",
        context: "匆忙离开",
        formality: "非正式",
        emphasis: ["Gotta"]
    },
    {
        text: "**How've** you been?",
        translation: "你最近怎么样？",
        focus: "注意 How've 的缩读，是 How have 的缩写",
        context: "问候",
        formality: "通用",
        emphasis: ["How've"]
    },
    {
        text: "**D'you** know what I mean?",
        translation: "你明白我的意思吗？",
        focus: "注意 D'you 是 Do you 的口语缩读",
        context: "确认理解",
        formality: "非正式",
        emphasis: ["D'you"]
    },
    {
        text: "I **could've** sworn I put it here.",
        translation: "我发誓我把它放在这里了。",
        focus: "注意 could've 的缩读，是 could have 的缩写",
        context: "表达确信",
        formality: "通用",
        emphasis: ["could've"]
    },
    {
        text: "**What're** you up to?",
        translation: "你在忙什么呢？",
        focus: "注意 What're 是 What are 的缩读",
        context: "询问近况",
        formality: "非正式",
        emphasis: ["What're"]
    },
    {
        text: "**Where've** you been?",
        translation: "你去哪儿了？",
        focus: "注意 Where've 是 Where have 的缩读",
        context: "询问去向",
        formality: "通用",
        emphasis: ["Where've"]
    },
    {
        text: "**Ain't** that the truth!",
        translation: "可不是嘛！",
        focus: "注意 Ain't 是 isn't/aren't 的���正式用法",
        context: "表示赞同",
        formality: "非常非正式",
        emphasis: ["Ain't"]
    },
    {
        text: "**Y'all** ready?",
        translation: "你们都准备好了吗？",
        focus: "注意 Y'all 是 you all 的南方口语",
        context: "询问准备情况",
        formality: "非正式",
        emphasis: ["Y'all"]
    },
    {
        text: "I'm **kinda** tired.",
        translation: "我有点累。",
        focus: "注意 kinda 是 kind of 的口语形式",
        context: "表达状态",
        formality: "非正式",
        emphasis: ["kinda"]
    },
    {
        text: "It's **sorta** like that.",
        translation: "有点像那样。",
        focus: "注意 sorta 是 sort of 的口语形式",
        context: "做比较",
        formality: "非正式",
        emphasis: ["sorta"]
    },
    {
        text: "**Whatcha** doing?",
        translation: "你在做什么？",
        focus: "注意 Whatcha 是 What are you 的口语形式",
        context: "询问当前活动",
        formality: "非正式",
        emphasis: ["Whatcha"]
    },
    {
        text: "**How come** you didn't tell me?",
        translation: "你怎么没告诉我？",
        focus: "注意 How come 是 Why 的口语替代",
        context: "询问原因",
        formality: "非正式",
        emphasis: ["How come"]
    },
    {
        text: "**C'mere** for a second.",
        translation: "过来一下。",
        focus: "注意 C'mere 是 Come here 的口语缩读",
        context: "叫人过来",
        formality: "非正式",
        emphasis: ["C'mere"]
    },
    {
        text: "**D'ya** wanna come with?",
        translation: "你想一起来吗？",
        focus: "注意 D'ya 是 Do you 的口语缩读",
        context: "邀请",
        formality: "非正式",
        emphasis: ["D'ya"]
    },
    {
        text: "I'm **fixin' to** leave.",
        translation: "我准备要走了。",
        focus: "注意 fixin' to 是南方口语，表示 preparing to",
        context: "表达即将行动",
        formality: "非正式",
        emphasis: ["fixin' to"]
    },
    {
        text: "**Betcha** can't do it!",
        translation: "我打赌你做不到！",
        focus: "注意 Betcha 是 I bet you 的口语缩读",
        context: "打赌挑战",
        formality: "非正式",
        emphasis: ["Betcha"]
    },
    {
        text: "**Wouldja** mind moving?",
        translation: "你介意挪一下吗？",
        focus: "注意 Wouldja 是 Would you 的口语缩读",
        context: "礼貌请求",
        formality: "非正式",
        emphasis: ["Wouldja"]
    },
    {
        text: "**Didja** hear about that?",
        translation: "你听说那件事了吗？",
        focus: "注意 Didja 是 Did you 的口语缩读",
        context: "询问消息",
        formality: "非正式",
        emphasis: ["Didja"]
    },
    {
        text: "**Hafta** go now.",
        translation: "现在必须走了。",
        focus: "注意 Hafta 是 have to 的口语形式",
        context: "表达必要性",
        formality: "非正式",
        emphasis: ["Hafta"]
    },
    {
        text: "**S'pose** we should start.",
        translation: "我想我们该开始了。",
        focus: "注意 S'pose 是 Suppose 的口语缩读",
        context: "提出建议",
        formality: "非正式",
        emphasis: ["S'pose"]
    },
    {
        text: "**Imma** head out.",
        translation: "我要走了。",
        focus: "注意 Imma 是 I am going to 的极度口语形式",
        context: "表达离开意图",
        formality: "非常非正式",
        emphasis: ["Imma"]
    },
    {
        text: "**How'd** you do that?",
        translation: "你是怎么做到的？",
        focus: "注意 How'd 是 How did 的缩读",
        context: "询问方法",
        formality: "通用",
        emphasis: ["How'd"]
    },
    {
        text: "**What'd** you say?",
        translation: "你说什么？",
        focus: "注意 What'd 是 What did 的缩读",
        context: "请求重复",
        formality: "通用",
        emphasis: ["What'd"]
    },
    {
        text: "**Where'd** you get that?",
        translation: "你从哪里得到的？",
        focus: "注意 Where'd 是 Where did 的缩读",
        context: "询问来源",
        formality: "通用",
        emphasis: ["Where'd"]
    },
    {
        text: "**When're** we leaving?",
        translation: "我们什么时候走？",
        focus: "注意 When're 是 When are 的缩读",
        context: "询问时间",
        formality: "通用",
        emphasis: ["When're"]
    },
    {
        text: "**Who're** you waiting for?",
        translation: "你在等谁？",
        focus: "注意 Who're 是 Who are 的缩读",
        context: "询问对象",
        formality: "通用",
        emphasis: ["Who're"]
    },
    {
        text: "**That'll** work.",
        translation: "那样可以。",
        focus: "注意 That'll 是 That will 的缩读",
        context: "表示同意",
        formality: "通用",
        emphasis: ["That'll"]
    },
    {
        text: "**It'll** be fine.",
        translation: "会没事的。",
        focus: "注意 It'll 是 It will 的缩读",
        context: "安慰",
        formality: "通用",
        emphasis: ["It'll"]
    },
    {
        text: "**They'll** be here soon.",
        translation: "他们很快就到。",
        focus: "注意 They'll 是 They will 的缩读",
        context: "预测",
        formality: "通用",
        emphasis: ["They'll"]
    },
    {
        text: "**We'll** see about that.",
        translation: "那就走着瞧吧。",
        focus: "注意 We'll 是 We will 的缩读",
        context: "表示怀疑",
        formality: "通用",
        emphasis: ["We'll"]
    },
    {
        text: "**I'll** get back to you.",
        translation: "我稍后回复你。",
        focus: "注意 I'll 是 I will 的缩读",
        context: "承诺回复",
        formality: "通用",
        emphasis: ["I'll"]
    },
    {
        text: "**You'll** love it!",
        translation: "你会喜欢的！",
        focus: "注意 You'll 是 You will 的缩读",
        context: "表达确信",
        formality: "通用",
        emphasis: ["You'll"]
    }
];

export default function PronunciationPage() {
    const [recordings, setRecordings] = useState<{[key: number]: string}>({});
    const [recordingIndex, setRecordingIndex] = useState<number | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const startRecording = async (index: number) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setRecordings(prev => ({
                    ...prev,
                    [index]: url
                }));
            };

            mediaRecorder.current.start();
            setRecordingIndex(index);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('无法访问麦克风，请确保已授予权限。');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && recordingIndex !== null) {
            mediaRecorder.current.stop();
            setRecordingIndex(null);
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const playEdgeTTS = async (text: string) => {
        try {
            await SpeechUtils.playTTS(text);
        } catch (error) {
            console.error('Error playing TTS:', error);
            alert('播放语音失败，请检查语音设置。');
        }
    };

    const renderText = (text: string, emphasisWords: string[]) => {
        let result = text;
        emphasisWords.forEach(word => {
            const pattern = new RegExp(`\\*\\*(${word})\\*\\*`, 'g');
            result = result.replace(pattern, (_, p1) => `<a href="https://youglish.com/pronounce/${encodeURIComponent(p1)}" target="_blank" class="${styles.emphasisLink}">${p1}</a>`);
        });
        return <div dangerouslySetInnerHTML={{ __html: result }} />;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>发音纠错练习</h1>
            <p className={styles.description}>
                选择句子练习发音，点击加粗部分可以查看更多发音示例。
            </p>

            <div className={styles.sentenceList}>
                {commonSentences.map((sentence, index) => (
                    <div key={index} className={styles.sentenceCard}>
                        <div className={styles.sentenceHeader}>
                            <div className={styles.sentenceText}>
                                {renderText(sentence.text, sentence.emphasis)}
                            </div>
                            <div className={styles.controls}>
                                <button 
                                    className={styles.playButton}
                                    onClick={() => playEdgeTTS(sentence.text)}
                                >
                                    播放标准发音
                                </button>
                                <button 
                                    className={`${styles.recordButton} ${recordingIndex === index ? styles.recording : ''}`}
                                    onClick={() => recordingIndex === index ? stopRecording() : startRecording(index)}
                                >
                                    {recordingIndex === index ? '停止录音' : '开始录音'}
                                </button>
                            </div>
                        </div>
                        <div className={styles.translation}>{sentence.translation}</div>
                        <div className={styles.focus}>{sentence.focus}</div>
                        <div className={styles.context}>
                            <span className={styles.label}>使用场景：</span>
                            {sentence.context}
                        </div>
                        <div className={styles.formality}>
                            <span className={styles.label}>正式程度：</span>
                            {sentence.formality}
                        </div>
                        {recordings[index] && (
                            <div className={styles.audioPlayback}>
                                <audio src={recordings[index]} controls />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 