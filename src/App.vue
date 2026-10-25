<script setup lang="ts">
  import { ref } from 'vue';
  import GameBoard from './components/GameBoard.vue';
  import { createInitialState, moveSnake } from './game/snake.ts';
  import type { GameState } from './game/types.ts';

  const game = ref<GameState>(createInitialState())
</script>

<template>
  <GameBoard :snake="game.snake" :food="game.food" />
  <button @click="game = moveSnake(game)">Шаг</button>
</template>

<style scoped></style>
