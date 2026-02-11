import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import type { PayloadUserType } from "../../models/user.model";
import { useAuthStore } from "../../stores/authStore";

const useDashboardLayout = () => {
  // get loadet
  const user = useLoaderData() as PayloadUserType;

  // set user
  const setUser = useAuthStore((state) => state.setUser);

  // state is close
  const [isClose, setIsClose] = useState<boolean>(false);

  // handle close
  const handleSidebar = () => setIsClose((prev) => !prev);

  // pathname
  const pathname = useLocation().pathname;

  // destructure pathname
  const lastSegment = pathname.split("/").pop();

  const path = isNaN(Number(lastSegment))
    ? lastSegment?.split("-").join(" ")
    : "Ubah Data";

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return { handleSidebar, isClose, path };
};

export default useDashboardLayout;
