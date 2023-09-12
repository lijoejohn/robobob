export enum ThreadType {
  Question = "Question",
  Answer = "Answer",
}
export type Question = {
  question: string;
  questionKey: string;
};
export type Thread = {
  message: string;
  messageKey: string;
  threadType: ThreadType;
};

export type AnswerResponseType = Omit<Thread, "threadType">;
