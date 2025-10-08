import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Clue } from "../data/crosswordData";
import { cn } from "@/lib/utils";

interface CluesProps {
  clues: Clue[];
  title: string;
  activeClueNumber: number | null;
  onClueClick: (clue: Clue) => void;
}

export function Clues({
  clues,
  title,
  activeClueNumber,
  onClueClick,
}: CluesProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
          <ul className="space-y-2">
            {clues.map((clue) => (
              <li
                key={clue.number}
                onClick={() => onClueClick(clue)}
                className={cn(
                  "cursor-pointer p-2 rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  activeClueNumber === clue.number
                    ? "bg-primary text-primary-foreground"
                    : ""
                )}
              >
                <span className="font-bold mr-2">{clue.number}.</span>
                {clue.clue}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}