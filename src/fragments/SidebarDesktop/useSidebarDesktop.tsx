import { useEffect, useState, type ElementType } from "react";
import {
  NAVIGATION_LIST_KAPRODI,
  NAVIGATION_LIST_TIM_AKREDITASI,
  NAVIGATION_LIST_WD,
} from "../../utils/constanst";
import { AuthService } from "../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const useSidebarDekstop = () => {
  // get auth context
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // navigate
  const navigate = useNavigate();

  // state navigasi
  const [isNavigation, setIsNavigation] = useState<
    { label: string; link: string; icon: ElementType }[]
  >([]);
  // get pathname
  const pathname = useLocation().pathname;

  // use mutation
  const { mutateAsync: handleLogout } = useMutation({
    mutationFn: async () => AuthService.logout(),
    onSuccess: async () => {
      logout();
      navigate("/login", { replace: true });
    },

    onError: async () => {
      navigate("/login", { replace: true });
    },
  });

  // set is navigasi
  useEffect(() => {
    if (user?.role) {
      switch (user.role) {
        case "wakil_dekan_1":
          setIsNavigation(NAVIGATION_LIST_WD);
          break;

        case "tim_akreditasi":
          setIsNavigation(NAVIGATION_LIST_TIM_AKREDITASI);
          break;

        case "kaprodi":
          setIsNavigation(NAVIGATION_LIST_KAPRODI);
          break;

        default:
          setIsNavigation([]);
          break;
      }
    }
  }, [user?.role]);

  return { isNavigation, pathname, handleLogout };
};

export default useSidebarDekstop;
