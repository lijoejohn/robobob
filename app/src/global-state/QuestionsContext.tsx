import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useSessionStorage } from "usehooks-ts";
import { Question } from "../annotations";

type QuestionsStateType = Question[];

const QuestionsStateContext = createContext({
  questionsState: [] as QuestionsStateType,
  setQuestionsState: {} as Dispatch<SetStateAction<QuestionsStateType>>,
});

const QuestionsProvider = ({
  children,
  value = [] as QuestionsStateType,
}: {
  children: React.ReactNode;
  value?: QuestionsStateType;
}) => {
  const [questionsState, setQuestionsState] = useSessionStorage(
    "QuestionsProvider",
    value
  );
  return (
    <QuestionsStateContext.Provider
      value={{ questionsState, setQuestionsState }}
    >
      {children}
    </QuestionsStateContext.Provider>
  );
};

const useQuestionsState = () => {
  const context = useContext(QuestionsStateContext);
  return context;
};

export { QuestionsProvider, useQuestionsState };
