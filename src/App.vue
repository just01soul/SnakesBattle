<script setup lang="ts">
  import { ref } from 'vue';
  import GameBoard from './components/GameBoard.vue';
  import { checkCollision, createInitialState, moveSnake, spawnFood } from './game/snake.ts';
  import type { GameState } from './game/types.ts';

  const game = ref<GameState>(createInitialState())
  const hasCollision = ref(false)
  const GRID_SIZE = 20

  function step() {
    game.value = moveSnake(game.value)
    hasCollision.value = checkCollision(game.value, GRID_SIZE)
  }

  function spawn() {
    game.value.food = spawnFood(game.value.snake, GRID_SIZE)
  }
</script>

<template>
  <GameBoard :snake="game.snake" :food="game.food" />
  <button @click="step">Шаг</button>
  <p v-if="hasCollision" class="text-red-500">Game Over</p>
  <button @click="spawn()">spawn</button>
</template>

<style scoped></style>
