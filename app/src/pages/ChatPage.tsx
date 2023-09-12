import { useEffect, useState, useRef } from "react";
import SimpleBar from "simplebar-react";
import { MessageBlock, TextArea, IconButton } from "../components";
import { useQuestionsState } from "../global-state/QuestionsContext";
import { useThreadsState } from "../global-state/ThreadsContext";
import { ThreadType, Thread, AnswerResponseType } from "../annotations";
import "simplebar-react/dist/simplebar.min.css";
import { generateKey, isMathExpression } from "../helpers";
import UseFetch from "../hooks/useFetch";

const ChatPage = ({ recentQuestion }: { recentQuestion: string }) => {
  const ref = useRef<HTMLElement>();
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState<string>("");
  const [questionKey, setQuestionKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { questionsState, setQuestionsState } = useQuestionsState();
  const { threadsState, setThreadsState } = useThreadsState();

  useEffect(() => {
    ref?.current?.scrollTo({ top: inputBoxRef.current?.offsetTop });
  }, []);

  const style =
    window.innerWidth > 768
      ? { maxHeight: "calc(100vh - 40px)" }
      : {
          maxHeight: "calc(100vh - 200px)",
        };

  useEffect(() => {
    ref?.current?.scrollTo({
      top: inputBoxRef.current?.offsetTop! + 500,
    });
  }, [threadsState]);

  useEffect(() => {
    setQuestion(recentQuestion);
  }, [recentQuestion]);

  useEffect(() => {
    console.log(questionKey);
  }, [questionKey]);

  //console.log(responseData, isLoading);

  const typeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setQuestion(newValue);
  };

  const submitHandler = () => {
    console.log(question);
    const clone = questionsState;
    const key = generateKey(question);
    if (clone.some((item) => item.questionKey === key)) {
      const index = clone.findIndex((item) => item.questionKey === key);
      clone.splice(index, 1);
    }
    let formatedQuestion = question;
    let answer =
      "I'm sorry, but I have no knowledge regarding this query. Would you kindly reword the questions?";
    let answerDataSet: Thread = {
      message: answer,
      messageKey: generateKey(`${answer}-${Date.now()}`),
      threadType: ThreadType.Answer,
    };
    if (isMathExpression(question)) {
      formatedQuestion = `Basic mathematical expressions : ${question}`;
      answer = `Your response to the basic mathematical expressions :  ${eval(
        question.replace("--", "- -").replace("++", "+ +")
      )}`;
      answerDataSet = {
        message: answer,
        messageKey: generateKey(`${answer}-${Date.now()}`),
        threadType: ThreadType.Answer,
      };
    } else {
      setQuestionKey(key);
      setLoading(true);

      // answerDataSet = {
      //   message: `Your response to the basic mathematical expressions :  ${eval(
      //     question
      //   )}`,
      //   messageKey: key,
      //   threadType: ThreadType.Answer,
      // };
    }
    setThreadsState([
      ...threadsState,
      {
        message: formatedQuestion,
        messageKey: generateKey(`${question}-${Date.now()}`),
        threadType: ThreadType.Question,
      },
      answerDataSet,
    ]);
    clone.push({ question, questionKey: key });
    setQuestionsState(clone);
    setQuestion("");
  };

  return (
    <div className="absolute mt-5 bottom-0 w-[calc(100%-5rem)] sm:w-[calc(100%-20rem)] md:w-[calc(100%-20rem)]">
      <SimpleBar id="scroll" scrollableNodeProps={{ ref: ref }} style={style}>
        {threadsState.map((dataSet) => {
          return (
            <MessageBlock
              key={dataSet.messageKey}
              isQuestion={dataSet.threadType === ThreadType.Question}
              message={dataSet.message}
            />
          );
        })}
        <div className="flex items-center p-5 mb-6" ref={inputBoxRef}>
          <TextArea
            value={question}
            placeholder="Type a message"
            id="first_name"
            onChange={typeHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey == false) {
                e.preventDefault();
                submitHandler();
              }
            }}
          />
          <IconButton
            icon="sendMessage"
            aria-label="Send Message"
            onClick={submitHandler}
            disabled={question === ""}
          />
        </div>
      </SimpleBar>
      {loading ? (
        <UseFetch
          callBack={(thread: AnswerResponseType) => {
            setLoading(false);
          }}
          messageKey={questionKey}
        />
      ) : null}
    </div>
  );
};
export default ChatPage;
