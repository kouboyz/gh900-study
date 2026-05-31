import type { AnswerHistory } from '../types/quiz'
import { DOMAINS } from '../data/domains'
import { QUESTIONS } from '../data/loader'
import { OFFICIAL_LINKS } from '../data/officialLinks'
import { DomainCard } from '../components/DomainCard'
import { ProgressBar } from '../components/ProgressBar'

type Props = {
  history: AnswerHistory
  onStartDomain: (domainId: string | null) => void
}

export function HomeScreen({ history, onStartDomain }: Props) {
  const totalQ = QUESTIONS.length
  const answered = Object.keys(history).length
  const correct = Object.values(history).filter(h => h.lastCorrect).length
  const overallPct = answered > 0 ? Math.round((correct / answered) * 100) : null
  const progressPct = totalQ > 0 ? Math.round((answered / totalQ) * 100) : 0

  return (
    <div className="animate-[fadeIn_0.25s_ease]">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">GitHub Foundations</p>
        <h1 className="text-2xl font-light tracking-tight mb-3">
          GH-900 Trainer <span className="text-sm text-gray-400 font-normal">β</span>
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          GH-900 認定試験の対策問題集です。6つのドメインから問題を選んで学習できます。学習履歴はブラウザに保存されます。
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs tracking-widest uppercase text-gray-400">Overall Progress</p>
          <p className="text-xs text-gray-400">
            {overallPct !== null ? `${overallPct}% 正解` : '未回答'}
          </p>
        </div>
        <ProgressBar value={progressPct} />
        <p className="text-xs text-gray-400 mt-1.5">{answered} / {totalQ} 問回答済み</p>
      </div>

      {/* Domain list */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Domains</p>
        <div>
          {DOMAINS.map(d => (
            <DomainCard
              key={d.id}
              domain={d}
              questions={QUESTIONS.filter(q => q.domainId === d.id)}
              history={history}
              onClick={onStartDomain}
            />
          ))}
        </div>
      </div>

      <div className="pt-6 mb-12">
        <button
          onClick={() => onStartDomain(null)}
          className="w-full py-3 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-700 cursor-pointer"
        >
          全ドメインをランダムに解く
        </button>
      </div>

      {/* Official Resources */}
      <div>
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Official Resources</p>
        <div className="divide-y divide-gray-100">
          {OFFICIAL_LINKS.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group -mx-3 px-3 py-4 rounded hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">{link.category}</p>
                  <p className="text-sm group-hover:text-gray-600 transition-colors">{link.title}</p>
                  {link.note && (
                    <p className="text-xs text-gray-400 mt-0.5">{link.note}</p>
                  )}
                </div>
                <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
