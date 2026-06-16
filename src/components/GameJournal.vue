<template>
  <div class="row">
    <div class="col-md-12">
      <h2><img src="@/assets/icons/history.svg" class="me-2" /> Journal de bord</h2>
      <div class="card mb-3" data-testid="log-card">
        <div class="card-body">
          <div data-testid="log-message"><i :class="currentIcon"></i>{{ logMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game.store'
import { storeToRefs } from "pinia";

const gameStore = useGameStore()
const { logMessage, currentIcon } = storeToRefs(gameStore);
</script>
