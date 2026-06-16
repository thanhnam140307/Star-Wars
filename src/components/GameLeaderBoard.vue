<template>
  <div class="row">
    <div class="col-md-12">
      <h2><img src="@/assets/icons/savings.svg" class="me-2" />Le plus riche</h2>
      <div class="card mb-3" data-testid="richest-card">
        <div class="card-body">
          <div data-testid="richest-name">{{richestName}}</div>
          <div data-testid="richest-amount">{{richestAmount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game.store'
import { storeToRefs } from "pinia";

const gameStore = useGameStore()
const { richestName, richestAmount } = storeToRefs(gameStore);
</script>
