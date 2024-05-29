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
import { Drawer, DrawerContent } from "@/components/ui/drawer.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";
("./worker-script.js");

const timerWorker = new Worker(worker_script);
const createWorker = createWorkerFactory(() => import("../../js/worker.js"));

function Homepage() {
  const {
    isFullScreen,
    setIsRunning,
    setisFullscreen,
    isRunning,
    handle,
    isModalOpen,
    setIsModalOpen,
  } = useSessionContext();

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

  const startWebWorkerTimer = () => {
    timerWorker.postMessage({
      turn: "on",
      last_time: localStorage.getItem("last_time"),
    });
  };

  const stopWebWorkerTime = () => {
    timerWorker.postMessage({ turn: "pause" });
  };

  const resetWebWorkerTimer = async () => {
    timerWorker.postMessage({ turn: "off" });
    worker.Stop();

    const get_time = await worker.GetTime();

    const new_element = {
      date: new Date().toDateString(),
      time: get_time,
    };

    if (localStorage.getItem("time_list") === null) {
      localStorage.setItem("time_list", JSON.stringify([new_element]));
    } else {
      const new_list = JSON.parse(localStorage.getItem("time_list") ?? "");
      localStorage.setItem(
        "time_list",
        JSON.stringify([...new_list, new_element])
      );
    }

    localStorage.setItem("last_time", "0");
  };

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
          {!isRunning ? (
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
          ) : (
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
          )}
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
          <Drawer open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DrawerContent className="max-w-80 h-full p-4 space-y-4">
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Horas feitas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {JSON.parse(localStorage.getItem("time_list") ?? "[]").map(
                    (element: any, index: number) => (
                      <TableRow
                        key={index}
                        onClick={(_e) => {
                          const list = localStorage.getItem("time_list");

                          if (list) {
                            const new_list = JSON.parse(list);
                            new_list.splice(index, 1);
                            localStorage.setItem(
                              "time_list",
                              JSON.stringify(new_list)
                            );
                          }
                        }}
                      >
                        <TableCell>{element.date}</TableCell>
                        <TableCell>
                          {Math.floor(element.time / 3600)} h
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Homepage;
