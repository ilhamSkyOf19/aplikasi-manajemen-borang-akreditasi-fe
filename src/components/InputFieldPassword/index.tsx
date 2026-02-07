import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useState, type FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorFieldInput from "../ErrorFieldInput";

// props
type Props = {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  name: string;
  minLength?: number;
  placeholder: string;
  maxLength?: number;
};

const InputFieldPassword: FC<Props> = ({
  name,
  register,
  errorMessage,
  maxLength,
  minLength,
  placeholder,
}) => {
  // state show password
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="h-10 lg:h-11 px-3 flex flex-row justify-start items-center gap-2 border border-primary-black/40 rounded-md w-full focus-within:ring-1 focus-within:ring-primary-purple transition-all duration-300 ease-in-out ">
        {/* icon */}
        <label htmlFor={name}>
          <KeyRound className="w-4 h-4" />
        </label>

        {/* input */}
        <input
          {...register}
          type={showPassword ? "text" : "password"}
          id={name}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-xs placeholder:text-xs placeholder:text-gray-400  placeholder:font-light lg:text-sm lg:placeholder:text-sm"
          autoComplete="off"
          minLength={minLength || 6}
          maxLength={maxLength || 100}
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

export default InputFieldPassword;
