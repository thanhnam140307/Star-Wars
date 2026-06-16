import { describe, it, expect } from 'vitest'
import { getRandomPlayer } from '@/game/playerLogic'
import { type Player } from '@/types/Player'

const MAX: number = 1000
const MIN: number = 0

describe('getRandomPlayer', () => {
  it('devrait retourner un joureur de la list', () => {
    const players: Player[] = [{ name: 'Aayla Secura', piloting: MAX, credits: MAX }]

    const player: Player = getRandomPlayer(players)

    expect(player.name).toEqual('Aayla Secura')
    expect(player.credits).toEqual(MAX)
    expect(player.piloting).toEqual(MAX)
  })

  it('devrait retourner un joureur sans nom, sans credits et sans piloting si aucun joureur est dans la liste', () => {
    const players: Player[] = []

    const player: Player = getRandomPlayer(players)

    expect(player.name).toEqual('')
    expect(player.credits).toEqual(MIN)
    expect(player.piloting).toEqual(MIN)
  })
})
