import { type FC } from "react";

type Props = {
  handleNext: () => void;
};
const ButtonNext: FC<Props> = ({ handleNext }) => {
  return (
    <button
      type="button"
      className="btn btn-success btn-sm lg:btn-md font-medium text-primary-white"
      onClick={() => handleNext()}
    >
      Lanjutkan
    </button>
  );
};

export default ButtonNext;
