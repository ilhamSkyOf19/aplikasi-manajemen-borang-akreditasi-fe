import { Bell, PanelRightClose } from "lucide-react";
import { type FC } from "react";
import { cn } from "../../utils/cn";

type Props = {
  title: string;
  handleSidebar: () => void;
  isClose: boolean;
};
const Navbar: FC<Props> = ({ title, handleSidebar, isClose }: Props) => {
  return (
    <nav className="navbar w-full bg-primary-white shadow-sm flex flex-row justify-between items-center">
      <div className="w-full flex flex-row justify-start items-center">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
          onClick={() => handleSidebar()}
        >
          {/* Sidebar toggle icon */}
          <PanelRightClose
            className={cn("size-6", !isClose && "lg:rotate-180")}
          />
        </label>
        <div className="px-4 capitalize lg:text-lg text-sm lg:font-semibold">
          {title}
        </div>
      </div>

      {/* btn bell */}
      <div className="flex flex-row justify-end items-center">
        <button type="button" className="btn btn-square btn-ghost">
          <Bell className="size-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
