import { type FC } from "react";

type Props = {
  handleCancel: () => void;
};
const ButtonCancelText: FC<Props> = ({ handleCancel }) => {
  return (
    <button
      type="button"
      className="btn btn-sm lg:btn-md font-medium"
      onClick={() => handleCancel()}
    >
      Batal
    </button>
  );
};

export default ButtonCancelText;
