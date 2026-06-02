import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useQuiz } from './useQuiz'
import type { Question } from '../types/quiz'

const makeQuestion = (id: string, correctChoiceIds: string[]): Question => ({
  id,
  domainId: 'D1',
  questionType: 'single-choice',
  difficulty: 'basic',
  question: `問題 ${id}`,
  choices: [
    { id: 'a', text: 'A' },
    { id: 'b', text: 'B' },
  ],
  correctChoiceIds,
  explanation: '',
  references: [],
})

const Q1 = makeQuestion('D1-001', ['a'])
const Q2 = makeQuestion('D1-002', ['b'])
const Q3 = makeQuestion('D1-003', ['a'])

describe('useQuiz', () => {
  describe('start', () => {
    it('問題リストを初期化し index が 0 になる', () => {
      const { result } = renderHook(() => useQuiz())
      act(() => result.current.start([Q1, Q2]))
      expect(result.current.quiz.index).toBe(0)
      expect(result.current.quiz.questions).toHaveLength(2)
      expect(result.current.quiz.answers).toHaveLength(0)
    })

    it('currentQuestion が最初の問題を返す', () => {
      const { result } = renderHook(() => useQuiz())
      act(() => result.current.start([Q1]))
      expect(result.current.currentQuestion?.id).toBe('D1-001')
    })

    it('isFinished が false になる', () => {
      const { result } = renderHook(() => useQuiz())
      act(() => result.current.start([Q1]))
      expect(result.current.isFinished).toBe(false)
    })
  })

  describe('answer', () => {
    it('正解の選択肢を選ぶと isCorrect が true になる', () => {
      const { result } = renderHook(() => useQuiz())
      const saveAnswer = vi.fn()
      act(() => result.current.start([Q1]))
      act(() => result.current.answer(['a'], saveAnswer))
      expect(result.current.quiz.answers[0]?.isCorrect).toBe(true)
    })

    it('不正解の選択肢を選ぶと isCorrect が false になる', () => {
      const { result } = renderHook(() => useQuiz())
      const saveAnswer = vi.fn()
      act(() => result.current.start([Q1]))
      act(() => result.current.answer(['b'], saveAnswer))
      expect(result.current.quiz.answers[0]?.isCorrect).toBe(false)
    })

    it('saveAnswer に questionId と正誤が渡る', () => {
      const { result } = renderHook(() => useQuiz())
      const saveAnswer = vi.fn()
      act(() => result.current.start([Q1]))
      act(() => result.current.answer(['a'], saveAnswer))
      expect(saveAnswer).toHaveBeenCalledWith('D1-001', true)
    })

    it('回答後に hasAnsweredCurrent が true になる', () => {
      const { result } = renderHook(() => useQuiz())
      const saveAnswer = vi.fn()
      act(() => result.current.start([Q1]))
      expect(result.current.hasAnsweredCurrent).toBe(false)
      act(() => result.current.answer(['a'], saveAnswer))
      expect(result.current.hasAnsweredCurrent).toBe(true)
    })
  })

  describe('next', () => {
    it('next を呼ぶと次の問題に進む', () => {
      const { result } = renderHook(() => useQuiz())
      const saveAnswer = vi.fn()
      // resume で順序を固定（start はシャッフルするため）
      act(() => result.current.resume([Q1, Q2], 0, []))
      act(() => result.current.answer(['a'], saveAnswer))
      act(() => result.current.next())
      expect(result.current.quiz.index).toBe(1)
      expect(result.current.currentQuestion?.id).toBe('D1-002')
    })
  })

  describe('isFinished の境界値', () => {
    it('最後の問題に答える前は isFinished が false', () => {
      const { result } = renderHook(() => useQuiz())
      const saveAnswer = vi.fn()
      act(() => result.current.resume([Q1, Q2], 0, []))
      act(() => result.current.answer(['a'], saveAnswer))
      act(() => result.current.next())
      expect(result.current.isFinished).toBe(false)
    })

    it('最後の問題に答えて next を呼ぶと isFinished が true になる', () => {
      const { result } = renderHook(() => useQuiz())
      const saveAnswer = vi.fn()
      act(() => result.current.resume([Q1, Q2], 0, []))
      act(() => result.current.answer(['a'], saveAnswer))
      act(() => result.current.next())
      act(() => result.current.answer(['b'], saveAnswer))
      act(() => result.current.next())
      expect(result.current.isFinished).toBe(true)
      expect(result.current.currentQuestion).toBeNull()
    })

    it('問題が空のときは isFinished が false のまま', () => {
      const { result } = renderHook(() => useQuiz())
      expect(result.current.isFinished).toBe(false)
    })
  })

  describe('resume', () => {
    it('途中状態から復元できる', () => {
      const { result } = renderHook(() => useQuiz())
      const existingAnswers = [
        { questionId: 'D1-001', domainId: 'D1', selectedIds: ['a'], isCorrect: true },
      ]
      act(() => result.current.resume([Q1, Q2, Q3], 1, existingAnswers))
      expect(result.current.quiz.index).toBe(1)
      expect(result.current.quiz.answers).toHaveLength(1)
      expect(result.current.currentQuestion?.id).toBe('D1-002')
    })
  })
})
