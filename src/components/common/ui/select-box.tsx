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
    <div className="mb-5">
      <label>
        <div className="font-bold mb-3">
          <span className="mr-2">{label}</span>
          {isRequired && (
            <span className="bg-red-500 text-white px-2 py-1 rounded">
              必須
            </span>
          )}
        </div>
        <select
          name={name}
          value={value}
          required={isRequired}
          onChange={onChange}
          className={`outline-border outline-3 rounded p-3 ${className}`}
        >
          <option value="">選択してください</option>
          {options.map((group: { id: number; name: string }) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectBox;
