import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLoaderData, useLocation } from "react-router-dom";
import type { PayloadUserType } from "../../models/user.model";

const useDashboardLayout = () => {
  // state is close
  const [isClose, setIsClose] = useState<boolean>(false);

  // handle close
  const handleSidebar = () => setIsClose((prev) => !prev);

  // pathname
  const pathname = useLocation().pathname;

  // destructure pathname
  const lastSegment = pathname
    .split("/")
    .filter((item) => item !== "" && item !== "dashboard")
    .pop();

  const path = isNaN(Number(lastSegment))
    ? lastSegment?.split("-").join(" ")
    : "Ubah Data";

  // loader
  const user = useLoaderData() as PayloadUserType;

  // set auth context
  const { handleUser } = useAuth();

  useEffect(() => {
    if (user) {
      handleUser(user);
    }
  }, [user]);

  return { handleSidebar, isClose, path };
};

export default useDashboardLayout;
