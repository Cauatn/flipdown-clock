import { PomodoroClock } from "./Clock";
import { Button } from "./ui/button";
import {
  Maximize2,
  Minimize2,
  PauseIcon,
  PlayIcon,
  Undo2Icon,
} from "lucide-react";

import { Card, CardContent } from "../components/ui/card.js";

import { Reset, StartPomodoro, Stop } from "@/script.js";
import { Separator } from "./ui/separator";
import { useSessionContext } from "@/contexts/SessionContext/Session-Context";
import Rest from "./Rest/Rest.js";

function Pomodoro() {
  const { isFullScreen, setIsRunning, setisFullscreen, isRunning, handle } =
    useSessionContext();

  return (
    <main className="h-full w-full py-2 px-4 flex justify-center items-center">
      <Card className="container rounded-lg border border-spacing-0  flex justify-between flex-col h-full">
        <CardContent
          id="parent"
          className="flex h-full py-6 justify-center items-center relative top-4"
        >
          <aside className="flex flex-col absolute right-0 top-0 space-y-2 items-center z-50">
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
            {!isRunning ? (
              <Button
                className="bg-green-600 dark:bg-green-400 hover:cursor-pointer text-black"
                onClick={() => {
                  StartPomodoro(2);
                  setIsRunning(true);
                }}
              >
                <PlayIcon className="size-5" />
              </Button>
            ) : (
              <Button
                className="bg-green-400 dark:bg-green-400 hover:cursor-pointer text-black"
                onClick={() => {
                  Stop();
                  setIsRunning(false);
                }}
              >
                <PauseIcon className="size-5" />
              </Button>
            )}
            <Button
              className="bg-gray-600 dark:bg-gray-400 hover:cursor-pointer flex items-center justify-center text-black"
              onClick={() => {
                Reset();
                setIsRunning(false);
              }}
            >
              <Undo2Icon className="size-5" />
            </Button>
          </aside>
          <div className="flex space-x-4 h-full w-full justify-center items-center ">
            <section className="w-1/2 h-fit">
              <PomodoroClock />
            </section>
            <Separator orientation="vertical" />
            <section className="w-1/2 h-fit">
              <Rest />
            </section>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Pomodoro;
