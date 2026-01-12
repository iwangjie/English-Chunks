export default function AboutPage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>关于</h1>
      <div style={{ lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1rem' }}>
          <strong>English Chunks</strong> 是一款帮助你学习地道英语表达的应用。
        </p>
        <p style={{ marginBottom: '1rem' }}>
          通过场景化学习和游戏化练习，让你轻松掌握英语口语中的常用表达块（chunks）。
        </p>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
          主要功能
        </h2>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>场景对话生成 - AI 生成真实场景对话</li>
          <li style={{ marginBottom: '0.5rem' }}>发音练习 - 听标准发音，纠正口语</li>
          <li style={{ marginBottom: '0.5rem' }}>鱿鱼游戏 - 游戏化学习，寓教于乐</li>
          <li style={{ marginBottom: '0.5rem' }}>YouGlish 集成 - 看真实视频学发音</li>
        </ul>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>
          桌面版特性
        </h2>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>原生应用体验</li>
          <li style={{ marginBottom: '0.5rem' }}>本地数据存储</li>
          <li style={{ marginBottom: '0.5rem' }}>离线可用（部分功能）</li>
          <li style={{ marginBottom: '0.5rem' }}>系统托盘支持</li>
        </ul>
      </div>
    </main>
  );
}
