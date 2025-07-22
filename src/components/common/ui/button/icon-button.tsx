import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  bgColor?: string;
  textColor?: string;
  className?: string;
  iconClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = ({
  icon: Icon,
  bgColor = "bg-primary",
  textColor = "text-text",
  className,
  iconClassName = "w-4.5 h-4.5",
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} ${className} hover:cursor-pointer`}
    >
      <Icon className={`${iconClassName}`}/>
    </button>
  );
};

export default IconButton;
