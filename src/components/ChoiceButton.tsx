import type { Choice } from '../types/quiz'

type State = 'idle' | 'selected' | 'correct' | 'wrong' | 'reveal-correct' | 'reveal-missed'

type Props = {
  choice: Choice
  state: State
  disabled: boolean
  multiSelect?: boolean
  onClick: (id: string) => void
}

const STATE_CLASSES: Record<State, string> = {
  idle:             'border-gray-200 hover:border-gray-400 hover:bg-gray-50',
  selected:         'border-blue-600 bg-blue-50',
  correct:          'border-green-600 bg-green-50',
  wrong:            'border-red-500 bg-red-50',
  'reveal-correct': 'border-green-600 bg-green-50',
  'reveal-missed':  'border-green-400 bg-green-50 opacity-70',
}

export function ChoiceButton({ choice, state, disabled, multiSelect, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(choice.id)}
      className={`w-full text-left px-4 py-3 border rounded text-sm leading-relaxed transition-colors duration-150 cursor-pointer disabled:cursor-default flex items-start gap-3 ${STATE_CLASSES[state]}`}
    >
      {multiSelect && (
        <span className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center ${
          state === 'selected' || state === 'correct' || state === 'wrong'
            ? 'border-current bg-current'
            : state === 'reveal-correct' || state === 'reveal-missed'
              ? 'border-green-600 bg-green-600'
              : 'border-gray-400'
        }`}>
          {(state === 'selected' || state === 'correct' || state === 'wrong' || state === 'reveal-correct' || state === 'reveal-missed') && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      )}
      <span>{choice.text}</span>
    </button>
  )
}
