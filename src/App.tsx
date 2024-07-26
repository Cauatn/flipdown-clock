import "@/App.css";
import { ThemeProvider } from "./components/theme-provider";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home-page";
import { useSessionContext } from "./contexts/SessionContext/Session-Context";
import { FullScreen } from "react-full-screen";
import Dashboard from "./pages/DashBoard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Header isFullScreen={isFullScreen} />
          <Outlet />
          <Footer isFullScreen={isFullScreen} />
        </div>
      </FullScreen>
    </ThemeProvider>
  );
}

export default App;
