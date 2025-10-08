import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Puzzle } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="container relative h-[calc(100vh-10rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Puzzle className="mr-2 h-8 w-8" />
            Crossword Cove
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;The biggest risk is not taking any risk. In a world
                that's changing really quickly, the only strategy that is
                guaranteed to fail is not taking risks.&rdquo;
              </p>
              <footer className="text-sm">Mark Zuckerberg</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to Crossword Cove
              </h1>
              <p className="text-sm text-muted-foreground">
                Your daily dose of wordy fun.
              </p>
            </div>
            <p className="text-center text-muted-foreground">
              Ready to challenge your mind? Click the button below to start a
              new puzzle. It's a great way to learn, relax, and have fun.
            </p>
            <Link to="/puzzle" className="w-full">
              <Button className="w-full">Start New Puzzle</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;