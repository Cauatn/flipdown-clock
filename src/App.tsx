import "@/App.css";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card.js";
import Clock from "./components/Clock.js";
import { Button } from "./components/ui/button.js";
import {
  Maximize2,
  Minimize2,
  PauseIcon,
  PlayIcon,
  Undo2Icon,
} from "lucide-react";
import { Start, Stop, Reset } from "./script.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setisFullscreen] = useState(false);

  const handle = useFullScreenHandle();

  const reportChange = useCallback((state: any) => {
    console.log(state);
    if (state === true) {
      setisFullscreen(true);
    } else if (state === false) {
      setisFullscreen(false);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FullScreen
        handle={handle}
        onChange={reportChange}
        className="h-screen w-screen max-w-7xl flex flex-col justify-between"
      >
        <header className="justify-end sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center p-2">
          {!isFullScreen ? <ModeToggle /> : null}
        </header>
        <main className="space-y-4 h-full py-2 px-4 ">
          <Card className="container rounded-lg border border-spacing-0 h-full flex justify-between flex-col">
            <CardHeader className="flex justify-center items-end">
              <button
                onClick={(e) => {
                  if (!isFullScreen) {
                    handle.enter();
                    setisFullscreen(true);
                  } else {
                    handle.exit();
                    setisFullscreen(false);
                  }
                }}
              >
                {!isFullScreen ? <Maximize2 /> : <Minimize2 />}
              </button>
            </CardHeader>
            <CardContent
              id="parent"
              className="p-8 flex justify-center items-center space-x-2 h-full"
            >
              <Clock />
            </CardContent>
            <CardFooter className="space-x-2 flex justify-end h-fit px-0">
              {!isRunning ? (
                <Button
                  className="bg-green-600 dark:bg-green-400 hover:cursor-pointer [&>svg]:mr-2 text-black"
                  onClick={() => {
                    Start();
                    setIsRunning(true);
                  }}
                >
                  <PlayIcon />
                  <p className="text-bold">Iniciar</p>
                </Button>
              ) : (
                <Button
                  className="bg-green-400 dark:bg-green-400 hover:cursor-pointer [&>svg]:mr-2 text-black"
                  onClick={() => {
                    Stop();
                    setIsRunning(false);
                  }}
                >
                  <PauseIcon />
                  <p className="text-bold">Pausar</p>
                </Button>
              )}
              <Button
                className="bg-gray-600 dark:bg-gray-400 hover:cursor-pointer flex items-center justify-center [&>svg]:mr-2 text-black"
                onClick={() => {
                  Reset();
                  setIsRunning(false);
                }}
              >
                <Undo2Icon />
                <p className="text-bold">Redefinir</p>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <footer className="flex px-12 justify-end pb-2">
          {!isFullScreen ? (
            <p className="text-lg">
              Made with ❤️ by{" "}
              <a
                href="https://github.com/Cauatn"
                className="hover:cursor-pointer text-bold underline underline-offset-4"
              >
                Cauã Tavares
              </a>
            </p>
          ) : null}
        </footer>
      </FullScreen>
    </ThemeProvider>
  );
}

export default App;
