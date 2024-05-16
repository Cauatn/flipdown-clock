import "@/App.css";
import Root from "./components/root";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import "../src/css/flipdown/flipdown.css";
import "../src/js/flipdown/flipdown.js";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./components/ui/dropdown-menu.js";
import { Card, CardContent } from "./components/ui/card.js";
import { useEffect, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    console.log("hours: ", hours);
    console.log("minutes: ", minutes);
    console.log("segundos: ", seconds);
  }, [seconds, minutes, hours]);

  function setTimer(hours: number, minutes: number, seconds: number) {
    let input = document.querySelector("#input");

    //converta as unidades recebidas para segundos
    let x = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    console.log(x);

    // Unix timestamp (in seconds) to count down to
    var twoDaysFromNow = new Date().getTime() / 1000 + x;

    var flipdown = new FlipDown(twoDaysFromNow)

      // Start the countdown
      .start()

      // Do something when the countdown ends
      .ifEnded(() => {
        console.log("The countdown has ended!");
      });

    // Show version number
    var ver = document.getElementById("ver");
    if (ver) {
      ver.innerHTML = flipdown.version;
    }
  }
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen w-screen flex flex-col">
        <header className="h-fit w-screen flex justify-end p-4">
          <ModeToggle />
        </header>
        <main>
          <div>
            <h1 className="text-4xl text-bold">Temporizador Online</h1>
            <span>
              temporizador de contagem regressiva simples e conveniente online e
              de graça
            </span>
          </div>
          <div className="w-screen flex justify-center items-center">
            <Card className="border-none border-0">
              <CardContent className="bg-white dark:bg-gray-800 rounded-lg p-8 flex justify-center items-center max-w-fit border-spacing-0 border">
                <div id="flipdown" className="flipdown"></div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-row w-full h-fit">
            <div className="flex items-center justify-center">
              <Card className="bg-black hover:bg-gray-800 transition-colors">
                <CardContent className="flex items-center space-x-4 p-2">
                  <Input
                    value={hours}
                    onChange={(e) => {
                      if (Number(e.target.value) != hours) {
                        setHours(Number(e.target.value));
                      }
                    }}
                    className="text-white text-5xl font-bold max-w-20 h-fit bg-black border-none"
                  ></Input>

                  <div className="flex flex-col">
                    <Button
                      className="text-white text-3xl font-bold"
                      size="icon"
                      variant="ghost"
                      onClick={() => setHours(hours + 1)}
                    >
                      +
                    </Button>
                    <Button
                      className="text-white text-3xl font-bold"
                      size="icon"
                      variant="ghost"
                      onClick={() => setHours(hours - 1)}
                    >
                      -
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center justify-center">
              <Card className="bg-black hover:bg-gray-800 transition-colors">
                <CardContent className="flex items-center space-x-4 p-2">
                  <Input
                    value={minutes}
                    onChange={(e) => {
                      if (Number(e.target.value) != minutes) {
                        setMinutes(Number(e.target.value));
                      }
                    }}
                    className="text-white text-5xl font-bold max-w-20 h-fit bg-black border-none"
                  ></Input>
                  <div className="flex flex-col">
                    <Button
                      className="text-white text-3xl font-bold"
                      size="icon"
                      variant="ghost"
                      onClick={() => setMinutes(minutes + 1)}
                    >
                      +
                    </Button>
                    <Button
                      className="text-white text-3xl font-bold"
                      size="icon"
                      variant="ghost"
                      onClick={() => setMinutes(minutes - 1)}
                    >
                      -
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center justify-center">
              <Card className="bg-black hover:bg-gray-800 transition-colors">
                <CardContent className="flex items-center space-x-4 justify-center p-2">
                  <Input
                    value={seconds}
                    onChange={(e) => {
                      if (Number(e.target.value) != seconds) {
                        setSeconds(Number(e.target.value));
                      }
                    }}
                    className="text-white text-5xl font-bold max-w-20 h-fit bg-black border-none"
                  ></Input>
                  <div className="flex flex-col">
                    <Button
                      className="text-white text-3xl font-bold"
                      size="icon"
                      variant="ghost"
                      onClick={() => setSeconds(seconds + 1)}
                    >
                      +
                    </Button>
                    <Button
                      className="text-white text-3xl font-bold"
                      size="icon"
                      variant="ghost"
                      onClick={() => setSeconds(seconds - 1)}
                    >
                      -
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Input
            className="w-20 text-center"
            id="minutes"
            max="59"
            min="0"
            placeholder="00"
            type="number"
          />
        </main>
        <Button
          onClick={() => setTimer(hours, minutes, seconds)}
          className="max-w-16"
        >
          oi
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
