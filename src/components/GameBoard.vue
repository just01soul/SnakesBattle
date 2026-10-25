<script setup lang="ts">
  import type { Point } from '@/game/types';
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      snake: Point[]
      food: Point
      gridSize?: number
    }>(),
    { gridSize: 20 },
  )

  const totalCells = computed(() => props.gridSize * props.gridSize)

  /* Функция вычесления позиции головы змейки */
  function isSnakeHead(x: number, y: number) {
    const [head] = props.snake
    return head !== undefined && head.x === x && head.y === y
  }

  /* Функция вычесления позиции тела змейки */
  function isSnakeBody(x: number, y: number) {
    const body = props.snake.slice(1)
    return body.some(p => p.x === x && p.y === y)
  }

  /* Функция вычесления позиции еды */
  function isFood(x: number, y: number) {
    return x === props.food.x && y === props.food.y
  }

  /* Функция отрисовки игрового поля */
  function cellClass(i: number) {
    const x = i % props.gridSize
    const y = Math.floor(i / props.gridSize)

    return {
      'bg-snake-head': isSnakeHead(x, y),
      'bg-snake-body': isSnakeBody(x, y),
      'bg-snake-food': isFood(x, y),
      'bg-snake-grid': !isSnakeHead(x, y) && !isSnakeBody(x, y) && !isFood(x, y)
    }
  }
</script>

<template>
  <div class="grid aspect-square gap-px" :style="{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }">
    <div v-for="(_, idx) in totalCells" :key="`cell-${idx}`" :class="cellClass(idx)"></div>
  </div>
</template>
