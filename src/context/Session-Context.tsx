import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFullScreenHandle } from "react-full-screen";

export type SessionContext = {
  isRunning: boolean;
  isFullScreen: boolean;
  setIsRunning: (value: boolean) => void;
  setisFullscreen: (value: boolean) => void;
  reportChange: (state: any) => void;
  handle: any;
};

const SessionContext = createContext<SessionContext | null>(null);

export const SessionProvider = ({ children }: any) => {
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
    <SessionContext.Provider
      value={{
        isRunning,
        isFullScreen,
        setIsRunning,
        setisFullscreen,
        reportChange,
        handle,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export function useSessionContext() {
  const contexto = useContext(SessionContext);
  if (!contexto) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return contexto;
}

export { SessionContext };
