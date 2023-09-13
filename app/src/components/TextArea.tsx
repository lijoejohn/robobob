import { forwardRef } from "react";

import { clsx } from "clsx";
export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.HTMLProps<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      className={clsx(
        "w-full",
        "h-12",
        "mr-5",
        "border",
        "text-sm",
        "rounded-lg",
        "p-2.5",
        "bg-gray-700",
        "border-gray-700",
        "focus:border-blue-700"
      )}
      ref={ref}
      {...props}
    />
  );
});
