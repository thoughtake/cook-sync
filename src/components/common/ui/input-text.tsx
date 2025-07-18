type Props = {
  label: string;
  value: number | string;
  isRequired: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: string;
  className?: string;
};

const InputText = (props: Props) => {
  const {
    label,
    value,
    isRequired,
    onChange,
    suffix,
    className = "w-full",
  } = props;

  return (
    <div className="mb-5">
      <label>
        <div className="font-bold mb-3">
          <span className="mr-2">{label}</span>
          {isRequired && 
          <span className="bg-red-500 text-white px-2 py-1 rounded">必須</span>
          }
        </div>
        <input
          type="text"
          name="name"
          value={value}
          required={isRequired}
          onChange={onChange}
          className={`outline-border outline-3 rounded p-3 ${className}`}
        />
        {suffix &&
        <span className="font-bold ml-3">{suffix}</span>
        }
      </label>
    </div>
  );
};

export default InputText;
