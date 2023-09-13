import { useEffect, useState, useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

//context state
import { useQuestionsState } from "../global-state/QuestionsContext";
import { useThreadsState } from "../global-state/ThreadsContext";

import { TextArea, IconButton, ChatBlock } from "../components";
import { AnswerResponseType } from "../types";

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
import { scrollStyle } from "../constants";
import { TEST_IDS } from "../constants/dataTestids";

const ChatPage = ({ recentQuestion }: { recentQuestion: string }) => {
  // refs for uncontrolled elements
  const ref = useRef<HTMLElement>();
  const bottomDivRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  // local state
  const [question, setQuestion] = useState<string>("");
  const [activeQuestion, setActiveQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //context state
  const { questionsState, setQuestionsState } = useQuestionsState();
  const { threadsState, setThreadsState } = useThreadsState();
  // on page load scroll to bottom for type message and get focus to text box
  useEffect(() => {
    ref?.current?.scrollTo({ top: bottomDivRef.current?.offsetTop });
    textInputRef.current?.focus();
  }, []);
  //after send the message UI will scroll to bottom of the text box area
  useEffect(() => {
    ref?.current?.scrollTo({
      top: bottomDivRef.current?.offsetTop! + 500,
    });
  }, [threadsState]);
  // on user click on recent question from left side bar will fill that question in input box
  useEffect(() => {
    setQuestion(recentQuestion);
  }, [recentQuestion]);
  // callback function sync the user input with state on typing
  const typeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setQuestion(e.currentTarget.value);
  };
  // submit handler function to process the request
  const submitHandler = () => {
    // re-arrange the recent questions
    const recentQuestions = resetRecentQuestions(questionsState, question);
    // update the global context
    setQuestionsState(recentQuestions);
    // if its math Expression then find the answer using js eval
    if (isMathExpression(question)) {
      const questionThread = mathsQuestionThread(question);
      const answerThread = mathsAnswerThread(question);
      setThreadsState([...threadsState, questionThread, answerThread]);
      setQuestion("");
    } else {
      //if its not math Expression then set the flag to use the API via custom hook UseFetch
      setLoading(true);
      setActiveQuestion(question);
    }
  };

  return (
    <div className="absolute mt-5 bottom-0 w-[calc(100%-5rem)] sm:w-[calc(100%-20rem)] md:w-[calc(100%-20rem)]">
      {/* custom scroll bar */}
      <SimpleBar
        id="scroll"
        scrollableNodeProps={{ ref: ref }}
        style={scrollStyle}
      >
        {/* main chat thread block */}
        <ChatBlock threadsState={threadsState} />

        <div className="flex items-center p-5 mb-6" ref={bottomDivRef}>
          <TextArea
            aria-label="Type a thread"
            ref={textInputRef}
            value={question}
            placeholder="Type a thread"
            data-testid="send-message"
            onChange={typeHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey == false) {
                e.preventDefault();
                submitHandler();
              }
            }}
            disabled={loading}
            id="textarea"
          />
          <IconButton
            icon="sendMessage"
            aria-label="Send Message"
            onClick={submitHandler}
            data-testid={TEST_IDS.SEND_BUTTON}
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
              // if answer is unknown
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
