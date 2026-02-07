import clsx from "clsx";
import {
  Building2,
  GalleryThumbnails,
  LayoutDashboardIcon,
  LogOut,
  Menu,
  Newspaper,
  Trophy,
  UsersRound,
  X,
} from "lucide-react";
import React, { useState, type FC } from "react";
import logoFikom from "../../assets/logos/logo-fikom.webp";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useClickOutside from "../../hooks/useCLickOutSide";

// navigation
const navigationList: { label: string; link: string }[] = [
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "calon santri",
    link: "/dashboard/calon-santri",
  },
  {
    label: "alumni",
    link: "/dashboard/alumni",
  },
  {
    label: "ustad",
    link: "/dashboard/ustad",
  },
  {
    label: "fasilitas",
    link: "/dashboard/fasilitas",
  },
  {
    label: "berita & artikel",
    link: "/dashboard/berita-artikel",
  },
  {
    label: "banner",
    link: "/dashboard/banner",
  },
  {
    label: "pamflet",
    link: "/dashboard/pamflet",
  },
  {
    label: "prestasi",
    link: "/dashboard/prestasi",
  },
];

const NavbarDashboardMobile: FC = () => {
  // state active sidebar
  const [isActiveSidebar, setIsActiveSidebar] = useState<boolean>(false);

  //   ref sidebar
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  //   ref button bars
  const buttonBarsRef = React.useRef<HTMLButtonElement>(null);

  //   use click outside
  useClickOutside({
    refs: [sidebarRef, buttonBarsRef],
    onOutsideClick: () => setIsActiveSidebar(false),
  });

  //   pathname
  const pathname = useLocation().pathname;

  // use mutation
  const { mutateAsync: handleLogout } = useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      window.location.href = "/login";
    },
    onError: () => {
      window.location.href = "/login";
    },
  });

  return (
    <>
      <div className="fixed top-0 bg-primary-blue h-14 z-40 left-0 right-0 flex flex-row justify-between items-center px-4 md:hidden">
        {/* button bars */}
        <button
          ref={buttonBarsRef}
          type="button"
          onClick={() => setIsActiveSidebar(true)}
          className="p-2"
        >
          <Menu size={24} className="text-primary-white" />
        </button>

        {/* label */}
        <h2 className="text-primary-white text-lg font-semibold">Dashboard</h2>
      </div>

      {/* layer */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-primary-black/40 pointer-events-none opacity-0 md:hidden",
          isActiveSidebar && "opacity-100",
        )}
      />

      {/* component sidebar */}
      <div
        ref={sidebarRef}
        className={clsx(
          "fixed h-screen overflow-y-scroll left-0 w-[65vw] z-50 bg-secondary-blue transition-all duration-300 ease-in-out flex flex-col justify-start items-start md:hidden py-3 pb-32",
          isActiveSidebar ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* header */}
        <div className="w-full flex flex-row justify-start items-center relative px-4 pb-4 before:content-[''] before:left-4 before:right-4 before:absolute before:h-0.5 before:rounded-full before:bg-primary-white before:bottom-0">
          {/* logo */}
          <img src={logoFikom} alt="logo sipontren" className="w-10" />

          {/* label */}
          <h2 className="text-primary-white text-base font-semibold ml-2">
            Sippontren
          </h2>

          {/* button close */}
          <button
            type="button"
            className="absolute right-2 text-primary-white"
            onClick={() => setIsActiveSidebar(false)}
          >
            <X />
          </button>
        </div>

        {/* navigation */}
        <div className="w-full flex flex-col justify-start items-start mt-8">
          {navigationList.map((item, index) => (
            <ButtonNavigation
              key={index}
              label={item.label}
              link={item.link}
              active={
                item.link === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.link) && pathname !== "/dashboard"
              }
              line={index === navigationList.length - 1}
              handleClose={() => setIsActiveSidebar(false)}
            />
          ))}
          {/* button logout */}
          <button
            type="button"
            onClick={() => handleLogout()}
            className={clsx(
              "w-full flex flex-row items-center gap-4 py-6 px-7 transition-all duration-200 ease-in-out hover:bg-primary-blue justify-start",
            )}
          >
            <LogOut size={24} className="text-primary-white" />

            {/* label */}
            <span className={clsx("text-primary-white text-base uppercase")}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

// button navigatin
type ButtonNavigationProps = {
  label: string;
  link: string;
  active: boolean;
  line: boolean;
  handleClose: () => void;
};

const ButtonNavigation: FC<ButtonNavigationProps> = ({
  label,
  link,
  active,
  handleClose,
  line,
}) => {
  return (
    <Link
      onClick={() => handleClose()}
      to={link}
      className={clsx(
        "w-full flex flex-row items-center gap-4 py-6 px-7 transition-all duration-200 ease-in-out  justify-start",
        active ? "bg-primary-blue" : "hover:bg-primary-blue",
        line && "border-b border-primary-white/20",
      )}
    >
      {/* icon */}
      {label === "dashboard" && (
        <LayoutDashboardIcon size={24} className="text-primary-white" />
      )}
      {(label === "calon santri" ||
        label === "ustad" ||
        label === "alumni") && (
        <UsersRound size={24} className="text-primary-white" />
      )}

      {label === "fasilitas" && (
        <Building2 size={24} className="text-primary-white" />
      )}
      {label === "berita & artikel" && (
        <Newspaper size={24} className="text-primary-white" />
      )}
      {(label === "banner" || label === "pamflet") && (
        <GalleryThumbnails size={24} className="text-primary-white" />
      )}
      {label === "prestasi" && (
        <Trophy size={24} className="text-primary-white" />
      )}
      {/* label */}
      <span className={clsx("text-primary-white text-base uppercase")}>
        {label}
      </span>
    </Link>
  );
};

export default NavbarDashboardMobile;
