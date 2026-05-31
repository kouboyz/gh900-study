import type { Question } from '../types/quiz'

const modules = import.meta.glob<Question[]>('./questions/*.json', { eager: true, import: 'default' })

export const QUESTIONS: Question[] = Object.values(modules).flat()
