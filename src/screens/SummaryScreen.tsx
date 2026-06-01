import type { QuizAnswer } from '../types/quiz'
import { DOMAINS } from '../data/domains'
import { ProgressBar } from '../components/ProgressBar'
import { ShareButtons } from '../components/ShareButtons'

type Props = {
  answers: QuizAnswer[]
  onRetry: () => void
  onReviewWrong: () => void
  onHome: () => void
}

function buildShareText(pct: number, correct: number, total: number, domainIds: string[]): string {
  const score = `${pct}%（${correct}/${total}問）`
  if (domainIds.length === 1) {
    const d = DOMAINS.find(d => d.id === domainIds[0])
    return `GH-900 Study Domain${d?.id.replace('D', '')}（${d?.name}）を ${score} で完了！`
  }
  return `GH-900 Study 全${domainIds.length}ドメインを ${score} で完了！`
}

export function SummaryScreen({ answers, onRetry, onReviewWrong, onHome }: Props) {
  const total = answers.length
  const correct = answers.filter(a => a.isCorrect).length
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  const usedDomainIds = [...new Set(answers.map(a => a.domainId))]
  const hasWrong = answers.some(a => !a.isCorrect)

  return (
    <div className="animate-[fadeIn_0.25s_ease]">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Result</p>
        <h2 className="text-2xl font-light tracking-tight">演習完了</h2>
      </div>

      {/* Score */}
      <div className="mb-10 text-center py-10 border border-gray-100 rounded">
        <p className="text-6xl font-light mb-1">{pct}%</p>
        <p className="text-sm text-gray-400">正答率</p>
        <p className="text-xs text-gray-400 mt-1">{correct} / {total} 問正解</p>
      </div>

      {/* Domain breakdown */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-5">ドメイン別結果</p>
        <div className="space-y-4">
          {usedDomainIds.map(domainId => {
            const d = DOMAINS.find(d => d.id === domainId)
            const ans = answers.filter(a => a.domainId === domainId)
            const c = ans.filter(a => a.isCorrect).length
            const p = Math.round((c / ans.length) * 100)
            const isWeak = p < 60
            return (
              <div key={domainId}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-gray-600">{d?.id} {d?.name}</p>
                  <p className={`text-xs ${isWeak ? 'text-red-500' : 'text-gray-500'}`}>
                    {c}/{ans.length} ({p}%)
                  </p>
                </div>
                <ProgressBar value={p} weak={isWeak} thin />
              </div>
            )
          })}
        </div>
      </div>

      {/* Share */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Share</p>
        <ShareButtons text={buildShareText(pct, correct, total, usedDomainIds)} />
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-6 border-t border-gray-100">
        <button
          onClick={onRetry}
          className="w-full py-3 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-700 cursor-pointer"
        >
          同じ問題をもう一度
        </button>
        {hasWrong && (
          <button
            onClick={onReviewWrong}
            className="w-full py-3 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-700 cursor-pointer"
          >
            間違えた問題を復習する
          </button>
        )}
        <button
          onClick={onHome}
          className="w-full py-3 text-sm text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
        >
          ホームへ戻る
        </button>
      </div>
    </div>
  )
}
