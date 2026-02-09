import { Plus } from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type Props = {
  bgColor?: string;
  textColor?: string;
  label?: string;
  link: string;
};
const ButtonAdd: FC<Props> = ({ bgColor, label, textColor, link }) => {
  return (
    <Link
      to={link}
      type="button"
      className={cn(
        " rounded-full w-10 h-10 flex justify-center items-center hover-overlay lg:w-auto lg:rounded-md lg:px-3 lg:gap-2",
        bgColor ? bgColor : "bg-primary-purple",
      )}
    >
      <Plus className="size-5 text-primary-white lg" />

      <span
        className={cn(
          "text-sm hidden lg:block",
          textColor ? textColor : "text-primary-white",
        )}
      >
        {label ? label : "Tambah"}
      </span>
    </Link>
  );
};

export default ButtonAdd;
