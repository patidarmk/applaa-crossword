import { type CrosswordData } from "../data/crosswordData";

export type CellData = {
  isBlack: boolean;
  number: number | null;
  answer: string | null;
  clues: {
    across: number | null;
    down: number | null;
  };
  row: number;
  col: number;
};

export type GridData = CellData[][];

export const generateGridData = (puzzle: CrosswordData): GridData => {
  const { size, clues } = puzzle;
  const grid: GridData = Array.from({ length: size.rows }, (_, r) =>
    Array.from({ length: size.cols }, (_, c) => ({
      isBlack: true,
      number: null,
      answer: null,
      clues: { across: null, down: null },
      row: r,
      col: c,
    }))
  );

  const allClues = [...clues.across, ...clues.down];

  for (const clue of allClues) {
    let { row, col } = clue;
    for (let i = 0; i < clue.answer.length; i++) {
      // Bounds check to prevent crashing on bad data
      if (row >= size.rows || col >= size.cols) {
        console.error("Clue is out of bounds:", clue);
        break; 
      }

      if (grid[row][col].isBlack) {
        grid[row][col].isBlack = false;
        grid[row][col].answer = clue.answer[i];
      }

      if (i === 0) {
        grid[row][col].number = grid[row][col].number || clue.number;
      }

      if (clue.direction === "across") {
        grid[row][col].clues.across = clue.number;
        col++;
      } else {
        grid[row][col].clues.down = clue.number;
        row++;
      }
    }
  }

  return grid;
};