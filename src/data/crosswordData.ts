export type Clue = {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
  direction: "across" | "down";
};

export type CrosswordData = {
  id: string;
  title: string;
  theme: string;
  size: { rows: number; cols: number };
  clues: {
    across: Clue[];
    down: Clue[];
  };
};

export const samplePuzzle: CrosswordData = {
  id: "puzzle1",
  title: "Web Dev Wonders",
  theme: "A puzzle for modern web developers",
  size: { rows: 11, cols: 11 },
  clues: {
    across: [
      { number: 1, clue: "A popular JavaScript library for UI", answer: "REACT", row: 0, col: 1, direction: "across" },
      { number: 5, clue: "HyperText Markup Language (abbr.)", answer: "HTML", row: 2, col: 0, direction: "across" },
      { number: 6, clue: "Styling language for web pages", answer: "CSS", row: 2, col: 5, direction: "across" },
      { number: 7, clue: "A function that returns a promise", answer: "ASYNC", row: 4, col: 2, direction: "across" },
      { number: 9, clue: "To combine multiple files into one", answer: "BUNDLE", row: 6, col: 4, direction: "across" },
      { number: 11, clue: "A place to store code versions", answer: "REPO", row: 8, col: 0, direction: "across" },
      { number: 12, clue: "Not a bug, but a ___", answer: "FEATURE", row: 10, col: 3, direction: "across" },
    ],
    down: [
      { number: 1, clue: "Reusable piece of UI", answer: "COMPONENT", row: 0, col: 1, direction: "down" },
      { number: 2, clue: "Application Programming Interface (abbr.)", answer: "API", row: 0, col: 3, direction: "down" },
      { number: 3, clue: "To find and fix errors in code", answer: "DEBUG", row: 0, col: 5, direction: "down" },
      { number: 4, clue: "A way to manage application state", answer: "STORE", row: 0, col: 7, direction: "down" },
      { number: 8, clue: "A popular version control system", answer: "GIT", row: 5, col: 8, direction: "down" },
      { number: 10, clue: "A small piece of data sent from a website", answer: "COOKIE", row: 6, col: 4, direction: "down" },
    ],
  },
};