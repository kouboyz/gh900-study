import type { Reference } from '../types/quiz'

type Props = {
  isCorrect: boolean
  explanation: string
  references: Reference[]
  onNext: () => void
  nextLabel: string
}

export function ExplanationPanel({ isCorrect, explanation, references, onNext, nextLabel }: Props) {
  return (
    <div className="animate-[fadeIn_0.2s_ease]">
      <div className="flex items-center gap-2 mb-5">
        <span className={`text-xl ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? '✓' : '✗'}
        </span>
        <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? '正解！' : '不正解'}
        </span>
      </div>

      <div className="border border-gray-100 rounded p-5 mb-4">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">解説</p>
        <p className="text-sm text-gray-700 leading-relaxed">{explanation}</p>
      </div>

      {references.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-7">
          {references.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-2.5 py-1 transition-colors"
            >
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {r.title} — {r.source}
            </a>
          ))}
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full py-3 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors cursor-pointer"
      >
        {nextLabel}
      </button>
    </div>
  )
}
