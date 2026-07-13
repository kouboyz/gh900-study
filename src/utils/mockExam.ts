import { Question } from '../types/quiz'
import { DOMAINS } from '../data/domains'
import { shuffle } from './shuffle'

/**
 * 模擬試験（50問）を生成する
 * ドメインごとの出題比率に基づいて問題を抽出する
 */
export function buildMockExam(questions: Question[]): Question[] {
  const TOTAL_QUESTIONS = 50
  const result: Question[] = []

  DOMAINS.forEach(domain => {
    const domainQuestions = questions.filter(q => q.domainId === domain.id)
    const count = Math.round((domain.ratio / 100) * TOTAL_QUESTIONS)
    
    // ドメイン内の問題をシャッフルして必要な数だけ抽出
    const selected = shuffle([...domainQuestions]).slice(0, count)
    result.push(...selected)
  })

  // 合計が50問にならない場合の調整（端数処理の関係）
  if (result.length < TOTAL_QUESTIONS) {
    const remainingCount = TOTAL_QUESTIONS - result.length
    const currentIds = new Set(result.map(q => q.id))
    const available = questions.filter(q => !currentIds.has(q.id))
    result.push(...shuffle(available).slice(0, remainingCount))
  } else if (result.length > TOTAL_QUESTIONS) {
    // 50問を超える場合はランダムに削る
    return shuffle(result).slice(0, TOTAL_QUESTIONS)
  }

  return shuffle(result)
}
