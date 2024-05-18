import "@/App.css";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Card, CardContent, CardFooter } from "./components/ui/card.js";
import Clock from "./components/Clock.js";
import { Button } from "./components/ui/button.js";
import { PauseIcon, PlayIcon, Undo2Icon } from "lucide-react";
import { Start, Stop, Reset } from "./script.js";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-screen max-w-7xl flex flex-col justify-between">
        <header className="justify-end sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center p-2">
          <ModeToggle />
        </header>
        <main className="space-y-4 h-full py-2 px-4">
          <Card className="container rounded-lg border border-spacing-0 h-full flex justify-between flex-col">
            <CardContent
              id="parent"
              className="p-8 flex justify-center items-center space-x-2 h-full"
            >
              <Clock />
            </CardContent>
            <CardFooter className="space-x-2 flex justify-end h-fit">
              <Button
                className="bg-green-400 dark:bg-green-400"
                onClick={() => Start()}
              >
                <PlayIcon />
                <p>Começar</p>
              </Button>
              <Button
                className="bg-yellow-400 dark:bg-yellow-400"
                onClick={() => Stop()}
              >
                <PauseIcon />
                <p>Pausar</p>
              </Button>
              <Button
                className="bg-gray-400 dark:bg-gray-400"
                onClick={() => Reset()}
              >
                <Undo2Icon />
                <p>Resetar</p>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <footer className="flex px-8 justify-end pb-2">
          <p className="text-lg">Made with ❤️ by Cauã Tavares</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
