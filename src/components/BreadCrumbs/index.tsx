import { type FC } from "react";
import { splitPathname } from "../../utils/splitPathname";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

type Props = {
  pathname: string;
  link: string[];
};
const BreadCrumbs: FC<Props> = ({ pathname, link }) => {
  // split pathname
  const path = splitPathname(pathname);

  const navigate = useNavigate();

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {path.map((item, index) => (
          <li key={index}>
            <button
              disabled={index === path.length - 1}
              className={cn(
                "hover:underline text-xs lg:text-sm",
                index === path.length - 1 && "font-medium text-primary-purple",
              )}
              onClick={() => {
                navigate(link[index]);
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
