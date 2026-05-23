import { useParams, useNavigate, Link } from 'react-router-dom'
import { useMemo } from 'react'
import { WORKFLOW_STEPS } from '../data/workflow'

export default function Tutorial() {
  const { stepId = 'mv-01' } = useParams()
  const navigate = useNavigate()

  // 找到當前步驟的數據
  const currentStep = useMemo(() => {
    return WORKFLOW_STEPS.find(s => s.id === stepId) || WORKFLOW_STEPS[0]
  }, [stepId])

  // 找到上一步和下一步
  const currentIndex = WORKFLOW_STEPS.findIndex(s => s.id === stepId)
  const prevStep = currentIndex > 0 ? WORKFLOW_STEPS[currentIndex - 1] : null
  const nextStep = currentIndex < WORKFLOW_STEPS.length - 1 ? WORKFLOW_STEPS[currentIndex + 1] : null

  // 按 phase 分組步驟
  const stepsByPhase = useMemo(() => {
    return WORKFLOW_STEPS.reduce((acc, step) => {
      const phase = acc.find(p => p.phase === step.phase)
      if (phase) {
        phase.steps.push(step)
      } else {
        acc.push({
          phase: step.phase,
          phaseName: step.phaseName,
          steps: [step]
        })
      }
      return acc
    }, [])
  }, [])

  // 格式化時間顯示
  const formatTime = (duration) => {
    if (duration.min === duration.max) {
      return `${duration.min} ${duration.unit}`
    }
    return `${duration.min}-${duration.max} ${duration.unit}`
  }

  // 計算已花費的時間和成本
  const cumulativeStats = useMemo(() => {
    const prevSteps = WORKFLOW_STEPS.slice(0, currentIndex + 1)
    const totalMinutes = prevSteps.reduce((sum, step) => sum + step.duration.max, 0)
    const totalCost = prevSteps.reduce((sum, step) => sum + step.cost, 0)
    const totalStepsRemaining = WORKFLOW_STEPS.length - currentIndex - 1
    const remainingMinutes = WORKFLOW_STEPS.slice(currentIndex + 1).reduce((sum, step) => sum + step.duration.max, 0)

    return {
      completedSteps: currentIndex,
      completedHours: (totalMinutes / 60).toFixed(1),
      completedCost: totalCost,
      remainingSteps: totalStepsRemaining,
      remainingHours: (remainingMinutes / 60).toFixed(1),
      totalHours: ((totalMinutes + remainingMinutes) / 60).toFixed(1)
    }
  }, [currentIndex])

  return (
    <div className="space-y-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block">
          <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-24">
            <h3 className="font-bold mb-4 text-slate-900">📋 工作流程</h3>
            <div className="space-y-3">
              {stepsByPhase.map((phase) => (
                <div key={phase.phase}>
                  <div className="text-sm font-semibold text-slate-600 mb-2">
                    Phase {phase.phase}: {phase.phaseName}
                  </div>
                  {phase.steps.map((step) => (
                    <Link
                      key={step.id}
                      to={`/tutorial/${step.id}`}
                      className={`text-sm px-3 py-2 rounded transition block ${
                        currentStep.id === step.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-700 hover:bg-blue-50'
                      }`}
                    >
                      {step.emoji} {step.title}
                    </Link>
                  ))}
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
                Step {currentStep.step} of 12
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                {currentStep.emoji} {currentStep.title}
              </h1>
              <p className="text-slate-600">
                ⏱️ {formatTime(currentStep.duration)} | 💰 ${currentStep.cost}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(currentStep.step / 12) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {currentStep.step} / 12 步完成
              </p>
            </div>

            <div className="prose prose-sm max-w-none space-y-6">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {currentStep.description}
              </p>

              {/* Core Tasks */}
              {currentStep.outputs && currentStep.outputs.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">💡 輸出物</h3>
                  <ul className="list-disc list-inside space-y-2 text-blue-900 text-sm">
                    {currentStep.outputs.map((output, idx) => (
                      <li key={idx}>{output}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tools Required */}
              {currentStep.tools && currentStep.tools.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-2">🛠️ 需要的工具</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.tools.map((tool, idx) => (
                      <span key={idx} className="bg-green-200 text-green-900 px-3 py-1 rounded text-sm font-semibold">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              {currentStep.tips && currentStep.tips.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-bold text-amber-900 mb-2">💡 最佳實踐</h3>
                  <ul className="list-disc list-inside space-y-2 text-amber-900 text-sm">
                    {currentStep.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Checklist */}
              {currentStep.checklist && currentStep.checklist.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="font-bold text-slate-900 mb-2">📋 檢查清單</h3>
                  <div className="space-y-2">
                    {currentStep.checklist.map((item, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="border-t mt-8 pt-8 flex justify-between">
              {prevStep ? (
                <Link
                  to={`/tutorial/${prevStep.id}`}
                  className="text-slate-600 hover:text-slate-900 font-semibold"
                >
                  ← {prevStep.title}
                </Link>
              ) : (
                <div />
              )}
              {nextStep ? (
                <Link
                  to={`/tutorial/${nextStep.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  {nextStep.title} →
                </Link>
              ) : (
                <div className="text-slate-500 font-semibold">完成！ 🎉</div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mt-6">
            <h3 className="font-bold text-slate-900 mb-4">📊 進度統計</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">⏱️ 時間進度</h4>
                <p className="text-sm text-slate-600">
                  已完成: {cumulativeStats.completedHours} 小時 |
                  剩餘: {cumulativeStats.remainingHours} 小時 |
                  總計: {cumulativeStats.totalHours} 小時
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">💰 成本統計</h4>
                <p className="text-sm text-slate-600">
                  此步驟: ${currentStep.cost} |
                  已花費: ${cumulativeStats.completedCost} |
                  預估總計: $10-20
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">✅ 步驟進度</h4>
                <p className="text-sm text-slate-600">
                  已完成: {cumulativeStats.completedSteps} 步 |
                  當前: Step {currentStep.step} |
                  剩餘: {cumulativeStats.remainingSteps} 步
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
