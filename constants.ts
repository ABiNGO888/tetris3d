import { Tetromino, TetrominoType } from './types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// Jewel Tone Glass Palette - Richer, deeper colors that look clearer in volumetric glass
export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00A3FF', // Topaz Blue (Cyan-ish but deeper)
  J: '#0022FF', // Sapphire Blue
  L: '#FF8000', // Vivid Orange
  O: '#FFD700', // Gold
  S: '#00CC44', // Emerald Green
  T: '#9900FF', // Amethyst Purple
  Z: '#E60000', // Ruby Red
};

export const TETROMINOS: Record<TetrominoType, Tetromino> = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    color: TETROMINO_COLORS.I,
    type: 'I',
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: TETROMINO_COLORS.J,
    type: 'J',
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: TETROMINO_COLORS.L,
    type: 'L',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: TETROMINO_COLORS.O,
    type: 'O',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.S,
    type: 'S',
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.T,
    type: 'T',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: TETROMINO_COLORS.Z,
    type: 'Z',
  },
};

export const randomTetromino = (): Tetromino => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)] as TetrominoType;
  return TETROMINOS[randTetromino];
};