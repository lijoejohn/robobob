export enum ThreadType {
  Question = "Question",
  Answer = "Answer",
}
export type Question = {
  question: string;
  questionKey: string;
};
export type Thread = {
  thread: string;
  threadKey: string;
  threadType: ThreadType;
};

export type AnswerResponseType = Omit<Thread, "threadType"> & {
  answer: string;
};
