import { createContext, useCallback, useContext, useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import { ISessionContext } from "@/contexts/SessionContext/types";

const SessionContext = createContext<ISessionContext | null>(null);

export const SessionProvider = ({ children }: any) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setisFullscreen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handle = useFullScreenHandle();

  const reportChange = useCallback((state: any) => {
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
        isModalOpen,
        setIsModalOpen,
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
