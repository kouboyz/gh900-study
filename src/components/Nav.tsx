type Props = {
  onHome: () => void
  showBack: boolean
  quizInfo?: string
}

export function Nav({ onHome, showBack, quizInfo }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={onHome}
          className="text-sm font-medium tracking-widest uppercase hover:text-gray-500 transition-colors cursor-pointer"
        >
          gh-900
        </button>
        <div className="flex items-center gap-6 text-xs text-gray-400">
          {showBack && (
            <button
              onClick={onHome}
              className="hover:text-gray-900 transition-colors cursor-pointer"
            >
              ← ホーム
            </button>
          )}
          {quizInfo && <span>{quizInfo}</span>}
        </div>
      </div>
    </nav>
  )
}
