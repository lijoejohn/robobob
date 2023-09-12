import { useEffect, useState, useRef } from "react";
import SimpleBar from "simplebar-react";
import { TextArea, IconButton, ChatBlock } from "../components";
import { useQuestionsState } from "../global-state/QuestionsContext";
import { useThreadsState } from "../global-state/ThreadsContext";
import { AnswerResponseType } from "../annotations";
import "simplebar-react/dist/simplebar.min.css";
import {
  isMathExpression,
  resetRecentQuestions,
  mathsQuestionThread,
  mathsAnswerThread,
  questionThread,
  unknownAnswerThread,
  answerThread,
} from "../helpers";
import UseFetch from "../hooks/useFetch";
import { scrollStyle } from "../config";

const ChatPage = ({ recentQuestion }: { recentQuestion: string }) => {
  const ref = useRef<HTMLElement>();
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [question, setQuestion] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { questionsState, setQuestionsState } = useQuestionsState();
  const { threadsState, setThreadsState } = useThreadsState();

  useEffect(() => {
    ref?.current?.scrollTo({ top: inputBoxRef.current?.offsetTop });
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    ref?.current?.scrollTo({
      top: inputBoxRef.current?.offsetTop! + 500,
    });
  }, [threadsState]);

  useEffect(() => {
    setQuestion(recentQuestion);
  }, [recentQuestion]);

  const typeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setQuestion(newValue);
  };

  const submitHandler = () => {
    const recentQuestions = resetRecentQuestions(questionsState, question);

    setQuestionsState(recentQuestions);
    if (isMathExpression(question)) {
      const questionThread = mathsQuestionThread(question);
      const answerThread = mathsAnswerThread(question);
      setThreadsState([...threadsState, questionThread, answerThread]);
      setQuestion("");
    } else {
      setLoading(true);
      setActiveQuestion(question);
    }
  };

  return (
    <div className="absolute mt-5 bottom-0 w-[calc(100%-5rem)] sm:w-[calc(100%-20rem)] md:w-[calc(100%-20rem)]">
      <SimpleBar
        id="scroll"
        scrollableNodeProps={{ ref: ref }}
        style={scrollStyle}
      >
        <ChatBlock threadsState={threadsState} />

        <div className="flex items-center p-5 mb-6" ref={inputBoxRef}>
          <TextArea
            ref={inputRef}
            value={question}
            placeholder="Type a thread"
            id="first_name"
            onChange={typeHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey == false) {
                e.preventDefault();
                submitHandler();
              }
            }}
            disabled={loading}
          />
          <IconButton
            icon="sendMessage"
            aria-label="Send Message"
            onClick={submitHandler}
            disabled={question === "" || loading}
          />
        </div>
      </SimpleBar>
      {loading ? (
        <UseFetch
          callBack={(thread: AnswerResponseType | undefined) => {
            setLoading(false);
            setQuestion("");
            const questionSet = questionThread(question);
            if (!thread) {
              const answerThread = unknownAnswerThread();
              setThreadsState([...threadsState, questionSet, answerThread]);
            } else {
              const answerSet = answerThread(thread.answer);
              setThreadsState([...threadsState, questionSet, answerSet]);
            }
          }}
          thread={activeQuestion}
        />
      ) : null}
    </div>
  );
};
export default ChatPage;
