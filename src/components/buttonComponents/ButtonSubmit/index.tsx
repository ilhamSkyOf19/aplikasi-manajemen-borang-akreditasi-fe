import { type FC } from "react";
import { cn } from "../../../utils/cn";

type Props = {
  isLoading: boolean;
  label?: string;
};
const ButtonSubmit: FC<Props> = ({ label, isLoading }: Props) => {
  return (
    <button
      className={cn(
        "btn btn-sm lg:btn-md bg-primary-purple relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-primary-black/20 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 before:ease-in-out",
      )}
      type="submit"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs text-primary-white"></span>
      ) : (
        <span className="text-white">{label || "Simpan"}</span>
      )}
    </button>
  );
};

export default ButtonSubmit;
