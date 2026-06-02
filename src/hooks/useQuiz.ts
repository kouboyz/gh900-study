import { useState, useCallback } from 'react'
import type { Question, QuizAnswer } from '../types/quiz'
import { shuffle } from '../utils/shuffle'

interface QuizState {
  questions: Question[]
  index: number
  answers: QuizAnswer[]
}

const INITIAL: QuizState = { questions: [], index: 0, answers: [] }

export function useQuiz() {
  const [quiz, setQuiz] = useState<QuizState>(INITIAL)

  const start = useCallback((questions: Question[]) => {
    setQuiz({ questions: shuffle(questions), index: 0, answers: [] })
  }, [])

  const resume = useCallback((questions: Question[], index: number, answers: QuizAnswer[]) => {
    setQuiz({ questions, index, answers })
  }, [])

  const answer = useCallback((selectedIds: string[], saveAnswer: (id: string, correct: boolean) => void) => {
    setQuiz(prev => {
      const q = prev.questions[prev.index]
      if (!q) return prev
      const correct = q.correctChoiceIds
      const isCorrect =
        selectedIds.length === correct.length &&
        selectedIds.every(id => correct.includes(id))
      saveAnswer(q.id, isCorrect)
      return {
        ...prev,
        answers: [...prev.answers, { questionId: q.id, domainId: q.domainId, selectedIds, isCorrect }],
      }
    })
  }, [])

  const next = useCallback(() => {
    setQuiz(prev => ({ ...prev, index: prev.index + 1 }))
  }, [])

  const currentQuestion = quiz.questions[quiz.index] ?? null
  const isFinished = quiz.questions.length > 0 && quiz.index >= quiz.questions.length
  const hasAnsweredCurrent = quiz.answers.length > quiz.index

  return { quiz, currentQuestion, isFinished, hasAnsweredCurrent, start, resume, answer, next }
}
