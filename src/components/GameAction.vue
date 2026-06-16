<template>
  <h2><img src="@/assets/icons/actions.svg" class="me-2" />Actions</h2>

  <div
    data-testid="actions-toolbar"
    class="btn-toolbar mb-3"
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <div
      class="btn-group me-2"
      role="group"
      aria-label="First group"
      v-for="action in allActions"
      v-bind:key="action.id"
    >
      <button
        type="button"
        :data-testid="action.testId"
        :disabled="action.isDisabled"
        @click="onActionClick(action.id)"
      >
        <img :src="action.image" class="me-2" />
        <span>{{ action.description }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game.store'
import { storeToRefs } from 'pinia'
import { getAction } from '@/game/actionLogic'
import { type Action } from '@/types/Action'
import { siths } from '@/data/siths.ts'
import { getRandomPlayer } from '@/game/playerLogic'

import { starships } from '@/data/starships.ts'
import { getRandomShip } from '@/game/starshipLogic'
import { Icon } from '@/enums/Icon'

import { getRandom } from '@/game/random'

import {
  fight,
  diminishToMax,
  canRepair,
  disablePropel,
  REQUIRED_CREDITS,
  MIN_VALUE,
  POINTS_WON,
  POINTS_LOST,
} from '@/game/gameLogic'

const gameStore = useGameStore()
const {
  allActions,
  allFightOptions,
  jedi,
  sith,
  jediShip,
  sithShip,
  richestName,
  richestAmount,
  numberOfMissiles,
  previousEnnemy
} = storeToRefs(gameStore)
let {jedisList, sithList, shipList } = gameStore

function onActionClick(id: number): void {
  const actionBegin = getAction(allActions.value, 1)
  const actionEnd = getAction(allActions.value, 2)
  const actionRepair = getAction(allActions.value, 3)
  const actionPropel = getAction(allActions.value, 4)
  const actionFight = getAction(allActions.value, 5)

  const optionMissile = getAction(allFightOptions.value, 1)

  switch (id) {
    case actionBegin.id:
      beginMission(actionBegin, actionEnd, actionRepair, actionFight, actionPropel, optionMissile)
      break
    case actionEnd.id:
      endMission(actionBegin, actionEnd, actionRepair, actionFight, actionPropel, optionMissile)
      break
    case actionRepair.id:
      repair(actionRepair)
      break
    case actionPropel.id:
      propel(actionPropel)
      break
    case actionFight.id:
      beginFight(actionRepair, actionFight, actionPropel, optionMissile)
      break
  }
}

function beginMission(
  actionBegin: Action,
  actionEnd: Action,
  actionRepair: Action,
  actionFight: Action,
  actionPropel: Action,
  optionMissile: Action,
): void {
  actionBegin.isDisabled = true
  actionEnd.isDisabled = false
  actionFight.isDisabled = false
  actionPropel.isDisabled = false
  optionMissile.isDisabled = false

  numberOfMissiles.value = 1

  jedi.value = getRandomPlayer(jedisList)
  sith.value = getRandomPlayer(sithList)

  jediShip.value = getRandomShip(shipList)
  sithShip.value = getRandomShip(shipList)

  getRichest()
  gameStore.modifyLogMessages(Icon.Empty)

  actionRepair.isDisabled = !canRepair(jedi.value.credits, jediShip.value.rocket)
}

function endMission(
  actionBegin: Action,
  actionEnd: Action,
  actionRepair: Action,
  actionFight: Action,
  actionPropel: Action,
  optionMissile: Action,
): void {
  actionBegin.isDisabled = false
  actionEnd.isDisabled = true
  actionRepair.isDisabled = true
  actionFight.isDisabled = true
  actionPropel.isDisabled = true
  optionMissile.isDisabled = true

  gameStore.modifyLogMessages(Icon.Return)

  jedi.value = { name: '', piloting: MIN_VALUE, credits: MIN_VALUE }
  sith.value = { name: '', piloting: MIN_VALUE, credits: MIN_VALUE }
  jediShip.value = { name: '', rocket: MIN_VALUE, battery: MIN_VALUE, destruction: MIN_VALUE }
  sithShip.value = { name: '', rocket: MIN_VALUE, battery: MIN_VALUE, destruction: MIN_VALUE }

  sithList = JSON.parse(JSON.stringify(siths))
  shipList = JSON.parse(JSON.stringify(starships))
}

function propel(actionPropel: Action): void {
  jediShip.value.battery -= getRandom(POINTS_LOST, 15)
  sith.value = getRandomPlayer(sithList)
  sithShip.value = getRandomShip(shipList)
  actionPropel.isDisabled = disablePropel(jediShip.value.battery)
}

function beginFight(
  actionRepair: Action,
  actionFight: Action,
  actionPropel: Action,
  optionMissile: Action,
): void {
  fight(jedi.value.piloting, jediShip.value, sithShip.value)

  actionPropel.isDisabled = disablePropel(jediShip.value.battery)
  actionRepair.isDisabled = !canRepair(jedi.value.credits, jediShip.value.rocket)
  previousEnnemy.value = sith.value.name

  if (sithShip.value.battery <= 5) {
    gameStore.escape()
  }

  if (sithShip.value.rocket <= MIN_VALUE) {
    gameStore.win()
  }

  if (jediShip.value.battery <= MIN_VALUE) {
    gameStore.modifyLogMessages(Icon.Defeat, 'Power')
    actionFight.isDisabled = true
    actionRepair.isDisabled = true
  }

  if (jediShip.value.rocket <= MIN_VALUE) {
    gameStore.modifyLogMessages(Icon.Defeat, 'Destroyed')
    actionFight.isDisabled = true
    actionRepair.isDisabled = true
    actionPropel.isDisabled = true
    optionMissile.isDisabled = true
  }

  getRichest()
}

function repair(actionRepair: Action): void {
  if (canRepair(jedi.value.credits, jediShip.value.rocket)) {
    jediShip.value.rocket += POINTS_WON
    jedi.value.credits -= REQUIRED_CREDITS

    jediShip.value.rocket = diminishToMax(jediShip.value.rocket)
  }

  actionRepair.isDisabled = !canRepair(jedi.value.credits, jediShip.value.rocket)
  getRichest()
}

function getRichest() {
  richestName.value = jedi.value.name
  richestAmount.value = jedi.value.credits

  for (const jedi of jedisList) {
    if (jedi.credits > richestAmount.value) {
      richestName.value = jedi.name
      richestAmount.value = jedi.credits
    }
  }
}
</script>
