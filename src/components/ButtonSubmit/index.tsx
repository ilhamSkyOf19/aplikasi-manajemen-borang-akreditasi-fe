import { type FC } from "react";
import loadingWhite from "../../assets/animations/loading-white.svg";

type Props = {
  isLoading: boolean;
  label?: string;
};
const ButtonSubmit: FC<Props> = ({ label, isLoading }: Props) => {
  return (
    <button
      className="w-full h-10 bg-primary-purple rounded-md flex justify-center items-center overflow-hidden relative before:absolute before:inset-0 before:bg-primary-black/10 before:opacity-0 before:transition-all before:duration-300 before:ease-in-out hover:before:opacity-100"
      type="submit"
    >
      {isLoading ? (
        <img src={loadingWhite} alt="loading white" className="w-7 h-7" />
      ) : (
        <span className="text-white text-sm font-medium uppercase">
          {label || "Submit"}
        </span>
      )}
    </button>
  );
};

export default ButtonSubmit;
