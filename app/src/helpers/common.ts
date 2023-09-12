import createDOMPurify from "dompurify";
import { Question, ThreadType } from "../annotations/common";

export const DomPurify = (html: string): string => {
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(html).toString();
};

export const generateKey = (string: string): string => {
  return string.replace(/[^a-z0-9]/gi, "");
};

export const isMathExpression = (expression: string): boolean => {
  // Define a regular expression pattern for a valid arithmetic expression
  const pattern =
    /^(\s*[\+\-]?\s*\d+(\.\d+)?\s*[\+\-\*\/]\s*)+\s*[\+\-]?\s*\d+(\.\d+)?\s*$/;

  // Use the test method to check if the expression matches the pattern
  return pattern.test(expression);
};

export const resetRecentQuestions = (
  questionsState: Question[],
  question: string
) => {
  const clone = questionsState;
  const key = generateKey(question);
  if (clone.some((item) => item.questionKey === key)) {
    const index = clone.findIndex((item) => item.questionKey === key);
    clone.splice(index, 1);
  }
  clone.push({ question, questionKey: key });
  return clone;
};

export const mathsQuestionThread = (question: string) => {
  return {
    thread: `Basic mathematical expressions : ${question}`,
    threadKey: generateKey(`${question}-${Date.now()}`),
    threadType: ThreadType.Question,
  };
};
export const mathsAnswerThread = (question: string) => {
  const thread = `Your response to the basic mathematical expressions :  ${eval(
    question.replace("--", "- -").replace("++", "+ +")
  )}`;
  return {
    thread,
    threadKey: generateKey(`${thread}-${Date.now()}`),
    threadType: ThreadType.Answer,
  };
};

export const questionThread = (question: string) => {
  return {
    thread: question,
    threadKey: generateKey(`${question}-${Date.now()}`),
    threadType: ThreadType.Question,
  };
};

export const answerThread = (answer: string) => {
  return {
    thread: answer,
    threadKey: generateKey(`${answer}-${Date.now()}`),
    threadType: ThreadType.Answer,
  };
};

export const unknownAnswerThread = () => {
  const thread =
    "I'm sorry, but I have no knowledge regarding this query. Would you kindly reword the questions?";
  return {
    thread,
    threadKey: generateKey(`${thread}-${Date.now()}`),
    threadType: ThreadType.Answer,
  };
};
