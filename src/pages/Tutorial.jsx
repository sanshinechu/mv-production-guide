import { useParams } from 'react-router-dom'

export default function Tutorial() {
  const { stepId } = useParams()

  return (
    <div className="space-y-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block">
          <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
            <h3 className="font-bold mb-4 text-slate-900">📋 工作流程</h3>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-slate-600 mb-2">Phase 1: 概念到設計</div>
              {['MV_01: 歌詞', 'MV_02: 主角', 'MV_03: 場景', 'MV_04: 分鏡', 'MV_05: 放大', 'MV_06: 影片提示詞'].map((step, idx) => (
                <div key={idx} className="text-sm px-3 py-2 rounded hover:bg-blue-50 cursor-pointer transition">
                  {step}
                </div>
              ))}

              <div className="text-sm font-semibold text-slate-600 mt-4 mb-2">Phase 2: 視覺生成</div>
              {['MV_07: 生圖+影', 'MV_08: 空拍', 'MV_09: 打光', 'Step 10: 組裝'].map((step, idx) => (
                <div key={idx} className="text-sm px-3 py-2 rounded hover:bg-blue-50 cursor-pointer transition">
                  {step}
                </div>
              ))}

              <div className="text-sm font-semibold text-slate-600 mt-4 mb-2">Phase 3: 打包上傳</div>
              {['Step 11: 打包整理', 'Step 12: YouTube'].map((step, idx) => (
                <div key={idx} className="text-sm px-3 py-2 rounded hover:bg-blue-50 cursor-pointer transition">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold mb-2">
                Step 1 of 12
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">MV_01: 歌詞創作</h1>
              <p className="text-slate-600">⏱️ 30-45 分鐘 | 💰 $0 (設計無成本)</p>
            </div>

            <div className="prose prose-sm max-w-none space-y-6">
              <p className="text-slate-600 leading-relaxed">
                本步驟是 MV 製作的起點。你需要根據想表達的主題創作完整的歌詞，
                並為 SUNO 音樂生成平台編寫專業的風格描述。
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">💡 核心任務</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-900 text-sm">
                  <li>根據主題創作完整歌詞（含結構標籤）</li>
                  <li>為 SUNO 編寫英文風格描述</li>
                  <li>確認歌詞長度和情感基調</li>
                </ul>
              </div>

              <div className="bg-slate-100 border border-slate-300 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 mb-3">示例</h3>
                <pre className="bg-slate-800 text-slate-100 p-4 rounded overflow-x-auto text-xs">
{`[Verse 1]
每個黎明前都有黑暗
但我不會放棄我的方向

[Chorus]
飛越這片天際
我的夢想在前方閃耀`}
                </pre>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-slate-900 mb-2">📋 檢查清單</h3>
                <div className="space-y-2">
                  {['歌詞結構完整（Verse, Chorus 等）', '風格描述用英文編寫', '音樂長度確認'].map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t mt-8 pt-8 flex justify-between">
              <button className="text-slate-600 hover:text-slate-900">← 上一步</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                下一步 →
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mt-6">
            <h3 className="font-bold text-slate-900 mb-4">ℹ️ 相關資訊</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">⏱️ 時間估計</h4>
                <p className="text-sm text-slate-600">此步驟: 30-45 分鐘 | 總計: 6-8 小時</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">💰 成本</h4>
                <p className="text-sm text-slate-600">此步驟: $0 | 已花費: $0 | 預估總計: $10-20</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">🛠️ 需要的工具</h4>
                <p className="text-sm text-slate-600">Claude AI (文字創作)</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
