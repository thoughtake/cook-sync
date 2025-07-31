import clsx from "clsx";
import { ComponentProps, memo } from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  isRequired: boolean;
  onChange: ComponentProps<"textarea">["onChange"];
  className?: string;
  showLabel?: boolean;
  hasMargin?: boolean;
};

const InputTextarea = (props: Props) => {
  const {
    name,
    label,
    value,
    isRequired,
    onChange,
    className = "w-full",
    showLabel = true,
    hasMargin = true
  } = props;


  return (
    <div className={`${hasMargin ? "mb-7" : "mb-0"}`}>
      {showLabel && (
        <div className="font-bold mb-2">
          <label htmlFor={name} className="mr-2">
            {label}
          </label>
          {isRequired && (
            <span className="bg-attention text-white px-2 py-1 rounded">
              必須
            </span>
          )}
        </div>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        required={isRequired}
        onChange={onChange}
        className={clsx(className, "border-border border-3 rounded p-3")}
      />
    </div>
  );
};

export default memo(InputTextarea);
