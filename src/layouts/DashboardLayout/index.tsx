import { type FC } from "react";
import SidebarDesktop from "../../fragments/SidebarDesktop";
// import NavbarDashboardMobile from "../../fragments/NavbarDashboardMobile";
import { PanelRightClose } from "lucide-react";

const DashboardLayout: FC = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <PanelRightClose className="size-6" />
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <div className="p-4">Page Content</div>
      </div>

      {/* sidebar */}
      <SidebarDesktop />
    </div>
  );
};

export default DashboardLayout;
