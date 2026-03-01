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
      className="btn btn-sm lg:btn-md"
      type="button"
      onClick={() => navigate(-1)}
    >
      {label ? label : "Kembali"}
    </button>
  );
};

export default ButtonBackBox;
