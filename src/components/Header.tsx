import { Link } from "@tanstack/react-router";
import { Puzzle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Puzzle className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Crossword Cove
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/puzzle"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            New Puzzle
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}