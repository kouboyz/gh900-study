import type { Choice } from '../types/quiz'

type State = 'idle' | 'selected' | 'correct' | 'wrong' | 'reveal-correct'

type Props = {
  choice: Choice
  state: State
  disabled: boolean
  onClick: (id: string) => void
}

const STATE_CLASSES: Record<State, string> = {
  idle:           'border-gray-200 hover:border-gray-400 hover:bg-gray-50',
  selected:       'border-blue-600 bg-blue-50',
  correct:        'border-green-600 bg-green-50',
  wrong:          'border-red-500 bg-red-50',
  'reveal-correct': 'border-green-600 bg-green-50',
}

export function ChoiceButton({ choice, state, disabled, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(choice.id)}
      className={`w-full text-left px-4 py-3 border rounded text-sm leading-relaxed transition-colors duration-150 cursor-pointer disabled:cursor-default ${STATE_CLASSES[state]}`}
    >
      {choice.text}
    </button>
  )
}
