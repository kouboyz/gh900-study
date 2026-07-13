import { describe, it, expect } from 'vitest'
import { buildMockExam } from './mockExam'
import { DOMAINS } from '../data/domains'
import type { Question } from '../types/quiz'

function makeQuestions(domainId: string, count: number): Question[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${domainId}-${String(i + 1).padStart(3, '0')}`,
    domainId,
    questionType: 'single-choice' as const,
    difficulty: 'basic' as const,
    question: `Q${i + 1}`,
    choices: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
    ],
    correctChoiceIds: ['a'],
    explanation: '',
    references: [],
    checkedAt: '2026-01-01',
  }))
}

// 各ドメインに十分な問題数を用意
const ALL_QUESTIONS: Question[] = DOMAINS.flatMap(d => makeQuestions(d.id, 30))

describe('buildMockExam', () => {
  it('常にちょうど50問を返す', () => {
    const result = buildMockExam(ALL_QUESTIONS)
    expect(result).toHaveLength(50)
  })

  it('重複した問題を含まない', () => {
    const result = buildMockExam(ALL_QUESTIONS)
    const ids = result.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('元の配列を変更しない', () => {
    const copy = [...ALL_QUESTIONS]
    buildMockExam(ALL_QUESTIONS)
    expect(ALL_QUESTIONS).toEqual(copy)
  })

  it('全ドメインから出題される', () => {
    const result = buildMockExam(ALL_QUESTIONS)
    const domainIds = new Set(result.map(q => q.domainId))
    expect(domainIds.size).toBe(DOMAINS.length)
  })

  it('ドメインごとの配分が合計50問になる（端数調整込み）', () => {
    const result = buildMockExam(ALL_QUESTIONS)
    const totalRatio = DOMAINS.reduce((sum, d) => sum + d.ratio, 0)
    for (const domain of DOMAINS) {
      const count = result.filter(q => q.domainId === domain.id).length
      const expected = Math.round((domain.ratio / totalRatio) * 50)
      // 最大剰余法で±1の誤差は許容
      expect(Math.abs(count - expected)).toBeLessThanOrEqual(1)
    }
  })
})
