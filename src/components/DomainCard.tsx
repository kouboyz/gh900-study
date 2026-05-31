import type { Domain, AnswerHistory } from '../types/quiz'
import type { Question } from '../types/quiz'
import { ProgressBar } from './ProgressBar'

type Props = {
  domain: Domain
  questions: Question[]
  history: AnswerHistory
  onClick: (domainId: string) => void
}

export function DomainCard({ domain, questions, history, onClick }: Props) {
  const answered = questions.filter(q => history[q.id]).length
  const correct = questions.filter(q => history[q.id]?.lastCorrect).length
  const pct = answered > 0 ? Math.round((correct / answered) * 100) : null
  const progress = questions.length > 0 ? Math.round((answered / questions.length) * 100) : 0
  const isWeak = pct !== null && pct < 60

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => onClick(domain.id)}
        className="block w-full text-left group -mx-3 px-3 py-4 rounded hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-gray-400 mb-0.5">{domain.id} · {domain.ratio}%</p>
            <p className="text-sm group-hover:text-gray-600 transition-colors truncate">{domain.name}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400">{answered}/{questions.length}問</p>
            <p className={`text-xs ${isWeak ? 'text-red-400' : 'text-gray-400'}`}>
              {pct !== null ? `${pct}%` : '--'}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <ProgressBar value={progress} weak={isWeak} thin />
        </div>
      </button>
    </div>
  )
}
