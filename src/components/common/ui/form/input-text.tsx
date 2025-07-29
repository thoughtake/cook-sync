import clsx from "clsx";
import { ComponentProps } from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  isRequired: boolean;
  onChange: ComponentProps<"input">["onChange"];
  suffix?: string;
  className?: string;
  showLabel?: boolean;
};

const InputText = (props: Props) => {
  const {
    name,
    label,
    value,
    isRequired,
    onChange,
    suffix,
    className = "w-full",
    showLabel = true,
  } = props;

  return (
    <div className="mb-7">
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
      <input
        id={name}
        type="text"
        name={name}
        value={value}
        required={isRequired}
        onChange={onChange}
        className={clsx(className, "border-border border-3 rounded p-3")}
      />
      {suffix && <span className="font-bold ml-3">{suffix}</span>}
    </div>
  );
};

export default InputText;
