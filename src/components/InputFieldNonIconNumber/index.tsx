import { useEffect, useState, type FC } from "react";
import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorFieldInput from "../ErrorFieldInput";
import { cn } from "../../utils/cn";

type Props = {
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  max: number;
  defaultValue?: number;
};

const InputFieldNonIconNumber: FC<Props> = ({
  label,
  name,
  placeholder,
  required,
  errorMessage,
  register,
  max,
  defaultValue,
}) => {
  // simpan sebagai number | null
  const [isValue, setIsValue] = useState<number | "">("");

  // set default value
  useEffect(() => {
    if (defaultValue) {
      setIsValue(defaultValue);
    }
  }, [defaultValue]);
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-start items-start",
        errorMessage && "mb-3",
      )}
    >
      {/* label */}
      <div className="w-full text-base relative flex flex-row justify-between items-center">
        <div className="flex-2 relative">
          <label htmlFor={name} className="capitalize">
            {label}
          </label>

          <span className="absolute -top-1 ml-1 text-error">
            {required && "*"}
          </span>
        </div>

        {/* MAX BERDASARKAN NILAI ANGKA */}
        <span className="text-xs">
          {isValue || 0} / {max}
        </span>
      </div>

      <div
        className={clsx(
          "mt-2 h-11 px-3 flex flex-row justify-start items-center gap-2 border border-primary-black rounded-md w-full focus-within:ring-1 focus-within:ring-primary-purple focus-within:border-primary-purple transition-all duration-300 ease-in-out",
          errorMessage && "border-error",
        )}
      >
        <input
          {...register}
          type="number"
          name={name}
          id={name}
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-light lg:text-sm lg:placeholder:text-sm"
          min={0}
          max={max}
          onKeyDown={(e) => {
            // Cegah minus & e (scientific notation)
            if (["-", "e", "E"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            let value: number | "" =
              e.target.value === "" ? "" : Number(e.target.value);

            // Cegah NaN & negatif
            if (typeof value === "number") {
              if (value < 0) value = 0;
              if (value > max) value = max;

              e.target.value = String(value);
            }

            setIsValue(value);
            register.onChange(e);
          }}
        />
      </div>

      {/* error message */}
      <ErrorFieldInput errorMessage={errorMessage} />
    </div>
  );
};

export default InputFieldNonIconNumber;
