import { useState } from "react";
import { useLocation } from "react-router-dom";

const useDashboardLayout = () => {
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

  return { handleSidebar, isClose, path };
};

export default useDashboardLayout;
