import { type FC } from "react";
import ErrorFieldInput from "../../ErrorFieldInput";
import { X } from "lucide-react";
import { type FlagRevisi } from "../../../types/constanst.type";
import { cn } from "../../../utils/cn";

type Props = {
  errorMessage?: string;
  handleChooseFlag: (flag: FlagRevisi | "semua", nama: string) => void;
  isFlagRevisi: { flag: FlagRevisi | "semua"; nama: string }[];
  handleRemoveChooseFlag: () => void;
};
const InputFieldChooseFlagRevisi: FC<Props> = ({
  errorMessage,
  handleChooseFlag,
  isFlagRevisi,
  handleRemoveChooseFlag,
}) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-start items-start",
        errorMessage && "mb-2",
      )}
    >
      <div className="w-full text-base relative flex flex-row justify-between items-center">
        <div className="flex-2 relative">
          <label htmlFor={"nama"} className="capitalize text-sm">
            Flag Revisi
          </label>

          <span className="absolute -top-1 ml-1 text-error">*</span>
        </div>
      </div>

      {/* choose */}
      <div className="w-full flex flex-row justify-start items-start mt-2 gap-3">
        <ButtonChoose
          flag="pic"
          label="PIC"
          handelChooseflag={handleChooseFlag}
          active={isFlagRevisi.some((item) => item.flag === "pic")}
        />

        <ButtonChoose
          flag="kebutuhan_dokumen"
          label="Kebutuhan Dokumen"
          handelChooseflag={handleChooseFlag}
          active={isFlagRevisi.some(
            (item) => item.flag === "kebutuhan_dokumen",
          )}
        />

        <ButtonChoose
          flag="semua"
          label="semua"
          handelChooseflag={handleChooseFlag}
          active={
            isFlagRevisi.some((item) => item.flag === "kebutuhan_dokumen") &&
            isFlagRevisi.some((item) => item.flag === "pic")
          }
        />

        <button
          type="button"
          className="text-sm h-9 flex flex-row justify-center items-center px-3 card shadow-sm hover:bg-primary-black/10 transition-all duration-150 ease-in-out"
          onClick={() => handleRemoveChooseFlag()}
        >
          <span>
            <X className="size-5" />
          </span>
        </button>
      </div>

      {/* error message */}
      <ErrorFieldInput errorMessage={errorMessage} />
    </div>
  );
};

// button choose
type ButtonChooseProps = {
  flag: FlagRevisi | "semua";
  label: string;
  active: boolean;
  handelChooseflag: (flag: FlagRevisi | "semua", nama: string) => void;
};
const ButtonChoose: FC<ButtonChooseProps> = ({
  flag,
  label,
  handelChooseflag,
  active,
}) => {
  return (
    <button
      type="button"
      className={cn(
        "text-sm h-9 flex flex-row justify-center items-center px-3 card shadow-sm",
        !active &&
          "hover:bg-primary-black/10 transition-all duration-150 ease-in-out",
        active && "bg-primary-purple text-primary-white",
      )}
      onClick={() => handelChooseflag(flag, label)}
    >
      {label}
    </button>
  );
};

export default InputFieldChooseFlagRevisi;
