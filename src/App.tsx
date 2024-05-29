import "@/App.css";
import { ThemeProvider } from "./components/theme-provider";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage/Home-page";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import { useSessionContext } from "./contexts/SessionContext/Session-Context";
import { FullScreen } from "react-full-screen";
import Pomodoro from "./components/Pomodoro";
import { Flower, Sprout } from "lucide-react";
import StatusPage from "./pages/StatusPage/Status-Page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/status" element={<StatusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  const { isFullScreen, handle, reportChange } = useSessionContext();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FullScreen
        handle={handle}
        onChange={reportChange}
        className="w-screen max-w-7xl flex flex-col justify-between h-full"
      >
        <div className="flex flex-col h-screen justify-between">
          <header className="justify-end sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center p-2">
            {!isFullScreen ? (
              <div className="flex space-x-3">
                <a href="/" className="hidden">
                  <Button
                    disabled
                    className="text-base font-bold size-10"
                    variant="outline"
                  >
                    <Flower className="absolute size-5 dark:rotate-0 dark:scale-100 " />
                    <span className="sr-only">Status page</span>
                  </Button>
                </a>
                <a href="/" className="hidden">
                  <Button
                    disabled
                    className="text-base font-bold size-10"
                    variant="outline"
                  >
                    <Sprout className="absolute size-5 dark:rotate-0 dark:scale-100 " />
                    <span className="sr-only">Pomodoro Page</span>
                  </Button>
                </a>
                <ModeToggle />
              </div>
            ) : null}
          </header>
          <Outlet />
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
        </div>
      </FullScreen>
    </ThemeProvider>
  );
}

export default App;
