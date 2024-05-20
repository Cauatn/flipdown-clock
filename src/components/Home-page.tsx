import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card.js";
import Clock from "../components/Clock.js";
import { Button } from "../components/ui/button.js";
import {
  Maximize2,
  Minimize2,
  PauseIcon,
  PlayIcon,
  Undo2Icon,
} from "lucide-react";
import { Start, Stop, Reset } from "../script.js";
import { useCallback, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { ModeToggle } from "../components/mode-toggle";
import {
  SessionContext,
  useSessionContext,
} from "@/context/Session-Context.tsx";

function Homepage() {
  const { isFullScreen, setIsRunning, setisFullscreen, isRunning, handle } =
    useSessionContext();

  return (
    <main className="space-y-4 h-full py-2 px-4 ">
      <Card className="container rounded-lg border border-spacing-0 h-full flex justify-between flex-col">
        <CardHeader className="flex justify-center items-end">
          <button
            onClick={() => {
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
  );
}

export default Homepage;
