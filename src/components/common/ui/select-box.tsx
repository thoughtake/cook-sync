import { ChevronDown } from "lucide-react";

type Props = {
  name: string;
  label: string;
  value: number | string;
  isRequired: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: number; name: string }[];
  className?: string;
};

const SelectBox = (props: Props) => {
  const {
    name,
    label,
    value,
    isRequired,
    onChange,
    options,
    className = "w-full",
  } = props;

  return (
    <div className="mb-7">
      <label>
        <div className="font-bold mb-2">
          <span className="mr-2">{label}</span>
          {isRequired && (
            <span className="bg-red-500 text-white px-2 py-1 rounded">
              必須
            </span>
          )}
        </div>
        <div className="relative">
        <select
          name={name}
          value={value}
          required={isRequired}
          onChange={onChange}
          className={`appearance-none border-border border-3 rounded p-3 ${className}`}
        >
          <option value="">選択してください</option>
          {options.map((group: { id: number; name: string }) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

        </div>
      </label>
    </div>
  );
};

export default SelectBox;
