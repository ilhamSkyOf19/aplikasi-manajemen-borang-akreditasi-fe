import { useEffect, type FC } from "react";
import SidebarDesktop from "../../fragments/SidebarDesktop";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import type { PayloadUserType } from "../../models/user.model";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";

const DashboardLayout: FC = () => {
  // pathname
  const pathname = useLocation().pathname;

  // destructure pathname
  const path = pathname
    .split("/")
    .filter((item) => item !== "" && item !== "dashboard")
    .pop()
    ?.split("-")
    .join(" ");

  // loader
  const user = useLoaderData() as PayloadUserType;

  // set auth context
  const { handleUser } = useAuth();

  useEffect(() => {
    if (user) {
      handleUser(user);
    }
  }, [user]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* content */}
      <div className="drawer-content bg-secondary-white">
        {/* Page content here */}
        <div className="w-full max-h-screen overflow-hidden">
          {/* navbar */}
          <Navbar title={pathname === "/dashboard" ? "Dashboard" : `${path}`} />

          {/* content */}
          <main className="w-full h-screen overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>

      {/* sidebar */}
      <SidebarDesktop />
    </div>
  );
};

export default DashboardLayout;
