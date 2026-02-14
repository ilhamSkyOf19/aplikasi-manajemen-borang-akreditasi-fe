import { Search, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { cn } from "../../../utils/cn";
import { useSearchParams } from "react-router-dom";

type Props = {
  handleSearch: (value: string) => void;
  placeholder?: string;
};

const InputFieldSearch: FC<Props> = ({ handleSearch, placeholder }) => {
  const [searchParams] = useSearchParams();

  // ambil dari URL
  const urlSearch = searchParams.get("search") ?? "";

  // state search
  const [inputValue, setInputValue] = useState<string>("");

  // set default value
  useEffect(() => {
    if (urlSearch) {
      setInputValue(urlSearch);
    }
  }, [urlSearch]);

  return (
    <div className="w-full h-10 lg:h-11 flex flex-row justify-start items-center">
      <div className="h-full px-3 flex flex-row justify-start items-center gap-2 border border-primary-black/40 rounded-tl-md rounded-bl-md w-full focus-within:ring-1 focus-within:ring-primary-purple transition-all duration-300 ease-in-out border-r-primary-purple">
        {/* icon */}
        <label htmlFor={"name"}>
          <Search className="w-5 h-5" />
        </label>

        {/* input */}
        <input
          // {...register}
          type="text"
          id={"name"}
          placeholder={placeholder || "Search"}
          className="w-full h-full bg-transparent outline-none text-xs placeholder:text-xs placeholder:text-gray-400 placeholder:font-light lg:text-sm lg:placeholder:text-sm"
          autoComplete="off"
          minLength={1}
          maxLength={100}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* button clear */}
        {inputValue !== "" && (
          <button
            type="button"
            className="h-full bg-primary-white rounded-tr-md rounded-br-md flex justify-center items-center"
            onClick={() => {
              (setInputValue(""), handleSearch(""));
            }}
          >
            <span className="text-xs lg:text-sm text-primary-purple">
              <X className="size-4" />
            </span>
          </button>
        )}
      </div>

      {/* btn */}
      <button
        type="button"
        className={cn(
          "h-full w-18 bg-primary-purple rounded-tr-md rounded-br-md flex justify-center items-center",
          "hover-overlay",
        )}
        onClick={() => handleSearch(inputValue)}
      >
        <span className="text-xs lg:text-sm text-primary-white">Cari</span>
      </button>
    </div>
  );
};

export default InputFieldSearch;
