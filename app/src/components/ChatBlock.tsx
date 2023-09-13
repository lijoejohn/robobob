import { MessageBlock } from "../components";
import { ThreadType, Thread } from "../types";

export const ChatBlock = ({ threadsState }: { threadsState: Thread[] }) => {
  // iterate over the threads and render each chat block for individual thread [question/answer]
  return threadsState.map((dataSet) => {
    return (
      <MessageBlock
        key={dataSet.threadKey}
        threadKey={dataSet.threadKey}
        isQuestion={dataSet.threadType === ThreadType.Question}
        thread={dataSet.thread}
      />
    );
  });
};
