import { ChartBarStacked, Home } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export function Header({ isFullScreen }: { isFullScreen: boolean }) {
  return (
    <header className="justify-end sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center p-2">
      {!isFullScreen ? (
        <div className="flex space-x-3 mx-2 w-full">
          <a href="/">
            <Button
              className="text-base font-bold size-10 border"
              variant="ghost"
            >
              <Home className="absolute size-5 dark:rotate-0 dark:scale-100 " />
              <span className="sr-only">Home page</span>
            </Button>
          </a>
          <div className="flex space-x-3 mx-2 w-full items-center justify-end">
            <a href="/dashboard">
              <Button
                className="text-base font-bold size-10 border"
                variant="ghost"
              >
                <ChartBarStacked className="absolute size-5 dark:rotate-0 dark:scale-100 " />
                <span className="sr-only">Dashboard Page</span>
              </Button>
            </a>
            <ModeToggle />
          </div>
        </div>
      ) : null}
    </header>
  );
}
