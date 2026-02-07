import { Search, UserRound } from "lucide-react";
import { type FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "../../utils/cn";

type Props = {
  //   register: UseFormRegisterReturn;
  //   name: string;
  //   minLength?: number;
  //   maxLength?: number;
  //   placeholder: string;
};

const InputFieldSearch: FC<Props> = (
  {
    //   name,
    //   placeholder,
    //   register,
    //   maxLength,
    //   minLength,
  },
) => {
  return (
    <div className="w-full h-10 lg:h-11 flex flex-row justify-start items-center">
      <div className="h-full  px-3 flex flex-row justify-start items-center gap-2 border border-primary-black/40 rounded-tl-md rounded-bl-md w-full focus-within:ring-1 focus-within:ring-primary-purple transition-all duration-300 ease-in-out border-r-primary-purple">
        {/* icon */}
        <label htmlFor={"name"}>
          <Search className="w-5 h-5" />
        </label>

        {/* input */}
        <input
          // {...register}
          type="text"
          id={"name"}
          placeholder={"Search"}
          className="w-full bg-transparent outline-none text-xs placeholder:text-xs placeholder:text-gray-400 placeholder:font-light lg:text-sm lg:placeholder:text-sm"
          autoComplete="off"
          minLength={1}
          maxLength={100}
        />
      </div>

      {/* btn */}
      <button
        type="button"
        className={cn(
          "h-full w-18 bg-primary-purple rounded-tr-md rounded-br-md flex justify-center items-center",
          "hover-overlay",
        )}
      >
        <span className="text-xs lg:text-sm text-primary-white">Cari</span>
      </button>
    </div>
  );
};

export default InputFieldSearch;
