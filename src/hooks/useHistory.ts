import { useState, useCallback } from 'react'
import type { AnswerHistory } from '../types/quiz'

const LS_KEY = 'gh900-history-v1'

function readHistory(): AnswerHistory {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '{}') as AnswerHistory
  } catch {
    return {}
  }
}

function writeHistory(h: AnswerHistory): void {
  localStorage.setItem(LS_KEY, JSON.stringify(h))
}

export function useHistory() {
  const [history, setHistory] = useState<AnswerHistory>(readHistory)

  const saveAnswer = useCallback((questionId: string, isCorrect: boolean) => {
    setHistory(prev => {
      const record = prev[questionId] ?? { attempts: 0, correctCount: 0, lastAnsweredAt: '', lastCorrect: false }
      const next: AnswerHistory = {
        ...prev,
        [questionId]: {
          attempts: record.attempts + 1,
          correctCount: record.correctCount + (isCorrect ? 1 : 0),
          lastAnsweredAt: new Date().toISOString(),
          lastCorrect: isCorrect,
          bookmarked: record.bookmarked,
        },
      }
      writeHistory(next)
      return next
    })
  }, [])

  const resetHistory = useCallback(() => {
    localStorage.removeItem(LS_KEY)
    setHistory({})
  }, [])

  return { history, saveAnswer, resetHistory }
}
