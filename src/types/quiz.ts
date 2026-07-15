export type Difficulty = 'basic' | 'standard' | 'advanced' | 'exam'

export type QuestionType = 'single-choice' | 'multiple-choice'

export interface Choice {
  id: string
  text: string
}

export interface Reference {
  title: string
  url: string
  source: string
  checkedAt?: string
}

export interface Question {
  id: string
  domainId: string
  domainName?: string
  questionType: QuestionType
  difficulty: Difficulty
  question: string
  choices: Choice[]
  correctChoiceIds: string[]
  explanation: string
  references: Reference[]
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Domain {
  id: string
  name: string
  ratio: number
}

export interface AnswerRecord {
  attempts: number
  correctCount: number
  lastAnsweredAt: string
  lastCorrect: boolean
  bookmarked?: boolean
}

export type AnswerHistory = Record<string, AnswerRecord>

export interface QuizAnswer {
  questionId: string
  domainId: string
  selectedIds: string[]
  isCorrect: boolean
}
