import clsx from "clsx";

type Props = {
  label: string;
  variant?: "filled" | "outline";
  radius?: "rounded" | "circle";
  color?: "primary" | "black" | "green" | "gray" | "red";
  isDisabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const StandardButton = (props: Props) => {
  const {
    label,
    variant = "filled",
    radius = "rounded",
    color = "primary",
    isDisabled = false,
    className,
    onClick,
  } = props;

  const radiusMap = {
    rounded: "rounded",
    circle: "rounded-full",
  };

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

  const variantMap = {
    filled: `${bg} border-none ${text}`,
    outline: `bg-transparent border border-2 ${border} ${text}`,
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
        "my-3 px-4 py-2 text-xl font-bold rounded",
        "cursor-pointer hover:brightness-110",
        "disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-default disabled:brightness-100"
      )}
    >
      {label}
    </button>
  );
};

export default StandardButton;
