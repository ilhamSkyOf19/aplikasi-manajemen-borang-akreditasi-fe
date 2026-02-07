import { type FC } from "react";
import logoFikom from "../../assets/logos/logo-fikom.webp";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { NAVIGATION_LIST_WD } from "../../utils/constanst";
import { cn } from "../../utils/cn";

const SidebarDesktop: FC = () => {
  // get pathname
  const pathname = useLocation().pathname;

  // use mutation
  const { mutateAsync: _handleLogout } = useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      window.location.href = "/login";
    },

    onError: () => {
      window.location.href = "/login";
    },
  });

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-75">
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
            {NAVIGATION_LIST_WD.map((item, index) => (
              <li key={index}>
                <button
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
                </button>
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default SidebarDesktop;
