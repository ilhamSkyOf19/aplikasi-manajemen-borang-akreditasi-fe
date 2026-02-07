import { type FC } from "react";
import logoFikom from "../../assets/logos/logo-fikom.webp";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import useSidebarDekstop from "./useSidebarDesktop";
import { LogOut, PanelLeftClose } from "lucide-react";
import useHasScroll from "../../hooks/useHasScroll";

const SidebarDesktop: FC = () => {
  // call use dashboard
  const { isNavigation, pathname, handleLogout } = useSidebarDekstop();

  // use has scroll
  const { divRef, hasScroll } = useHasScroll();
  return (
    <div className="drawer-side is-drawer-close:overflow-visible border-r border-primary-black/10 z-50">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div
        ref={divRef}
        className={cn(
          "flex h-screen overflow-hidden overflow-y-auto flex-col items-start justify-between bg-primary-white is-drawer-close:w-16 lg:is-drawer-open:w-75 is-drawer-open:w-70",
          hasScroll && "is-drawer-close:w-18",
        )}
      >
        {/* logo */}
        <div
          className={cn(
            "is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-transparent w-full flex flex-row justify-start items-center gap-2 px-2",
          )}
        >
          {/* logo */}
          <img
            src={logoFikom}
            alt="logo polisi"
            className="my-1.5 inline-block w-12 mb-2"
          />

          {/* heading */}
          <span className="is-drawer-close:hidden text-primary-black font-semibold text-base border-b flex-1 border-primary-purple pb-2">
            AMBARA
          </span>

          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            {/* Sidebar toggle icon */}
            <PanelLeftClose className="size-6" />
          </label>
        </div>
        {/* Sidebar content here */}
        <ul className="menu w-full grow space-y-1">
          <ul className="w-full mt-4 space-y-1">
            {/* List item */}
            {isNavigation.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className={cn(
                    "is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-primary-purple group",
                    pathname === item.link && "bg-primary-purple",
                  )}
                  data-tip={item.label}
                >
                  {/* Home icon */}
                  <item.icon
                    className={cn(
                      "my-1.5 inline-block size-6 group-hover:text-primary-white transition-all duration-150 ease-in-out",
                      pathname === item.link && "text-primary-white",
                    )}
                  />
                  <span
                    className={cn(
                      "is-drawer-close:hidden group-hover:text-primary-white capitalize transition-all duration-150 ease-in-out",
                      pathname === item.link && "text-primary-white",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}

            {/* line */}
            <div className="w-full h-px bg-primary-black" />
            {/* logout */}
            <li className="">
              <button
                type="button"
                className={cn(
                  "is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-primary-purple group",
                )}
                data-tip="keluar"
                onClick={() => handleLogout()}
              >
                {/* Home icon */}
                <LogOut
                  className={cn(
                    "my-1.5 inline-block size-6 group-hover:text-primary-white transition-all duration-150 ease-in-out",
                  )}
                />
                <span
                  className={cn(
                    "is-drawer-close:hidden group-hover:text-primary-white capitalize transition-all duration-150 ease-in-out",
                  )}
                >
                  keluar
                </span>
              </button>
            </li>
          </ul>
        </ul>

        {/* button logout */}
        <div className="menu w-full grow space-y-1"></div>
      </div>
    </div>
  );
};

export default SidebarDesktop;
