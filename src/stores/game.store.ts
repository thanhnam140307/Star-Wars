import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Icon } from '@/enums/Icon'

import { actions } from '@/data/actions.ts'
import { fightOptions } from '@/data/fightOptions.ts'
import { type Action } from '@/types/Action'

import { jedis } from '@/data/jedis.ts'
import { siths } from '@/data/siths.ts'
import { type Player } from '@/types/Player'
import { getRandomPlayer } from '@/game/playerLogic'

import { starships } from '@/data/starships.ts'
import { type Starship } from '@/types/Starship'
import { getRandomShip } from '@/game/starshipLogic'

import { diminishToMax, MIN_VALUE, POINTS_WON } from '@/game/gameLogic'

export const useGameStore = defineStore('GameStore', () => {
  const allActions = ref<Action[]>(JSON.parse(JSON.stringify(actions)))
  const allFightOptions = ref<Action[]>(JSON.parse(JSON.stringify(fightOptions)))

  const jedi = ref<Player>({ name: '', piloting: MIN_VALUE, credits: MIN_VALUE })
  const sith = ref<Player>({ name: '', piloting: MIN_VALUE, credits: MIN_VALUE })
  const jediShip = ref<Starship>({
    name: '',
    rocket: MIN_VALUE,
    battery: MIN_VALUE,
    destruction: MIN_VALUE,
  })
  const sithShip = ref<Starship>({
    name: '',
    rocket: MIN_VALUE,
    battery: MIN_VALUE,
    destruction: MIN_VALUE,
  })

  const logMessage = ref('')
  const richestName = ref('')
  const richestAmount = ref<number>()

  const canShowStats = ref(false)
  const currentIcon = ref<Icon>(Icon.Empty)

  let jedisList: Player[] = JSON.parse(JSON.stringify(jedis))
  let sithList: Player[] = JSON.parse(JSON.stringify(siths))
  let shipList: Starship[] = JSON.parse(JSON.stringify(starships))

  let previousEnnemy = ref('')
  let numberOfMissiles = ref<number>(1)

  function win(): void {
    modifyLogMessages(Icon.Victory)

    jedi.value.credits += sith.value.credits
    jedi.value.piloting += POINTS_WON

    jedi.value.piloting = diminishToMax(jedi.value.piloting)

    sith.value = getRandomPlayer(sithList)
    sithShip.value = getRandomShip(shipList)
  }

  function escape(): void {
    modifyLogMessages(Icon.Escape)

    sith.value = getRandomPlayer(sithList)
    sithShip.value = getRandomShip(shipList)
  }

  function modifyLogMessages(icon: Icon, defeatType?: string): void {
    if (icon == Icon.Empty) {
      logMessage.value = ''
      currentIcon.value = icon
    } else if (icon == Icon.Return) {
      logMessage.value = `Retour à la base - ${jedi.value.name} possède ${jedi.value.credits} CG`
      currentIcon.value = Icon.Return
      canShowStats.value = false
    } else if (icon == Icon.Victory) {
      logMessage.value = `Victoire - ${jedi.value.name} a vaincu ${sith.value.name} (+${sith.value.credits} CG)`
      currentIcon.value = Icon.Victory
    } else if (icon == Icon.Defeat && defeatType == 'Destroyed') {
      logMessage.value = `Défaite - ${jedi.value.name} a été détruit par ${previousEnnemy.value}`
      currentIcon.value = Icon.Defeat
      canShowStats.value = true
    } else if (icon == Icon.Defeat && defeatType == 'Power') {
      logMessage.value = `Défaite - ${jedi.value.name} était en rupture d'énergie`
      currentIcon.value = Icon.Defeat
      canShowStats.value = true
    } else if (icon == Icon.Escape) {
      logMessage.value = `Fuite - ${sith.value.name} a pris fuite`
      currentIcon.value = Icon.Escape
    }
  }

  return {
    allActions,
    allFightOptions,
    jedi,
    sith,
    jediShip,
    sithShip,
    jedisList,
    sithList,
    shipList,
    logMessage,
    richestName,
    richestAmount,
    canShowStats,
    currentIcon,
    win,
    escape,
    modifyLogMessages,
    numberOfMissiles,
    previousEnnemy,
  }
})
