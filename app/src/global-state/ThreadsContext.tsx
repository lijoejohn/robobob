import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useSessionStorage } from "usehooks-ts";
import { Thread } from "../annotations";

type ThreadsStateType = Thread[];

const ThreadsStateContext = createContext({
  threadsState: [] as ThreadsStateType,
  setThreadsState: {} as Dispatch<SetStateAction<ThreadsStateType>>,
});

const ThreadsProvider = ({
  children,
  value = [] as ThreadsStateType,
}: {
  children: React.ReactNode;
  value?: ThreadsStateType;
}) => {
  const [threadsState, setThreadsState] = useSessionStorage(
    "ThreadsProvider",
    value
  );
  return (
    <ThreadsStateContext.Provider value={{ threadsState, setThreadsState }}>
      {children}
    </ThreadsStateContext.Provider>
  );
};

const useThreadsState = () => {
  const context = useContext(ThreadsStateContext);
  if (!context) {
    throw new Error(
      "useThreadsState must be used within a ThreadsStateContext"
    );
  }
  return context;
};

export { ThreadsProvider, useThreadsState };
