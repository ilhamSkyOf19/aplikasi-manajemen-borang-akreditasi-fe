import { Navigate } from "react-router-dom";
import type { FC, JSX } from "react";
import { AuthService } from "../../services/auth.service";
import { useQuery } from "@tanstack/react-query";

type Props = {
  children: JSX.Element;
};
const GuardLoginPage: FC<Props> = ({ children }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => AuthService.me(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return null;

  if (user?.meta.statusCode === 200) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuardLoginPage;
