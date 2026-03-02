import { type FC } from "react";

type Props = {
  isLoading?: boolean;
  handleDelete: () => void;
};
const ButtonDeleteTextWithLoading: FC<Props> = ({
  handleDelete,
  isLoading,
}) => {
  return (
    <button
      disabled={isLoading}
      type="button"
      className="btn btn-error bg-error btn-sm lg:btn-md"
      onClick={() => {
        handleDelete();
      }}
    >
      {isLoading ? (
        <span className="loading loading-spinner text-primary-white loading-xs"></span>
      ) : (
        <span className="text-white font-medium">Hapus</span>
      )}
    </button>
  );
};

export default ButtonDeleteTextWithLoading;
