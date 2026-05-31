import { useState } from 'react'
import type { QuizAnswer } from '../types/quiz'
import { DOMAINS } from '../data/domains'
import { ChoiceButton } from '../components/ChoiceButton'
import { ExplanationPanel } from '../components/ExplanationPanel'
import { ProgressBar } from '../components/ProgressBar'
import { shuffle } from '../utils/shuffle'
import type { Question } from '../types/quiz'

type ChoiceState = 'idle' | 'selected' | 'correct' | 'wrong' | 'reveal-correct'

type Props = {
  questions: Question[]
  index: number
  answers: QuizAnswer[]
  onAnswer: (selectedId: string) => void
  onNext: () => void
  onFinish: () => void
}

export function QuizScreen({ questions, index, answers, onAnswer, onNext, onFinish }: Props) {
  const q = questions[index]
  const total = questions.length
  const currentAnswer = answers[index]
  const hasAnswered = currentAnswer !== undefined
  const isLast = index + 1 >= total
  const progressPct = Math.round((index / total) * 100)

  const domain = DOMAINS.find(d => d.id === q.domainId)

  const [shuffledChoices] = useState(() => shuffle(q.choices))

  const DIFFICULTY_LABEL: Record<string, string> = { basic: '基礎', standard: '標準', advanced: '応用' }

  function getChoiceState(choiceId: string): ChoiceState {
    if (!hasAnswered) return 'idle'
    if (q.correctChoiceIds.includes(choiceId)) return 'reveal-correct'
    if (choiceId === currentAnswer.selectedId) return 'wrong'
    return 'idle'
  }

  return (
    <div className="animate-[fadeIn_0.25s_ease]">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-widest uppercase text-gray-400">
            {domain ? `${domain.id} · ${domain.name}` : ''}
          </span>
          <span className="text-xs text-gray-400">{index + 1} / {total}</span>
        </div>
        <ProgressBar value={progressPct} thin />
      </div>

      {/* Question */}
      <div className="mb-8">
        <span className="inline-block text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5 mb-4">
          {DIFFICULTY_LABEL[q.difficulty] ?? q.difficulty}
        </span>
        <p className="text-base leading-relaxed">{q.question}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2.5 mb-8">
        {shuffledChoices.map(c => (
          <ChoiceButton
            key={c.id}
            choice={c}
            state={getChoiceState(c.id)}
            disabled={hasAnswered}
            onClick={onAnswer}
          />
        ))}
      </div>

      {/* Explanation */}
      {hasAnswered && (
        <ExplanationPanel
          isCorrect={currentAnswer.isCorrect}
          explanation={q.explanation}
          references={q.references}
          onNext={isLast ? onFinish : onNext}
          nextLabel={isLast ? '結果を見る' : '次の問題へ'}
        />
      )}
    </div>
  )
}
