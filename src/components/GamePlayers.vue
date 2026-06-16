<template>
  <div class="row">
    <div class="col-md-6" v-for="(player, i) in players" v-bind:key="i">
      <h2><img :src="images[i]" class="me-2" /> {{ types[i] }}</h2>
      <div class="card mb-3">
        <div class="card-body">
          <h3 class="card-title">{{ player.value.name }}</h3>
          <div class="mb-3">
            <div class="d-flex align-items-center">
              <img src="@/assets/icons/self_improvement.svg" class="me-2" />
              <div class="progress flex-grow-1">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="{ width: player.value.piloting + '%' }"
                ></div>
              </div>
              <div v-if="canShowStats" class="ms-2">{{ Math.round(player.value.piloting) }}%</div>
            </div>
            <div class="d-flex align-items-center">
              <img src="@/assets/icons/savings.svg" class="me-2" />
              <span class="me-2">{{ player.value.credits }} CG</span>
            </div>
          </div>
          <h3 class="card-title">{{ starships[i]?.value.name }}</h3>

          <div class="d-flex align-items-center mb-3">
            <img src="@/assets/icons/rocket.svg" class="me-2" />
            <div class="progress flex-grow-1">
              <div
                class="progress-bar bg-warning"
                role="progressbar"
                :style="{ width: starships[i]?.value.rocket + '%' }"
              ></div>
            </div>
            <div v-if="canShowStats" class="ms-2">{{ starships[i]?.value.rocket ?? 0 }}%</div>
          </div>
          <div class="d-flex align-items-center mb-3">
            <img src="@/assets/icons/battery_charging_full.svg" class="me-2" />
            <div class="progress flex-grow-1">
              <div
                class="progress-bar bg-primary"
                role="progressbar"
                :style="{ width: starships[i]?.value.battery + '%' }"
              ></div>
            </div>
            <div v-if="canShowStats" class="ms-2">{{ starships[i]?.value.battery }}%</div>
          </div>
          <div class="d-flex align-items-center">
            <img src="@/assets/icons/destruction.svg" class="me-2" />
            <div class="progress flex-grow-1">
              <div
                class="progress-bar bg-danger"
                role="progressbar"
                :style="{ width: starships[i]?.value.destruction + '%' }"
              ></div>
            </div>
            <div v-if="canShowStats" class="ms-2">{{ starships[i]?.value.destruction }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import rocketImage from '@/assets/icons/jedi.svg'
import sithImage from '@/assets/icons/sith.svg'

import { useGameStore } from '@/stores/game.store'
import { storeToRefs } from "pinia";

const gameStore = useGameStore()
const { jedi, sith, canShowStats, jediShip, sithShip } = storeToRefs(gameStore);
const players = [jedi, sith]
const starships = [jediShip, sithShip]

const images = [rocketImage, sithImage]
const types = ['Jedi', 'Sith']
</script>
