import { type FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  link?: string;
  handleUpdate?: () => void;
};
const ButtonUpdateText: FC<Props> = ({ link, handleUpdate }) => {
  // navigate
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-info btn-sm lg:btn-md text-white font-medium"
      onClick={() => {
        if (link) {
          navigate(link);
        } else if (handleUpdate) {
          handleUpdate();
        } else {
          null;
        }
      }}
    >
      ubah
    </button>
  );
};

export default ButtonUpdateText;
