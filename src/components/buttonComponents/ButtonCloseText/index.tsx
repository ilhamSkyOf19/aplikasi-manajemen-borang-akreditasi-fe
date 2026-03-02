import { type FC } from "react";

type Props = {
  handleClose: () => void;
};
const ButtonCloseText: FC<Props> = ({ handleClose }) => {
  return (
    <button
      className="btn btn-sm lg:btn-md font-medium"
      onClick={() => handleClose()}
    >
      Tutup
    </button>
  );
};

export default ButtonCloseText;
