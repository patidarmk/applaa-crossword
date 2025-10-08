import React, { useRef, useEffect } from "react";
import { type GridData } from "@/lib/crosswordUtils";
import { cn } from "@/lib/utils";

interface CrosswordGridProps {
  gridData: GridData;
  userGrid: string[][];
  activeCell: { row: number; col: number };
  activeClueNumbers: { across: number | null; down: number | null };
  direction: "across" | "down";
  onCellClick: (row: number, col: number) => void;
  onInputChange: (row: number, col: number, value: string) => void;
}

export function CrosswordGrid({
  gridData,
  userGrid,
  activeCell,
  activeClueNumbers,
  direction,
  onCellClick,
  onInputChange,
}: CrosswordGridProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    if (
      activeCell.row !== -1 &&
      inputRefs.current[activeCell.row]?.[activeCell.col]
    ) {
      inputRefs.current[activeCell.row][activeCell.col]?.focus();
    }
  }, [activeCell]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const { key } = e;
    let nextRow = row;
    let nextCol = col;
    let moved = false;

    const move = (dr: number, dc: number) => {
      let r = row + dr;
      let c = col + dc;
      while (
        r >= 0 &&
        r < gridData.length &&
        c >= 0 &&
        c < gridData[0].length
      ) {
        if (!gridData[r][c].isBlack) {
          nextRow = r;
          nextCol = c;
          moved = true;
          return;
        }
        r += dr;
        c += dc;
      }
    };

    if (key === "ArrowUp") {
      e.preventDefault();
      move(-1, 0);
    } else if (key === "ArrowDown") {
      e.preventDefault();
      move(1, 0);
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      move(0, -1);
    } else if (key === "ArrowRight") {
      e.preventDefault();
      move(0, 1);
    } else if (key === "Backspace") {
      if (userGrid[row][col] === "") {
        e.preventDefault();
        if (direction === "across") move(0, -1);
        else move(-1, 0);
      }
    } else if (key.length === 1 && key.match(/[a-z]/i)) {
      // Auto-advance after typing a letter
      setTimeout(() => {
        if (direction === "across") move(0, 1);
        else move(1, 0);
      }, 0);
    }

    if (moved) {
      onCellClick(nextRow, nextCol);
    }
  };

  return (
    <div
      className="bg-stone-800 p-2 md:p-4 rounded-lg shadow-lg aspect-square"
      style={{
        gridTemplateColumns: `repeat(${gridData[0].length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridData.length}, minmax(0, 1fr))`,
        display: "grid",
        gap: "2px",
      }}
    >
      {gridData.map((row, r) =>
        row.map((cell, c) => {
          if (cell.isBlack) {
            return <div key={`${r}-${c}`} className="bg-stone-800" />;
          }

          const isActive = activeCell.row === r && activeCell.col === c;
          const isHighlighted =
            (direction === "across" &&
              cell.clues.across === activeClueNumbers.across &&
              activeClueNumbers.across !== null) ||
            (direction === "down" &&
              cell.clues.down === activeClueNumbers.down &&
              activeClueNumbers.down !== null);

          return (
            <div
              key={`${r}-${c}`}
              className={cn(
                "relative flex items-center justify-center bg-background rounded-[2px]",
                isHighlighted && "bg-blue-200 dark:bg-blue-800",
                isActive && "bg-yellow-300 dark:bg-yellow-500"
              )}
              onClick={() => onCellClick(r, c)}
            >
              {cell.number && (
                <span className="absolute top-0 left-0.5 text-[8px] md:text-[10px] font-semibold text-muted-foreground">
                  {cell.number}
                </span>
              )}
              <input
                ref={(el) => {
                  if (!inputRefs.current[r]) inputRefs.current[r] = [];
                  inputRefs.current[r][c] = el;
                }}
                type="text"
                maxLength={1}
                value={userGrid[r][c] || ""}
                onChange={(e) => onInputChange(r, c, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, r, c)}
                className="w-full h-full bg-transparent text-center text-sm md:text-xl font-bold uppercase focus:outline-none"
              />
            </div>
          );
        })
      )}
    </div>
  );
}