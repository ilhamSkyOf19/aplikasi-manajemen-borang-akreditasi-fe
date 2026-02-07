import { type FC } from "react";
import logoFikom from "../../assets/logos/logo-fikom.webp";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import useSidebarDekstop from "./useSidebarDesktop";
import { LogOut } from "lucide-react";

const SidebarDesktop: FC = () => {
  // call use dashboard
  const { isNavigation, pathname, handleLogout } = useSidebarDekstop();

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start justify-between bg-base-200 is-drawer-close:w-16 is-drawer-open:w-75">
        {/* Sidebar content here */}
        <ul className="menu w-full grow space-y-1">
          {/* logo */}
          <li>
            <div
              className={cn(
                "is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-transparent",
              )}
            >
              {/* logo */}
              <img
                src={logoFikom}
                alt="logo polisi"
                className="my-1.5 inline-block w-12 mb-2"
              />

              {/* heading */}
              <span className="is-drawer-close:hidden text-primary-black font-semibold text-base border-b border-primary-purple pb-2">
                AMBARA
              </span>
            </div>
          </li>
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
