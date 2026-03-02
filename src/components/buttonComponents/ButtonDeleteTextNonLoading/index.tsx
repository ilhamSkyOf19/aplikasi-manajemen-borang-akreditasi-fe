import { type FC } from "react";

type Props = {
  handleDelete: () => void;
};
const ButtonDeleteTextNonLoading: FC<Props> = ({ handleDelete }) => {
  return (
    <button
      type="button"
      className="btn btn-error text-white font-medium btn-sm lg:btn-md"
      onClick={() => handleDelete()}
    >
      Hapus
    </button>
  );
};

export default ButtonDeleteTextNonLoading;
