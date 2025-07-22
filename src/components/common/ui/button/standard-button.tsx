type Props = {
  text: string;
  bgColor?: string;
  textColor?: string;
  isDisabled?: boolean;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const StandardButton = (props: Props) => {
  const {
    text,
    bgColor = "bg-primary",
    textColor = "text-white",
    isDisabled = false,
    className,
    onClick,
  } = props;

  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      disabled={isDisabled}
      className={`${bgColor} ${textColor}  ${className} my-3 px-4 py-2 rounded cursor-pointer hover:brightness-110 text-xl font-bold disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-default disabled:brightness-100`}
    >
      {text}
    </button>
  );
};

export default StandardButton;
