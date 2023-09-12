import { Icons } from "./icons";
export const Icon = ({
  icon,
  props,
}: {
  icon: string;
  props?: React.HTMLProps<SVGSVGElement>;
}) => {
  const iconData = Icons.filter((items) => {
    return items.key === icon;
  });
  const svgData = iconData[0].svgData;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 16"
      fill="none"
      className="w-12 h-4 m-1 md:m-0"
      strokeWidth="2"
      {...props}
    >
      <path {...svgData} />
    </svg>
  );
};
