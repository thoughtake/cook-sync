import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ComponentProps } from "react";

type Props = {
  name: string;
  label: string;
  value: number | string;
  isRequired: boolean;
  onChange: (value: string) => void;
  options: { id: number; name: string }[];
  className?: string;
};

const SelectBoxNew = (props: Props) => {
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
            <span className="bg-attention text-white px-2 py-1 rounded">
              必須
            </span>
          )}
        </div>
        <div className="relative">
          <Select.Root
            name={name}
            value={String(value)}
            onValueChange={onChange}
            required={isRequired}

          >
            <Select.Trigger className={clsx(className, " border-border border-3 rounded p-3")} aria-label={label}>
              <Select.Value placeholder="選択してください" />
              <Select.Icon>
                <ChevronDown className="text-gray-500 w-5 h-5" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="z-100 rounded border border-border bg-white shadow-lg">
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white">
                  <ChevronUp />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-1">
                  {options.map((option) => (
                    <Select.Item
                      key={option.id}
                      value={String(option.id)}
                      className="relative flex items-center px-8 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-100 select-none"
                    >
                      <Select.ItemText>{option.name}</Select.ItemText>
                      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                        <Check className="w-4 h-4 text-primary" />
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
      </label>
    </div>
  );
};

export default SelectBoxNew;
