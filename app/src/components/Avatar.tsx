import clsx from "clsx";
export const Avatar = ({ isQuestion }: { isQuestion?: boolean }) => {
  return (
    <div
      className={clsx(
        "rounded",
        "p-6",
        "flex",
        "justify-center",
        "items-center",
        "w-[20px]",
        "h-[20px]",
        !isQuestion && "mr-4",
        isQuestion && "ml-4",
        isQuestion && "bg-white",
        isQuestion && "text-black",
        !isQuestion && "bg-red-900",
        !isQuestion && "text-white"
      )}
    >
      {isQuestion ? `You` : `Bob`}
    </div>
  );
};
