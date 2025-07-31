import clsx from "clsx";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  variant?: "filled" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "rounded" | "circle";
  color?: "primary" | "black" | "green" | "gray" | "red";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = ({
  icon: Icon,
  variant = "filled",
  size = "md",
  radius = "rounded",
  color = "primary",
  className,
  onClick,
}: Props) => {
  const sizeMap = {
    xs: "p-2",
    sm: "p-2.5 border-2",
    md: "p-2.5 border-2",
    lg: "p-1.5 border-1.5",
    xl: "p-2",
  };

  const iconSizeMap = {
    xs: "w-3.5 h-3.5",
    sm: "w-4.5 h-4.5",
    md: "w-6.5 h-6.5",
    lg: "w-7 h-7",
    xl: "w-9 h-9",
  };

  const radiusMap = {
    rounded: "rounded",
    circle: "rounded-full"
  };

  const colorMap = {
    primary: {
      bg: "bg-primary",
      border: "border-primary",
      text: {filled: "text-text", outline: "text-primary"}
    },
    black: {
      bg: "text-text",
      border: "border-text",
      text: {filled: "text-white", outline: "text-text"},
    },
    green: {
      bg: "bg-green-600",
      border: "border-green-600",
      text: {filled: "text-white", outline: "border-green-600"}
    },
    gray: {
      bg: "bg-cancel",
      border: "border-cancel",
      text: {filled: "text-white", outline: "border-cancel"}
    },
    red: {
      bg: "bg-attention",
      border: "border-attention",
      text: {filled: "text-white", outline: "border-attention"}
    },
  };

  const { bg, border, text: textMap } = colorMap[color];
  const text = textMap[variant]

  const variantMap = {
    filled: `${bg} border-none ${text}`,
    outline: `bg-transparent border border-2 ${border} ${text}`,
  };

  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      className={clsx(
        variantMap[variant],
        sizeMap[size],
        radiusMap[radius],
        className,
        "hover:cursor-pointer"
      )}
    >
      <Icon className={`${iconSizeMap[size]}`} />
    </button>
  );
};

export default IconButton;
