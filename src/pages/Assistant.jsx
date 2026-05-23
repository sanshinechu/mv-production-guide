import { useState } from 'react'
import { useProjectStore } from '../stores/projectStore'
import { useCalculator } from '../hooks/useCalculator'
import { IMAGE_MODELS, VIDEO_MODELS, BUDGET_PRESETS } from '../data/tools'
import { formatCurrency, formatTime } from '../utils/formatters'

export default function Assistant() {
  const { formData, updateFormData, generateAnalysis, analysis, reset, exportAsMarkdown } = useProjectStore()
  const { calculate, loading, errors } = useCalculator()
  const [isGenerated, setIsGenerated] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const finalValue = name === 'duration' || name === 'characters' ? parseInt(value) : value
    updateFormData({ [name]: finalValue })
  }

  const handleGeneratePlan = () => {
    const result = calculate(formData)
    if (result) {
      generateAnalysis()
      setIsGenerated(true)
    }
  }

  const handleDownloadMarkdown = () => {
    const markdown = exportAsMarkdown()
    if (!markdown) return

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown))
    element.setAttribute('download', `mv-plan-${new Date().getTime()}.md`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // 不是 Step 3，不顯示成本資訊
  const cost = analysis?.cost || {
    imageCost: 0,
    videoCost: 0,
    musicCost: 0,
    totalCost: 0
  }

  if (isGenerated && analysis?.valid) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">✨ 你的 MV 製作計劃已生成</h1>
          <p className="text-slate-600">準備開始製作你的 MV 了嗎？</p>
        </div>

        {/* 成本摘要 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">💰 成本摘要</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-blue-100 text-sm">圖像生成</p>
              <p className="text-2xl font-bold">${cost.imageCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">影片生成</p>
              <p className="text-2xl font-bold">${cost.videoCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">音樂製作</p>
              <p className="text-2xl font-bold">${cost.musicCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">總計成本</p>
              <p className="text-3xl font-bold">${cost.totalCost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* 時程表 */}
        {analysis?.timeline && (
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">⏱️ 時程規劃</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysis.timeline.phases.map((phase) => (
                <div key={phase.phase} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Phase {phase.phase}: {phase.name}</h4>
                  <p className="text-sm text-slate-600">
                    預計時間：{formatTime(phase.totalTime.min)} - {formatTime(phase.totalTime.max)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center mt-4 font-semibold text-slate-900">
              總計：{analysis.timeline.estimatedHours.min} - {analysis.timeline.estimatedHours.max} 小時
            </p>
          </div>
        )}

        {/* 檢查清單 */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">✅ 12 步檢查清單</h3>
          <div className="space-y-2">
            {[
              'MV_01: 創作歌詞',
              'MV_02: 設計主角',
              'MV_03: 撰寫場景提示詞',
              'MV_04: 生成分鏡圖',
              'MV_05: 截圖放大',
              'MV_06: 生成影片提示詞',
              'MV_07: 生圖和生影',
              'MV_08: 空拍和細節',
              'MV_09: 打光和效果',
              'Step 10: FFmpeg 組裝',
              'Step 11: 打包整理',
              'Step 12: YouTube 上傳'
            ].map((item) => (
              <label key={item} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm text-slate-700">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 操作按鈕 */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDownloadMarkdown}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            📥 下載 Markdown 計劃
          </button>
          <button
            onClick={() => {
              setIsGenerated(false)
              reset()
            }}
            className="bg-slate-600 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            🔄 重新製作計劃
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* 進度條 */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition ${
                i <= (isGenerated ? 4 : 1) ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-slate-600">第 1 步，共 3 步</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-8">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">基本信息</h2>
              <p className="text-slate-600">告訴我你的 MV 主題和基本需求</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 mb-2">MV 主題或關鍵詞</label>
              <textarea
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                placeholder="例：年輕情侶在咖啡廳的初戀故事"
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-900 mb-2">曲風</label>
                <select
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="indie-pop">Indie Pop</option>
                  <option value="rb">R&B/Soul</option>
                  <option value="pop">Pop</option>
                  <option value="ballad">Ballad</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-900 mb-2">時長（秒）</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="30"
                  max="600"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 mb-3">主角數量</label>
              <div className="flex gap-3">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    onClick={() => setFormData(prev => ({ ...prev, characters: num }))}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      formData.characters === num
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {num} 人
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 工具選擇面板（始終顯示） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">🎨 圖像生成</h3>
            <div className="space-y-3">
              {Object.entries(IMAGE_MODELS)
                .slice(0, 3)
                .map(([id, model]) => (
                  <label key={id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="imageModel"
                      value={id}
                      checked={formData.imageModel === id}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{model.name}</div>
                      <div className="text-xs text-slate-600 mt-1">${model.price}/張 - {model.quality}</div>
                      <div className="text-xs text-slate-500 mt-1">{model.description}</div>
                    </div>
                  </label>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">🎬 影片生成</h3>
            <div className="space-y-3">
              {Object.entries(VIDEO_MODELS)
                .slice(0, 3)
                .map(([id, model]) => (
                  <label key={id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition">
                    <input
                      type="radio"
                      name="videoModel"
                      value={id}
                      checked={formData.videoModel === id}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{model.name}</div>
                      <div className="text-xs text-slate-600 mt-1">${model.price}/{model.pricePerUnit} - {model.quality}</div>
                      <div className="text-xs text-slate-500 mt-1">{model.description}</div>
                    </div>
                  </label>
                ))}
            </div>
          </div>
        </div>

        {/* 預算等級選擇 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">💡 選擇預算優先級</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(BUDGET_PRESETS).map(([id, preset]) => (
              <label
                key={id}
                className={`p-6 border rounded-lg cursor-pointer transition ${
                  formData.priority === id
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="priority"
                  value={id}
                  checked={formData.priority === id}
                  onChange={handleInputChange}
                  className="mb-3"
                />
                <div className="text-2xl mb-2">{preset.emoji}</div>
                <div className="font-bold text-slate-900">{preset.name}</div>
                <p className="text-sm text-slate-600 mt-2">{preset.description}</p>
              </label>
            ))}
          </div>
        </div>

        {/* 錯誤提示 */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-semibold mb-2">❌ 請檢查以下項目：</p>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="border-t mt-8 pt-8 flex justify-between">
          <button
            onClick={() => reset()}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            🔄 重置表單
          </button>
          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {loading ? '生成中...' : '✨ 生成我的 MV 計劃'}
          </button>
        </div>
      </div>
    </div>
  )
}
