import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80">
            <div className="text-2xl font-bold text-blue-600">🎬</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">MV 製作指南</h1>
              <p className="text-xs text-slate-500">完整工作流程 + 互動教學</p>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/tutorial"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              📚 教學
            </Link>
            <Link
              to="/assistant"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              🛠️ 製作助手
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition"
            >
              ⭐ GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
