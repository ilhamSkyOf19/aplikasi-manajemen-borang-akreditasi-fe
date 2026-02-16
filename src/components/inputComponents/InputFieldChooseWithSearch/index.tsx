import clsx from "clsx";
import type { FieldValues, UseControllerReturn } from "react-hook-form";
import ErrorFieldInput from "../../ErrorFieldInput";
import { cn } from "../../../utils/cn";
import { GoTriangleDown } from "react-icons/go";
import InputFieldSearch from "../InputFieldSearch";
import { X } from "lucide-react";
import useFieldChooseWithSearch from "./useFieldChooseWithSearch";

type Props<T extends FieldValues = any> = {
  label: string;
  chooseList: { label: string; id: number }[];
  required: boolean;
  controller: UseControllerReturn<T>;
  placeholder: string;
  disabled?: boolean;
  handleSearch: (value: string) => void;
  handleChoose: (value: number) => void;
  handleRemove: (value: number) => void;
  active: number[];
  limit?: number;
  totalData?: number;
  totalPage?: number;
  currentPage?: number;
  setPage?: (page: string) => void;
};

export default function InputFieldChooseWithSearch<
  T extends FieldValues = any,
>({
  chooseList,
  controller,
  label,
  placeholder,
  required,
  disabled,
  handleSearch,
  handleChoose,
  handleRemove,
  active,
  limit,
  totalData,
  totalPage,
  currentPage,
  setPage,
}: Props<T>) {
  // call use
  const {
    buttonRef,
    field,
    fieldState,
    handleToggle,
    showList,
    listPosition,
    listRef,
    handleNextPage,
    handlePrevPage,
  } = useFieldChooseWithSearch(controller, setPage);

  return (
    <div
      className={cn(
        "w-full flex flex-col justify-start items-start relative",
        fieldState.error && "mb-3",
      )}
    >
      {/* label */}
      <div className="w-full text-base relative flex flex-row justify-between items-center">
        <div className="flex-2 relative">
          <label htmlFor={"nama"} className="capitalize text-sm">
            {label}
          </label>

          <span className="absolute -top-1 ml-1 text-error">
            {required && !disabled && "*"}
          </span>
        </div>
      </div>

      <button
        ref={buttonRef}
        type="button"
        className={clsx(
          "mt-2 h-10 flex flex-row justify-between items-center gap-2 border border-primary-black/40 rounded-md w-full focus-within:ring-1 focus-within:ring-primary-purple transition-all duration-300 ease-in-out focus-within:border-primary-purple overflow-hidden px-3",
          fieldState.error && "border-error",
          disabled && "cursor-not-allowed border-primary-black/10",
          field.value ? "text-primary-black" : "text-primary-black/50",
        )}
        onClick={() => handleToggle()}
      >
        {/* place holder */}
        <span className="text-sm">{placeholder}</span>

        {/* arrow down */}
        <GoTriangleDown className="text-primary-black/50" />
      </button>

      {/* modal choose */}
      <div
        ref={listRef}
        className={cn(
          "absolute w-full h-70 bg-white  rounded-md shadow-[0_0_6px_1px_rgba(0,0,0,0.09)] z-40 py-3 flex flex-col justify-start items-start",
          showList && "block",
          !showList && "hidden",
          listPosition === "top" && "bottom-full",
          listPosition === "bottom" && "top-full",
        )}
      >
        {/* search */}
        <div className="w-full px-3">
          <InputFieldSearch
            handleSearch={handleSearch}
            placeholder="Cari anggota"
          />
        </div>

        <div className="w-full h-4/5 flex flex-col justify-start items-start mt-2 overflow-y-auto px-3 gap-1">
          {/* list */}
          {chooseList.length > 0 ? (
            <>
              {chooseList.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-full flex flex-row justify-between items-center hover:bg-primary-black/10  px-3  rounded-sm",
                    active.includes(item.id) && "bg-primary-black/10",
                  )}
                >
                  <button
                    type="button"
                    className="w-full h-full flex flex-row justify-start items-center py-1.5"
                    onClick={() => handleChoose(item.id)}
                    disabled={active.includes(item.id)}
                  >
                    <span className="text-sm">{item.label}</span>
                  </button>

                  {/* remove */}
                  {active.includes(item.id) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.id);
                      }}
                      className="h-full px-1"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
              ))}

              {/* pagination */}
              {totalData && limit && totalPage && currentPage && (
                <div className="w-full flex flex-row justify-between items-center px-3 mt-4">
                  <div className="flex-1 flex flex-row justify-start items-center">
                    {totalPage !== 1 && currentPage > 1 && (
                      <button
                        type="button"
                        className="text-sm text-primary-purple hover:underline p-1"
                        onClick={() => handlePrevPage(currentPage)}
                      >
                        sebelumnya
                      </button>
                    )}
                  </div>

                  <div className="flex-1 flex flex-row justify-end items-center">
                    {totalPage > 1 && currentPage !== totalPage && (
                      <button
                        type="button"
                        className="text-sm text-primary-purple hover:underline p-1"
                        onClick={() => handleNextPage(currentPage, totalPage)}
                      >
                        selanjutnya
                      </button>
                    )}
                  </div>
                </div>
              )}
              {/* button close */}
              <div className="w-full flex flex-row justify-center items-cente py-2">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={handleToggle}
                >
                  Tutup
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-row justify-center items-center text-sm text-primary-black/50">
              Data tidak ditemukan
            </div>
          )}
        </div>
      </div>

      {/* error message */}
      <ErrorFieldInput errorMessage={fieldState.error?.message} />
    </div>
  );
}
