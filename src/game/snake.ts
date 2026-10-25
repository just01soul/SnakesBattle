import type { Direction, GameState, Point } from './types'

const DELTAS: Record<Direction, Point> = {
  up:    { x: 0,  y: -1 },
  down:  { x: 0,  y: 1  },
  left:  { x: -1, y: 0  },
  right: { x: 1,  y: 0  },
}

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

export function moveSnake(state: GameState): GameState {
  const [head] = state.snake
  if (!head) return state

  const delta = DELTAS[state.direction]
  const newHead = {x: head.x + delta.x, y: head.y + delta.y }
  const newSnake = [newHead, ...state.snake.slice(0, -1)]

  return { ...state, snake: newSnake }
}
