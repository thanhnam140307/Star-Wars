<template>
  <h2><img src="@/assets/icons/fight_options.svg" class="me-2" />Options de combat</h2>

  <div
    data-testid="fightOptions-toolbar"
    class="btn-toolbar mb-3"
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <div
      class="btn-group me-2"
      role="group"
      aria-label="First group"
      v-for="fightOption in allFightOptions"
      v-bind:key="fightOption.id"
    >
      <button
        type="button"
        :data-testid="fightOption.testId"
        :disabled="fightOption.isDisabled"
        @click="onFightOptionClick(fightOption.id)"
      >
        <img :src="fightOption.image" class="me-2" />
        <span>{{ fightOption.description }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game.store'
import { storeToRefs } from 'pinia'
import { getAction } from '@/game/actionLogic'
import { type Action } from '@/types/Action'
import { getRandom } from '@/game/random'
import { MIN_VALUE } from '@/game/gameLogic'

const gameStore = useGameStore()
const { allFightOptions, sithShip, numberOfMissiles } = storeToRefs(gameStore)

function onFightOptionClick(id: number): void {
  const optionMissile = getAction(allFightOptions.value, 1)

  switch (id) {
    case optionMissile.id:
      lauchMissile(optionMissile)
      break
  }
}

function lauchMissile(optionMissile: Action): void {
  if (numberOfMissiles.value > 0) {
    numberOfMissiles.value -= 1
    sithShip.value.rocket -= getRandom(30, 50)

    if (sithShip.value.battery <= 5) {
      gameStore.escape()
    }

    if (sithShip.value.rocket <= MIN_VALUE) {
      gameStore.win()
    }
  }

  if (numberOfMissiles.value <= 0) {
    optionMissile.isDisabled = true
  }
}
</script>
