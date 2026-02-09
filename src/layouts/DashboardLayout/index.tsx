import { type FC } from "react";
import SidebarDesktop from "../../fragments/SidebarDesktop";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import useDashboardLayout from "./useDashboardLayout";

const DashboardLayout: FC = () => {
  const { handleSidebar, isClose, path } = useDashboardLayout();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* content */}
      <div className="drawer-content bg-secondary-white">
        {/* Page content here */}
        <div className="w-full max-h-screen overflow-hidden">
          {/* navbar */}
          <Navbar
            handleSidebar={handleSidebar}
            isClose={isClose}
            title={path === "/dashboard" ? "Dashboard" : `${path}`}
          />

          {/* content */}
          <main className="w-full h-screen overflow-y-auto p-4 pb-4">
            <Outlet />
          </main>
        </div>
      </div>

      {/* sidebar */}
      <SidebarDesktop isClose={isClose} />
    </div>
  );
};

export default DashboardLayout;
