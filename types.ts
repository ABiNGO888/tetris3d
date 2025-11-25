export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface Tetromino {
  shape: number[][];
  color: string;
  type: TetrominoType;
}

export type GridCell = { type: TetrominoType; color: string } | null;
export type Grid = GridCell[][];

export interface PlayerState {
  pos: { x: number; y: number };
  tetromino: Tetromino;
  collided: boolean;
}

export enum GameStatus {
  INTRO,
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER,
  CLEARING,
}