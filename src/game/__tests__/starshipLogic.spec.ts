import { describe, it, expect } from 'vitest'
import { type Starship } from '@/types/Starship'
import { getRandomShip } from '@/game/starshipLogic'

const MAX: number = 1000
const MIN: number = 0

describe('getRandomShip', () => {
  it('devrait retourner un vaisseau de la list', () => {
    const starships: Starship[] = [
      { name: 'A-Wing starfighter', rocket: MAX, battery: MAX, destruction: MAX },
    ]

    const starship: Starship = getRandomShip(starships)

    expect(starship.name).toEqual('A-Wing starfighter')
    expect(starship.rocket).toEqual(MAX)
    expect(starship.battery).toEqual(MAX)
    expect(starship.destruction).toEqual(MAX)
  })

  it('devrait retourner un vaisseau sans nom, rocket, battery et destruction si aucun vaisseau dans la liste', () => {
    const starships: Starship[] = []

    const starship: Starship = getRandomShip(starships)

    expect(starship.name).toEqual('')
    expect(starship.rocket).toEqual(MIN)
    expect(starship.battery).toEqual(MIN)
    expect(starship.destruction).toEqual(MIN)
  })
})
