import type { Direction, GameState, Point } from './types'

const DELTAS: Record<Direction, Point> = {
  up:    { x: 0,  y: -1 },
  down:  { x: 0,  y: 1  },
  left:  { x: -1, y: 0  },
  right: { x: 1,  y: 0  },
}

/* Функция создания начальных настроек */
export function createInitialState(): GameState {
  return {
    snake:[{x: 2, y:4}, {x: 1, y:4}],
    food: {x: 4, y: 4},
    direction: 'right',
    score: 0,
    isGameOver: false,
    isPaused: false
  }
}

/* Функция движения змейки */
export function moveSnake(state: GameState): GameState {
  const [head] = state.snake
  if (!head) return state

  const delta = DELTAS[state.direction]
  const newHead = {x: head.x + delta.x, y: head.y + delta.y }
  const newSnake = [newHead, ...state.snake.slice(0, -1)]

  return { ...state, snake: newSnake }
}

/* Функция столкновения змейки */
export function checkCollision(state: GameState, gridSize: number): boolean {
  const body = state.snake.slice(1, -1)
  const [head] = state.snake
  if (!head) return false

  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) return true
  return body.some(p => p.x === head.x && p.y === head.y)
}

/* Функция появления еды */
export function spawnFood(snake: Point[], gridSize: number): Point {
  let x: number
  let y: number
  do {
    x = Math.floor(Math.random() * gridSize)
    y = Math.floor(Math.random() * gridSize)
  } while ( snake.some(p => p.x === x && p.y === y))
  return { x, y }
}
