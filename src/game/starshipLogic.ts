import { type Starship } from '@/types/Starship'
import { getRandom } from '@/game/random'
import { MIN_VALUE } from '@/game/gameLogic'

export function getRandomShip(starships: Starship[]): Starship {
  return (
    starships[getRandom(MIN_VALUE, starships.length - 1)] ?? {
      name: '',
      rocket: MIN_VALUE,
      battery: MIN_VALUE,
      destruction: MIN_VALUE,
    }
  )
}
