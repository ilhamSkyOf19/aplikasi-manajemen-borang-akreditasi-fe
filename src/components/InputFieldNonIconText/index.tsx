import { useEffect, useState, type FC } from "react";
import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorFieldInput from "../ErrorFieldInput";

type Props = {
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  max: number;
  defaultValue?: string;
};

const InputFieldNonIconText: FC<Props> = ({
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
  const [isValue, setIsValue] = useState<string>("");

  // set default value
  useEffect(() => {
    if (defaultValue) {
      setIsValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className="w-full flex flex-col justify-start items-start">
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
          {isValue.length} / {max}
        </span>
      </div>

      <div
        className={clsx(
          "mt-2 h-11 px-3 flex flex-row justify-start items-center gap-2 border border-primary-black rounded-md w-full focus-within:ring-1 focus-within:ring-primary-purple transition-all duration-300 ease-in-out",
          errorMessage && "border-error",
        )}
      >
        <input
          {...register}
          type={"text"}
          name={name}
          id={name}
          placeholder={placeholder}
          className="w-full h-full border-none outline-none text-base placeholder:text-sm"
          maxLength={max}
          onChange={(e) => {
            let value = e.target.value;
            // set value
            setIsValue(value);

            // set value
            register.onChange(e);
          }}
        />
      </div>

      {/* error message */}
      <ErrorFieldInput errorMessage={errorMessage} />
    </div>
  );
};

export default InputFieldNonIconText;
