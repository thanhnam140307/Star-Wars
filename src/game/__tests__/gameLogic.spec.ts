import { describe, it, expect, vi, afterEach } from 'vitest'
import { type Starship } from '@/types/Starship'
import {
  fight,
  diminishToMax,
  canRepair,
  disablePropel,
  MIN_VALUE,
  REQUIRED_CREDITS,
} from '@/game/gameLogic'

const STATS: number = 10
const NEGATIVE_AMOUNT: number = -1
const EXPERIENCE: number = 101
const RANDOM_NUMBER = 1
const BATTERY: number = 20
const MAX: number = 100
const MODIFYING_AMOUNT: number = 10

describe('gameLogic', () => {
  describe('fight', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it("devrait diminuer le niveau d'énergie des vaisseaux.", () => {
      vi.spyOn(Math, 'random').mockReturnValue(RANDOM_NUMBER)

      const playerShip: Starship = {
        name: '',
        rocket: STATS,
        battery: STATS,
        destruction: STATS,
      }
      const ennemyShip: Starship = {
        name: '',
        rocket: STATS,
        battery: STATS,
        destruction: STATS,
      }

      fight(0, playerShip, ennemyShip)

      expect(playerShip.battery).toEqual(4)
      expect(ennemyShip.battery).toEqual(4)
    })

    it("devrait diminuer 1% d'état par tranche de 5% s'il sont touchés.", () => {
      vi.spyOn(Math, 'random').mockReturnValue(RANDOM_NUMBER)

      const playerShip: Starship = {
        name: '',
        rocket: STATS,
        battery: STATS,
        destruction: STATS,
      }
      const ennemyShip: Starship = {
        name: '',
        rocket: STATS,
        battery: STATS,
        destruction: STATS,
      }

      fight(EXPERIENCE, playerShip, ennemyShip)

      expect(ennemyShip.rocket).toEqual(8)
      expect(playerShip.rocket).toEqual(9)
    })

    it("devrait diminuer la puissance de feu du vaisseau s'il sont touchés.", () => {
      vi.spyOn(Math, 'random').mockReturnValue(RANDOM_NUMBER)

      const playerShip: Starship = {
        name: '',
        rocket: STATS,
        battery: STATS,
        destruction: STATS,
      }
      const ennemyShip: Starship = {
        name: '',
        rocket: STATS,
        battery: STATS,
        destruction: STATS,
      }

      fight(EXPERIENCE, playerShip, ennemyShip)

      expect(ennemyShip.destruction).toEqual(4)
      expect(playerShip.destruction).toEqual(4)
    })

    it("devrait mettre à 0% les attributs des vaisseaux s'ils sont négatives.", () => {
      const playerShip: Starship = {
        name: '',
        rocket: NEGATIVE_AMOUNT,
        battery: NEGATIVE_AMOUNT,
        destruction: NEGATIVE_AMOUNT,
      }
      const ennemyShip: Starship = {
        name: '',
        rocket: NEGATIVE_AMOUNT,
        battery: NEGATIVE_AMOUNT,
        destruction: NEGATIVE_AMOUNT,
      }

      fight(EXPERIENCE, playerShip, ennemyShip)

      expect(playerShip.battery).toEqual(MIN_VALUE)
      expect(playerShip.destruction).toEqual(MIN_VALUE)
      expect(playerShip.rocket).toEqual(MIN_VALUE)

      expect(ennemyShip.battery).toEqual(MIN_VALUE)
      expect(ennemyShip.destruction).toEqual(MIN_VALUE)
      expect(ennemyShip.rocket).toEqual(MIN_VALUE)
    })
  })

  describe('changeToMax', () => {
    it('devrait changer une valeur plus grande que maximale à la valeur maximale', () => {
      let value = MAX + MODIFYING_AMOUNT

      value = diminishToMax(value)

      expect(value).toEqual(MAX)
    })

    it('ne devrait pas changer une valeur plus petite que maximale à la valeur maximale', () => {
      let value = MODIFYING_AMOUNT

      value = diminishToMax(value)

      expect(value).toEqual(MODIFYING_AMOUNT)
    })

    it('ne devrait pas changer une valeur plus égale à maximale à la valeur maximale', () => {
      let value = MAX

      value = diminishToMax(value)

      expect(value).toEqual(MAX)
    })
  })

  describe('canRepair', () => {
    it("devrait pouvoir réparer si le nombre de credit est égale au nombre nécessaire et l'état du vaisseau est plus petit que la valeur max", () => {
      const value = canRepair(REQUIRED_CREDITS, MAX - MODIFYING_AMOUNT)

      expect(value).toBeTruthy()
    })

    it("devrait pouvoir réparer si le nombre de credit est plus grand au nombre nécessaire et l'état du vaisseau est plus petit que la valeur max", () => {
      const value = canRepair(REQUIRED_CREDITS + MODIFYING_AMOUNT, MAX - MODIFYING_AMOUNT)

      expect(value).toBeTruthy()
    })

    it("ne devrait pas pouvoir réparer si le nombre de credit est plus petit au nombre nécessaire et l'état du vaisseau est plus petit que la valeur max", () => {
      const value = canRepair(REQUIRED_CREDITS - MODIFYING_AMOUNT, MAX - MODIFYING_AMOUNT)

      expect(value).toBeFalsy()
    })

    it("ne devrait pas pouvoir réparer si le nombre de credit est égale au nombre nécessaire et l'état du vaisseau est égale à la valeur max", () => {
      const value = canRepair(REQUIRED_CREDITS, MAX)

      expect(value).toBeFalsy()
    })

    it("ne devrait pas pouvoir réparer si le nombre de credit est plus petit au nombre nécessaire et l'état du vaisseau est plus grand que la valeur max", () => {
      const value = canRepair(REQUIRED_CREDITS - MODIFYING_AMOUNT, MAX + MODIFYING_AMOUNT)

      expect(value).toBeFalsy()
    })
  })

  describe('disablePropel', () => {
    it("ne devrait pas éteindre les propulsions si le niveau d'énergie est plus haut que 20", () => {
      const value = disablePropel(BATTERY + MODIFYING_AMOUNT)

      expect(value).toBeFalsy()
    })

    it("ne devrait pas éteindre les propulsions si le niveau d'énergie est égale à 20", () => {
      const value = disablePropel(BATTERY)

      expect(value).toBeFalsy()
    })

    it("devrait éteindre les propulsions si le niveau d'énergie est plus petit que 20", () => {
      const value = disablePropel(BATTERY - MODIFYING_AMOUNT)

      expect(value).toBeTruthy()
    })
  })
})
