import { PomodoroClock } from "./Clock";
import { Button } from "./ui/button";
import {
  Maximize2,
  Minimize2,
  PauseIcon,
  PlayIcon,
  Settings,
  Undo2Icon,
} from "lucide-react";

import { Card, CardContent } from "../components/ui/card.js";

import { StartPomodoro, StopPomodoro } from "@/script.js";
import { Separator } from "./ui/separator";
import { useSessionContext } from "@/contexts/SessionContext/Session-Context";
import Rest from "./Rest/Rest.js";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "./ui/dialog.js";
import { Label } from "./ui/label.js";
import { Input } from "./ui/input.js";
import { useState } from "react";

function Pomodoro() {
  const { isFullScreen, setIsRunning, setisFullscreen, isRunning, handle } =
    useSessionContext();

  const [studyTime, setStudyTime] = useState(0);
  const [restTime, setRestTime] = useState(0);

  return (
    <main className="h-full w-full py-2 px-4 flex justify-center items-center">
      <Card className="container rounded-lg border border-spacing-0  flex justify-between flex-col h-full">
        <CardContent
          id="parent"
          className="flex h-full py-6 justify-center items-center relative top-4"
        >
          <aside className="flex flex-col absolute right-0 top-0 space-y-4 items-center z-50">
            <button
              className="size-5"
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
              {!isFullScreen ? (
                <Maximize2 className="size-5" />
              ) : (
                <Minimize2 className="size-5" />
              )}
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Settings className="size-5 hover:cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Defina seus horarios</DialogTitle>
                  <DialogDescription>
                    Defina o tempo de estudo e descanso para o metódo Pomodoro.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="study" className="text-right font-bold">
                      Estudo
                    </Label>
                    <Input
                      id="study-hour"
                      defaultValue="25"
                      type="number"
                      className="col-span-1"
                      min="0"
                    />
                    <Input
                      id="study-minute"
                      defaultValue="0"
                      type="number"
                      className="col-span-1"
                      min="0"
                    />
                    <span className="text-sm">Horas/minutos</span>
                    <span>{restTime}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rest" className="text-right font-bold">
                      Descanso
                    </Label>
                    <Input
                      id="rest-hour"
                      defaultValue="0"
                      type="number"
                      className="col-span-1"
                      min="0"
                    />
                    <Input
                      id="rest-minute"
                      defaultValue="5"
                      type="number"
                      className="col-span-1"
                      min="0"
                    />
                    <span className="text-sm">Horas/minutos</span>
                  </div>
                </div>
                <DialogClose>
                  <Button
                    type="submit"
                    className="font-bold"
                    onClick={() => {
                      const studyHourInput = document.getElementById(
                        "study-hour"
                      ) as HTMLInputElement;
                      const studyMinuteInput = document.getElementById(
                        "study-minute"
                      ) as HTMLInputElement;
                      const restHourInput = document.getElementById(
                        "rest-hour"
                      ) as HTMLInputElement;
                      const restMinuteInput = document.getElementById(
                        "rest-minute"
                      ) as HTMLInputElement;

                      setStudyTime(
                        parseInt(studyHourInput.value) * 60 * 60 +
                          parseInt(studyMinuteInput.value) * 60
                      );
                      setRestTime(
                        parseInt(restHourInput.value) * 60 * 60 +
                          parseInt(restMinuteInput.value) * 60
                      );
                    }}
                  >
                    Salvar mudanças
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            {!isRunning ? (
              <Button
                className="bg-green-600 dark:bg-green-400 hover:cursor-pointer text-black"
                onClick={() => {
                  StartPomodoro(studyTime);
                  setIsRunning(true);
                }}
              >
                <PlayIcon className="size-5" />
              </Button>
            ) : (
              <Button
                className="bg-green-400 dark:bg-green-400 hover:cursor-pointer text-black"
                onClick={() => {
                  StopPomodoro();
                  setIsRunning(false);
                }}
              >
                <PauseIcon className="size-5" />
              </Button>
            )}
            <Button
              className="bg-gray-600 dark:bg-gray-400 hover:cursor-pointer flex items-center justify-center text-black"
              onClick={() => {
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
