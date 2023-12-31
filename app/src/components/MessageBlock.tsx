import { clsx } from "clsx";
import { Avatar } from "../components";
import { DomPurify } from "../helpers";

export const MessageBlock = ({
  isQuestion,
  thread,
  threadKey,
}: {
  isQuestion?: boolean;
  thread: string;
  threadKey: string;
}) => {
  return (
    <div
      data-testid={threadKey}
      className={clsx(
        "flex",
        "p-2",
        "mx-auto",
        "mt-4",
        "ml-4",
        "text-right",
        "border-b",
        "border-gray-700",
        "rounded",
        "border-1",
        isQuestion && "flex-row-reverse",
        !isQuestion && "bg-gray-500"
      )}
    >
      <Avatar isQuestion={isQuestion} />
      <div className={clsx("flex", isQuestion && "justify-end", "w-full")}>
        {DomPurify(thread)}
      </div>
    </div>
  );
};
