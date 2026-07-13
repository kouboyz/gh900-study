import { Question } from '../types/quiz'
import { DOMAINS } from '../data/domains'
import { shuffle } from './shuffle'

// Official GH-900 exam: 75 questions, passing score 700/1000 (≈70%)
// Study guide ratios: D1 25-30%, D2-D4,D6 10-15%, D5,D7 5-10%
// domains.ts stores midpoints: D1=28, D2-D4,D6=13, D5,D7=8 (all within official ranges)
const EXAM_TOTAL = 50

export function buildMockExam(questions: Question[]): Question[] {
  const totalRatio = DOMAINS.reduce((sum, d) => sum + d.ratio, 0)

  // Largest-remainder method: allocate floors first, then distribute rounding remainder
  const withRemainders = DOMAINS.map(d => {
    const raw = (d.ratio / totalRatio) * EXAM_TOTAL
    return { id: d.id, floor: Math.floor(raw), remainder: raw - Math.floor(raw) }
  })
  const totalFloor = withRemainders.reduce((sum, d) => sum + d.floor, 0)
  const extra = EXAM_TOTAL - totalFloor

  const sorted = [...withRemainders].sort((a, b) => b.remainder - a.remainder)
  const counts: Record<string, number> = {}
  sorted.forEach((d, i) => { counts[d.id] = d.floor + (i < extra ? 1 : 0) })

  const result: Question[] = []
  for (const domain of DOMAINS) {
    const pool = shuffle(questions.filter(q => q.domainId === domain.id))
    result.push(...pool.slice(0, counts[domain.id]))
  }
  return shuffle(result)
}
