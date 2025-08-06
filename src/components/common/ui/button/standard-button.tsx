import clsx from "clsx";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  icon?: LucideIcon;
  variant?: "filled" | "outline";
  size? : "sm" | "md"
  radius?: "rounded" | "circle";
  color?: "primary" | "black" | "green" | "gray" | "red";
  isDisabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const StandardButton = (props: Props) => {
  const {
    label,
    icon : Icon,
    variant = "filled",
    size = "md",
    radius = "rounded",
    color = "primary",
    isDisabled = false,
    className,
    onClick,
  } = props;

  const sizeMap = {
    sm: {size: "px-3 py-2 font-normal", border: "border", icon: "w-5 h-5"},
    md: {size: "px-4 py-2 text-xl font-bold", border: "border-2", icon: "w-8 h-8"}
  }

  const radiusMap = {
    rounded: "rounded",
    circle: "rounded-full"
  }

  const colorMap = {
    primary: {
      bg: "bg-primary",
      border: "border-primary",
      text: { filled: "text-text", outline: "text-primary" },
    },
    black: {
      bg: "text-text",
      border: "border-text",
      text: { filled: "text-white", outline: "text-text" },
    },
    green: {
      bg: "bg-green-600",
      border: "border-green-600",
      text: { filled: "text-white", outline: "border-green-600" },
    },
    gray: {
      bg: "bg-cancel",
      border: "border-cancel",
      text: { filled: "text-white", outline: "border-cancel" },
    },
    red: {
      bg: "bg-attention",
      border: "border-attention",
      text: {filled: "text-white", outline: "border-attention"}
    },
  };

  const { bg, border, text: textMap } = colorMap[color];
  const text = textMap[variant];

  const {size: buttonSize, border: borderWidth, icon: iconSize} = sizeMap[size];

  const variantMap = {
    filled: `${bg} border-none ${text} ${buttonSize}`,
    outline: `bg-transparent border ${border} ${text} ${buttonSize} ${borderWidth}`,
  };

  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        variantMap[variant],
        radiusMap[radius],
        className,
        "flex items-center justify-center",
        "my-3 rounded",
        "cursor-pointer hover:brightness-110",
        "disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-default disabled:brightness-100"
      )}
    >
      {Icon 
      && (
        <Icon className={`${iconSize} mr-1`}/>
      )
    }
      {label}
    </button>
  );
};

export default StandardButton;
