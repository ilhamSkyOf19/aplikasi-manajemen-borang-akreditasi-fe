import { Bell, PanelRightClose } from "lucide-react";
import { type FC } from "react";
import { cn } from "../../utils/cn";
import useNavbar from "./useNavbar";

type Props = {
  title: string;
  handleSidebar: () => void;
  isClose: boolean;
};
const Navbar: FC<Props> = ({ title, handleSidebar, isClose }: Props) => {
  // call use
  const { dataNotifikasi, isLoadingNotifikasi } = useNavbar();

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
        <div className="px-4 font-medium capitalize lg:text-lg text-sm lg:font-semibold">
          {title}
        </div>
      </div>

      {/* btn bell */}
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row justify-center items-center relative">
          {dataNotifikasi?.data &&
            dataNotifikasi?.data?.filter((data) => !data.isRead).length > 0 &&
            !isLoadingNotifikasi && (
              <div className="flex flex-col top-2 right-2.5 w-2 h-2 justify-center items-center bg-error absolute rounded-full" />
            )}
          <button type="button" className="btn btn-square btn-ghost">
            <Bell className="size-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
