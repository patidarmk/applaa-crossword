"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { CrosswordGrid } from "@/components/CrosswordGrid";
import { Clues } from "@/components/Clues";
import { samplePuzzle, type Clue } from "../data/crosswordData";
import { generateGridData } from "../lib/crosswordUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PuzzlePage = () => {
  const [gridData] = useState(() => generateGridData(samplePuzzle));
  const [userGrid, setUserGrid] = useState(() =>
    Array(samplePuzzle.size.rows)
      .fill(null)
      .map(() => Array(samplePuzzle.size.cols).fill(""))
  );
  const [activeCell, setActiveCell] = useState({ row: -1, col: -1 });
  const [direction, setDirection] = useState<"across" | "down">("across");

  const [activeClueNumbers, setActiveClueNumbers] = useState<{
    across: number | null;
    down: number | null;
  }>({ across: null, down: null });

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (gridData[row][col].isBlack) return;

      if (activeCell.row === row && activeCell.col === col) {
        setDirection((prev) => (prev === "across" ? "down" : "across"));
      } else {
        setActiveCell({ row, col });
        const cellClues = gridData[row][col].clues;
        if (direction === "across" && !cellClues.across) {
          setDirection("down");
        } else if (direction === "down" && !cellClues.down) {
          setDirection("across");
        }
      }
    },
    [activeCell, direction, gridData]
  );

  useEffect(() => {
    if (activeCell.row !== -1) {
      const { clues } = gridData[activeCell.row][activeCell.col];
      setActiveClueNumbers(clues);
    } else {
      setActiveClueNumbers({ across: null, down: null });
    }
  }, [activeCell, gridData]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const newUserGrid = userGrid.map((r) => [...r]);
    newUserGrid[row][col] = value.toUpperCase();
    setUserGrid(newUserGrid);
  };

  const handleClueClick = (clue: Clue) => {
    setActiveCell({ row: clue.row, col: clue.col });
    setDirection(clue.direction);
  };

  const checkAnswers = () => {
    let correct = true;
    for (let r = 0; r < gridData.length; r++) {
      for (let c = 0; c < gridData[r].length; c++) {
        if (!gridData[r][c].isBlack) {
          if (userGrid[r][c] !== gridData[r][c].answer) {
            correct = false;
            break;
          }
        }
      }
      if (!correct) break;
    }
    alert(correct ? "Congratulations! You solved it!" : "Not quite right. Keep trying!");
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-2xl">{samplePuzzle.title}</CardTitle>
            <p className="text-muted-foreground">{samplePuzzle.theme}</p>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CrosswordGrid
              gridData={gridData}
              userGrid={userGrid}
              activeCell={activeCell}
              activeClueNumbers={activeClueNumbers}
              direction={direction}
              onCellClick={handleCellClick}
              onInputChange={handleInputChange}
            />
             <div className="mt-4 flex justify-end">
                <Button onClick={checkAnswers}>Check Puzzle</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <Clues
              title="Across"
              clues={samplePuzzle.clues.across}
              activeClueNumber={
                direction === "across" ? activeClueNumbers.across : null
              }
              onClueClick={handleClueClick}
            />
            <Clues
              title="Down"
              clues={samplePuzzle.clues.down}
              activeClueNumber={
                direction === "down" ? activeClueNumbers.down : null
              }
              onClueClick={handleClueClick}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PuzzlePage;