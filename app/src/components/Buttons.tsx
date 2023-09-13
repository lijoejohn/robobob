import { clsx } from "clsx";
import { Icon } from "../components";

interface ExtraProps {
  icon: string;
}

export const IconButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ExtraProps
) => {
  return (
    <button
      className={clsx(
        "h-12",
        "px-5",
        "py-2",
        "border",
        "border-gray-400",
        "border-solid",
        "divide-transparent",
        "rounded-md",
        "hover:border-white",
        "focus-within:outline-blue-200",
        "focus:outline-4",
        "focus:outline-blue-200",
        "active:outline-blue-200",
        "disabled:bg-gray-500",
        "disabled:border-gray-400",
        " disabled:cursor-not-allowed"
      )}
      {...props}
    >
      <Icon icon={props.icon} />
    </button>
  );
};

export const SecondaryButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className={clsx(
        "border-gray-400",
        "border",
        "divide-transparent",
        "border-solid",
        "truncate",
        "m-2",
        "max-w-[14rem]",
        "rounded",
        "p-0",
        "text-xs",
        "font-light",
        "mr-2",
        "px-2.5",
        "py-0.5",
        "hover:border-white",
        "focus-within:outline-blue-200",
        "focus:outline-4",
        "focus:outline-blue-200"
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
