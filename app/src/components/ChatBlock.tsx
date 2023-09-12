import { MessageBlock } from "../components";
import { ThreadType, Thread } from "../annotations";

export const ChatBlock = ({ threadsState }: { threadsState: Thread[] }) => {
  return threadsState.map((dataSet) => {
    return (
      <MessageBlock
        key={dataSet.threadKey}
        isQuestion={dataSet.threadType === ThreadType.Question}
        thread={dataSet.thread}
      />
    );
  });
};
