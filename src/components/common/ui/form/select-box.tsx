import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  isRequired: boolean;
  onChange: (value: number | null) => void;
  options: { id: number; name: string }[];
  className?: string;
  showLabel?: boolean;
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
    showLabel = true,
  } = props;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOptions = options.filter((option) => {
    return option.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
      <div className="relative">
        <Select.Root
          name={name}
          value={value}
          onValueChange={(val) => {
            if (val === "") return;
            onChange(Number(val));
          }}
          required={isRequired}
        >
          <Select.Trigger
            id={name}
            className={clsx(
              className,
              " border-border border-3 rounded p-3 text-left"
            )}
            aria-label={label}
          >
            <Select.Value placeholder="選択してください" />
            <Select.Icon>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              position="popper"
              className={clsx(
                "z-100 rounded border border-border bg-white shadow-lg p-4",
                "w-[var(--radix-select-trigger-width)]",
                "overflow-y-auto max-h-100"
              )}
            >
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`${label}を検索`}
                className="mb-2 p-2 border-2 border-border rounded"
              />
              <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white">
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport className="">
                {filteredOptions.map((option) => (
                  <Select.Item
                    key={option.id}
                    value={String(option.id)}
                    className="relative flex items-center px-8 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-100 select-none"
                  >
                    <Select.ItemText>{option.name}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="w-4 h-4 text-text" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white">
                <ChevronDown />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};

export default SelectBox;
