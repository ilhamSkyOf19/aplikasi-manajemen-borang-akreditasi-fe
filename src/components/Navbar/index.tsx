import { Bell, PanelRightClose } from "lucide-react";
import { type FC } from "react";
import { cn } from "../../utils/cn";
import useNavbar from "./useNavbar";
import { Link } from "react-router-dom";
import SkeletonPemberitahuan from "../skeletonComponents/SkeletonPemberitahuan";
import DataEmpty from "../DataEmpty";
import ComponentCardPemberitahuan from "../ComponentCardPemberitahuan";

type Props = {
  title: string;
  handleSidebar: () => void;
  isClose: boolean;
};
const Navbar: FC<Props> = ({ title, handleSidebar, isClose }: Props) => {
  // call use
  const {
    dataNotifikasi,
    isLoadingNotifikasi,
    handleIsRead,
    isPendingIsRead,
    handleShowModalNotifikasi,
    handleCloseModalNotifikasi,
    isModalNotifikasi,
    modalNotifikasiRef,
    modalButtonRef,
  } = useNavbar();

  return (
    <nav className="navbar w-full bg-primary-white shadow-sm flex flex-row justify-between items-center relative">
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
          <button
            ref={modalButtonRef}
            type="button"
            className="btn btn-square btn-ghost"
            onClick={() => handleShowModalNotifikasi()}
          >
            <Bell className="size-5" />
          </button>
        </div>
      </div>

      {/* modal notifikasi */}
      <div
        ref={modalNotifikasiRef}
        className={cn(
          "absolute top-[95%] bg-primary-white card shadow w-80 lg:w-110 max-h-125 overflow-auto z-50 right-4 lg:right-12 pt-2.5 transition-all duration-150 ease-in-out origin-top-right",
          isModalNotifikasi ? "scale-100" : "scale-0 ",
        )}
      >
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full flex flex-row justify-between items-center px-4">
            {/* title */}
            <h3 className="text-sm lg:text-base text-primary-black font-medium">
              Pemberitahuan
            </h3>

            {/* button selengkapnya */}
            <Link
              to={"/dashboard/pemberitahuan"}
              className="text-primary-purple text-xs hover:underline"
              onClick={() => handleCloseModalNotifikasi()}
            >
              Selengkapnya
            </Link>
          </div>

          {isLoadingNotifikasi ? (
            <SkeletonPemberitahuan />
          ) : dataNotifikasi && dataNotifikasi?.data?.length > 0 ? (
            <div className="w-full flex flex-col justify-start items-start">
              {dataNotifikasi?.data?.map((item) => (
                <ComponentCardPemberitahuan
                  handleCloseModalNotifikasi={handleCloseModalNotifikasi}
                  item={item}
                  handleIsRead={handleIsRead}
                  isPending={isPendingIsRead}
                  key={item.id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <DataEmpty
                title="Tidak ada pemberitahuan terbaru"
                description="Tidak ada pemberitahuan terbaru untuk saat ini, silahkan cek selengkapnya."
                iconData={Bell}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
