import { type FC } from "react";
import SidebarDesktop from "../../fragments/SidebarDesktop";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import useDashboardLayout from "./useDashboardLayout";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { cn } from "../../utils/cn";
import { WifiOff } from "lucide-react";

const DashboardLayout: FC = () => {
  const { handleSidebar, isClose, path } = useDashboardLayout();

  // use network status
  const { isOnline } = useNetworkStatus();

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

            {/* toast offline */}
            <div
              className={cn(
                "toast toast-start transition-all duration-200 ease-in-out",
                isClose ? "lg:ml-75" : "lg:ml-16",
                isOnline ? " opacity-0" : "-translate-y-4 opacity-100",
              )}
            >
              <div className="alert alert-warning">
                <WifiOff className="size-5" />
                <span>Tidak ada koneksi internet</span>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* sidebar */}
      <SidebarDesktop isClose={isClose} />
    </div>
  );
};

export default DashboardLayout;
