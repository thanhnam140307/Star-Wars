import { describe, it, expect, vi, afterEach } from 'vitest'
import { getRandom } from '@/game/random'

describe('getRandom', () => {
  afterEach(() => vi.restoreAllMocks())
  it('devrait retourner une valeur aléatoire', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(getRandom(0, 5)).toEqual(0)
  })
})
