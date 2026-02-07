import { useEffect, type FC } from "react";
import SidebarDesktop from "../../fragments/SidebarDesktop";
import { PanelRightClose } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import type { PayloadUserType } from "../../models/user.model";
import { useAuth } from "../../contexts/AuthContext";

const DashboardLayout: FC = () => {
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
