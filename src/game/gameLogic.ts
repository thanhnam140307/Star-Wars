import { type Starship } from '@/types/Starship'
import { getRandom } from '@/game/random'

const MAX_VALUE = 100
export const MIN_VALUE = 0
export const REQUIRED_CREDITS = 250
export const POINTS_WON = 5
export const POINTS_LOST = 5

export function fight(playerPiloting: number, playerShip: Starship, ennemyShip: Starship): void {
  playerShip.battery -= getRandom(3, POINTS_LOST)
  ennemyShip.battery -= getRandom(3, POINTS_LOST)

  const chanceOfHitting = getRandom(1, MAX_VALUE)

  if (chanceOfHitting <= playerPiloting) {
    ennemyShip.rocket -= playerShip.destruction / POINTS_LOST
    ennemyShip.destruction -= getRandom(MIN_VALUE, POINTS_LOST)
  }

  playerShip.rocket -= ennemyShip.destruction / POINTS_LOST
  playerShip.destruction -= getRandom(MIN_VALUE, POINTS_LOST)

  playerShip.battery = Math.round(augmentToMin(playerShip.battery))
  playerShip.rocket = Math.round(augmentToMin(playerShip.rocket))
  playerShip.destruction = Math.round(augmentToMin(playerShip.destruction))

  ennemyShip.battery = Math.round(augmentToMin(ennemyShip.battery))
  ennemyShip.rocket = Math.round(augmentToMin(ennemyShip.rocket))
  ennemyShip.destruction = Math.round(augmentToMin(ennemyShip.destruction))
}

function augmentToMin(valueToChange: number): number {
  if (valueToChange < MIN_VALUE) {
    valueToChange = MIN_VALUE
  }
  return valueToChange
}

export function diminishToMax(valueToChange: number): number {
  if (valueToChange > MAX_VALUE) {
    valueToChange = MAX_VALUE
  }
  return valueToChange
}

export function canRepair(credits: number, rocket: number): boolean {
  return credits >= REQUIRED_CREDITS && rocket < MAX_VALUE
}

export function disablePropel(battery: number): boolean {
  return battery < 20
}
