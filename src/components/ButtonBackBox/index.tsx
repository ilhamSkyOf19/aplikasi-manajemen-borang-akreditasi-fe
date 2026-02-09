import { type FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  label?: string;
};
const ButtonBackBox: FC<Props> = ({ label }: Props) => {
  //   navigate
  const navigate = useNavigate();
  return (
    <button
      className="w-full h-10 bg-gray-300 rounded-md flex justify-center items-center hover:bg-gray-400 transition-all duration-300 ease-in-out"
      type="submit"
      onClick={() => navigate(-1)}
    >
      <span className="text-primary-black text-sm font-medium uppercase">
        {label || "KEMBALI"}
      </span>
    </button>
  );
};

export default ButtonBackBox;
