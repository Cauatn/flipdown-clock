import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card.js";
import Clock from "../../components/Clock.js";
import { Button } from "../../components/ui/button.js";
import {
  Maximize2,
  Minimize2,
  PauseIcon,
  PlayIcon,
  Undo2Icon,
} from "lucide-react";
import { useSessionContext } from "@/contexts/SessionContext/Session-Context.js";
import { createWorkerFactory, useWorker } from "@shopify/react-web-worker";

import worker_script from "../../js/worker-script.js";
import { useEffect } from "react";
import SessionsList from "@/components/SessionsList.js";
import { newTimeInList } from "@/hooks/new-time.ts";

("./worker-script.js");

const timerWorker = new Worker(worker_script);
const createWorker = createWorkerFactory(() => import("../../js/worker.js"));

function Homepage() {
  const { isFullScreen, setisFullscreen, isRunning, handle } =
    useSessionContext();

  const worker = useWorker(createWorker);

  useEffect(() => {
    const last_time = localStorage.getItem("last_time");

    if (last_time) {
      worker.Start(last_time);
    }

    timerWorker.onmessage = ({ data: { time } }) => {
      if (time) {
        worker.Start(time);
        localStorage.setItem("last_time", time);
      }
    };
  }, []);

  return (
    <main className="space-y-4 h-full py-2 px-4">
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
          {!isRunning ? <InitButton /> : <PauseButton />}
          <ResetButton />
        </CardFooter>
      </Card>
    </main>
  );
}

function InitButton() {
  const { setIsRunning } = useSessionContext();

  const startWebWorkerTimer = () => {
    timerWorker.postMessage({
      turn: "on",
      last_time: localStorage.getItem("last_time"),
    });
  };

  return (
    <Button
      className="bg-green-600 dark:bg-green-400 hover:cursor-pointer [&>svg]:mr-2 text-black"
      onClick={() => {
        startWebWorkerTimer();
        setIsRunning(true);
      }}
    >
      <PlayIcon />
      <p className="text-bold">Iniciar</p>
    </Button>
  );
}

function PauseButton() {
  const { setIsRunning } = useSessionContext();

  const stopWebWorkerTime = () => {
    timerWorker.postMessage({ turn: "pause" });
  };

  return (
    <Button
      className="bg-green-400 dark:bg-green-400 hover:cursor-pointer [&>svg]:mr-2 text-black"
      onClick={() => {
        stopWebWorkerTime();
        setIsRunning(false);
      }}
    >
      <PauseIcon />
      <p className="text-bold">Pausar</p>
    </Button>
  );
}

function ResetButton() {
  const { setIsRunning } = useSessionContext();

  const worker = useWorker(createWorker);

  const resetWebWorkerTimer = async () => {
    timerWorker.postMessage({ turn: "off" });
    worker.Stop();

    const get_time = await worker.GetTime();

    newTimeInList(get_time);
  };

  return (
    <Button
      className="bg-gray-600 dark:bg-gray-400 hover:cursor-pointer flex items-center justify-center [&>svg]:mr-2 text-black"
      onClick={() => {
        resetWebWorkerTimer();
        setIsRunning(false);
      }}
    >
      <Undo2Icon />
      <p className="text-bold">Redefinir</p>
    </Button>
  );
}

export default Homepage;
