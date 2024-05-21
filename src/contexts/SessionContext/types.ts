export type ISessionContext = {
  isRunning: boolean;
  isFullScreen: boolean;
  setIsRunning: (value: boolean) => void;
  setisFullscreen: (value: boolean) => void;
  reportChange: (state: any) => void;
  handle: any;
};
