import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  bgColor?: string;
  textColor?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = ({
  icon: Icon,
  bgColor = "bg-primary",
  textColor = "text-text",
  className,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} ${className} p-2.5 rounded-full hover:cursor-pointer font-bold`}
    >
      <Icon className="w-4.5 h-4.5"/>
    </button>
  );
};

export default IconButton;
