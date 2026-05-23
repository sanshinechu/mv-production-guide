import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          MV 製作完整指南
        </div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          從歌詞創作到 YouTube 發布的 12 步完整工作流程。
          包含互動式教學、成本計算器、時程規劃和檢查清單。
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            to="/tutorial"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            📚 開始學習
          </Link>
          <Link
            to="/assistant"
            className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            🛠️ 製作我的 MV
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">✨ 核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              emoji: '🎬',
              title: '完整 12 步流程',
              desc: '從歌詞到音樂、設計、生成、組裝、驗證到發布'
            },
            {
              emoji: '💡',
              title: '互動式教學',
              desc: '詳細的步驟指南，包含提示詞和最佳實踐'
            },
            {
              emoji: '💰',
              title: 'AI 工具成本計算',
              desc: '精確估算 FLUX、Kling、SUNO 等工具的費用'
            },
            {
              emoji: '✅',
              title: '可下載檢查清單',
              desc: '完整的待辦清單，支援保存和分享'
            },
            {
              emoji: '⏱️',
              title: '智能時程規劃',
              desc: '自動計算製作時間，支援各種工具組合'
            },
            {
              emoji: '🚀',
              title: '開源 + Vercel 部署',
              desc: '100% 開源，一鍵部署到 Vercel'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition">
              <div className="text-3xl mb-3">{feature.emoji}</div>
              <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">20,000+</div>
            <p className="text-blue-100 text-sm">字詳細文檔</p>
          </div>
          <div>
            <div className="text-3xl font-bold">6-8</div>
            <p className="text-blue-100 text-sm">小時平均製作</p>
          </div>
          <div>
            <div className="text-3xl font-bold">$1-25</div>
            <p className="text-blue-100 text-sm">成本預估範圍</p>
          </div>
          <div>
            <div className="text-3xl font-bold">12</div>
            <p className="text-blue-100 text-sm">清晰步驟</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">🛠️ 技術棧</h2>
        <div className="bg-slate-100 rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['React 19', 'Vite', 'Tailwind CSS', 'React Router'].map((tech, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg font-semibold text-slate-900">
                {tech}
              </div>
            ))}
            {['Zustand', 'Recharts', 'Mermaid.js', 'Vercel'].map((tech, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg font-semibold text-slate-900">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold">準備好開始了嗎？</h2>
        <p className="text-slate-600">選擇你的起點：</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/tutorial"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            📚 學習 12 步工作流
          </Link>
          <Link
            to="/assistant"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            🎬 製作我的第一個 MV
          </Link>
        </div>
      </section>
    </div>
  )
}
