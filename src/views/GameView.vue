<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10">
        <!-- Actions -->
        <GameAction />

        <!-- Options de combat -->
        <GameFightOptions />

        <!-- Joueur and Ennemi -->
        <GamePlayers />

        <!-- Journal de bord -->
        <GameJournal />

        <!-- Le plus Riche -->
        <GameLeaderBoard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameAction from '@/components/GameAction.vue'
import GameJournal from '@/components/GameJournal.vue'
import GameLeaderBoard from '@/components/GameLeaderBoard.vue'
import GamePlayers from '@/components/GamePlayers.vue'
import GameFightOptions from '@/components/GameFightOptions.vue'
</script>
