import type { QuizAnswer } from '../types/quiz'

const SESSION_KEY = 'gh900-quiz-session-v1'

export interface QuizSession {
  questionIds: string[]
  index: number
  answers: QuizAnswer[]
  domainId: string | null
  isMockExam?: boolean
  savedAt: string
}

export function readSession(): QuizSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as QuizSession
    if (s.index === 0 && s.answers.length === 0) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    if (s.index >= s.questionIds.length) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return s
  } catch {
    return null
  }
}

export function saveSession(session: QuizSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}
