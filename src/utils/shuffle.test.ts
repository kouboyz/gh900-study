import { describe, it, expect } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('元の配列と同じ要素を含む', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffle(input)
    expect(result).toHaveLength(input.length)
    expect(result).toEqual(expect.arrayContaining(input))
  })

  it('元の配列を変更しない', () => {
    const input = [1, 2, 3, 4, 5]
    const copy = [...input]
    shuffle(input)
    expect(input).toEqual(copy)
  })

  it('空配列を渡すと空配列を返す', () => {
    expect(shuffle([])).toEqual([])
  })

  it('要素が1つの配列はそのまま返す', () => {
    expect(shuffle(['only'])).toEqual(['only'])
  })
})
