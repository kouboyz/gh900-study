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

  const answer = useCallback((selectedId: string, saveAnswer: (id: string, correct: boolean) => void) => {
    setQuiz(prev => {
      const q = prev.questions[prev.index]
      if (!q) return prev
      const isCorrect = q.correctChoiceIds.includes(selectedId)
      saveAnswer(q.id, isCorrect)
      return {
        ...prev,
        answers: [...prev.answers, { questionId: q.id, domainId: q.domainId, selectedId, isCorrect }],
      }
    })
  }, [])

  const next = useCallback(() => {
    setQuiz(prev => ({ ...prev, index: prev.index + 1 }))
  }, [])

  const currentQuestion = quiz.questions[quiz.index] ?? null
  const isFinished = quiz.questions.length > 0 && quiz.index >= quiz.questions.length
  const hasAnsweredCurrent = quiz.answers.length > quiz.index

  return { quiz, currentQuestion, isFinished, hasAnsweredCurrent, start, answer, next }
}
