export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">🎬 MV 製作指南</h3>
            <p className="text-sm mb-4">
              完整的 12 步 MV 製作工作流程，從歌詞創作到 YouTube 發布。
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">快速鏈接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  首頁
                </a>
              </li>
              <li>
                <a href="/tutorial" className="hover:text-white transition">
                  教學
                </a>
              </li>
              <li>
                <a href="/assistant" className="hover:text-white transition">
                  製作助手
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">社群</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          <p>
            © 2026 MV 製作指南. 開源項目 - MIT License
          </p>
        </div>
      </div>
    </footer>
  )
}
