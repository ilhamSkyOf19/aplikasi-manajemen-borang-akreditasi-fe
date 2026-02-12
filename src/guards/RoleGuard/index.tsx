import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import type { FC, JSX } from "react";
import type { UserRole } from "../../types/constanst.type";

type Props = {
  children: JSX.Element;
  allowedRoles: UserRole[];
};

const RoleGuard: FC<Props> = ({ children, allowedRoles }) => {
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  // TUNGGU sampai initialized
  if (!isInitialized) {
    return null;
  }

  // Setelah initialized, cek user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role tidak sesuai
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default RoleGuard;
