import { Eye, EyeOff } from "lucide-react";
import { useState, type FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorFieldInput from "../ErrorFieldInput";
import { cn } from "../../utils/cn";

// props
type Props = {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  name: string;
  minLength?: number;
  placeholder: string;
  maxLength?: number;
  label: string;
  required?: boolean;
  max: number;
  clearError?: () => void;
};

const InputFieldNonIconPassword: FC<Props> = ({
  name,
  register,
  errorMessage,
  maxLength,
  minLength,
  placeholder,
  label,
  required,
  max,
}) => {
  // state show password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // is value
  const [isValue, setIsValue] = useState<string>("");
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
          <label htmlFor={name} className="capitalize text-sm">
            {label}
          </label>

          <span className="absolute -top-1 ml-1 text-error">
            {required && "*"}
          </span>
        </div>

        {/* MAX BERDASARKAN NILAI ANGKA */}
        <span className="text-xs">
          {isValue.length || 0} / {max}
        </span>
      </div>
      <div className="mt-2 h-10 px-3 flex flex-row justify-start items-center gap-2 border border-primary-black/40 rounded-md w-full focus-within:ring-1 focus-within:ring-primary-purple focus-within:border-primary-purple transition-all duration-300 ease-in-out ">
        {/* input */}
        <input
          {...register}
          type={showPassword ? "text" : "password"}
          id={name}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm placeholder:text-sm placeholder:text-gray-400  placeholder:font-light"
          autoComplete="off"
          minLength={minLength || 6}
          maxLength={maxLength || 100}
          onChange={(e) => {
            let value = e.target.value;
            // set value
            setIsValue(value);

            // set value
            register.onChange(e);
          }}
        />

        {/* eye */}
        <div className="h-full flex flex-row justify-center items-center">
          {showPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye className="w-5 h-5 pointer-events-none" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeOff className="w-5 h-5 pointer-events-none" />
            </button>
          )}
        </div>
      </div>

      {/* error message */}
      <ErrorFieldInput errorMessage={errorMessage} />
    </div>
  );
};

export default InputFieldNonIconPassword;
