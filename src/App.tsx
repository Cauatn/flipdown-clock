import "@/App.css";
import Root from "./components/root";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import "../src/css/flipdown/flipdown.css";
import "../src/js/flipdown/flipdown.js";
import { Button } from "./components/ui/button";

function App() {
  function setTimer() {
    let input = document.querySelector("#input");

    let x = 100;

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
      <ModeToggle />
      <div id="flipdown" className="flipdown"></div>

      <Button onClick={() => setTimer()}>oi</Button>
    </ThemeProvider>
  );
}

export default App;
