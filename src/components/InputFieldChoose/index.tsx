import clsx from "clsx";
import type { FieldValues, UseControllerReturn } from "react-hook-form";
import ErrorFieldInput from "../ErrorFieldInput";
import { cn } from "../../utils/cn";

type Props<T extends FieldValues = any> = {
  label: string;
  chooseList: { label: string; value: string }[];
  required: boolean;
  controller: UseControllerReturn<T>;
  placeholder: string;
  disabled?: boolean;
};

export default function InputFieldChoose<T extends FieldValues = any>({
  chooseList,
  controller,
  label,
  placeholder,
  required,
  disabled,
}: Props<T>) {
  // field
  const { field, fieldState } = controller;

  return (
    <div
      className={cn(
        "w-full flex flex-col justify-start items-start",
        fieldState.error && "mb-3",
      )}
    >
      {/* label */}
      <div className="w-full text-base relative flex flex-row justify-between items-center">
        <div className="flex-2 relative">
          <label htmlFor={"nama"} className="capitalize">
            {label}
          </label>

          <span className="absolute -top-1 ml-1 text-error">
            {required && !disabled && "*"}
          </span>
        </div>
      </div>

      <div
        className={clsx(
          "mt-2 h-11 flex flex-row justify-start items-stretch gap-2 border border-primary-black rounded-md w-full focus-within:ring-1 focus-within:ring-primary-purple transition-all duration-300 ease-in-out focus-within:border-primary-purple",
          fieldState.error && "border-error",
          disabled && "cursor-not-allowed border-primary-black/10",
        )}
      >
        <select
          className="select select-bordered w-full"
          value={field.value || ""}
          onChange={(e) => field.onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {chooseList.map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* error message */}
      <ErrorFieldInput errorMessage={fieldState.error?.message} />
    </div>
  );
}
