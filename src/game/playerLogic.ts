import { type Player } from '@/types/Player'
import { getRandom } from '@/game/random'
import { MIN_VALUE } from '@/game/gameLogic'

export function getRandomPlayer(players: Player[]): Player {
  return (
    players[getRandom(MIN_VALUE, players.length - 1)] ?? {
      name: '',
      piloting: MIN_VALUE,
      credits: MIN_VALUE,
    }
  )
}
