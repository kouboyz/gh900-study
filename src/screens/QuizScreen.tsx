import { useState } from 'react'
import type { QuizAnswer } from '../types/quiz'
import { DOMAINS } from '../data/domains'
import { ChoiceButton } from '../components/ChoiceButton'
import { ExplanationPanel } from '../components/ExplanationPanel'
import { ProgressBar } from '../components/ProgressBar'
import { shuffle } from '../utils/shuffle'
import type { Question } from '../types/quiz'

type ChoiceState = 'idle' | 'selected' | 'correct' | 'wrong' | 'reveal-correct' | 'reveal-missed'

type Props = {
  questions: Question[]
  index: number
  answers: QuizAnswer[]
  onAnswer: (selectedIds: string[]) => void
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
  const isMultiple = q.questionType === 'multiple-choice'

  const domain = DOMAINS.find(d => d.id === q.domainId)

  const [shuffledChoices] = useState(() => shuffle(q.choices))
  const [pendingIds, setPendingIds] = useState<string[]>([])

  const DIFFICULTY_LABEL: Record<string, string> = { basic: '基礎', standard: '標準', advanced: '応用' }

  function togglePending(id: string) {
    setPendingIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function getChoiceState(choiceId: string): ChoiceState {
    if (!hasAnswered) {
      if (isMultiple) return pendingIds.includes(choiceId) ? 'selected' : 'idle'
      return 'idle'
    }
    const selectedIds = currentAnswer.selectedIds
    const isCorrectChoice = q.correctChoiceIds.includes(choiceId)
    const wasSelected = selectedIds.includes(choiceId)

    if (isCorrectChoice && wasSelected) return 'correct'
    if (!isCorrectChoice && wasSelected) return 'wrong'
    if (isCorrectChoice && !wasSelected) return 'reveal-missed'
    return 'idle'
  }

  function handleSingleClick(id: string) {
    onAnswer([id])
  }

  function handleSubmit() {
    if (pendingIds.length === 0) return
    onAnswer(pendingIds)
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
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-block text-xs rounded px-2 py-0.5 ${q.difficulty === 'exam' ? 'text-red-600 border border-red-300 bg-red-50' : 'text-gray-400 border border-gray-200'}`}>
            {DIFFICULTY_LABEL[q.difficulty] ?? q.difficulty}
          </span>
          {isMultiple && (
            <span className="inline-block text-xs text-blue-600 border border-blue-200 bg-blue-50 rounded px-2 py-0.5">
              複数選択
            </span>
          )}
        </div>
        <p className="text-base leading-relaxed">{q.question}</p>
        {isMultiple && !hasAnswered && (
          <p className="text-xs text-gray-400 mt-2">正しいものをすべて選んでください</p>
        )}
      </div>

      {/* Choices */}
      <div className="space-y-2.5 mb-8">
        {shuffledChoices.map(c => (
          <ChoiceButton
            key={c.id}
            choice={c}
            state={getChoiceState(c.id)}
            disabled={hasAnswered}
            multiSelect={isMultiple}
            onClick={isMultiple ? togglePending : handleSingleClick}
          />
        ))}
      </div>

      {/* Submit button for multiple-choice */}
      {isMultiple && !hasAnswered && (
        <button
          onClick={handleSubmit}
          disabled={pendingIds.length === 0}
          className="w-full py-3 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed mb-8"
        >
          回答する
        </button>
      )}

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
