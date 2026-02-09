import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useToastAnimation = (
  duration: number = 2500,
  fadeOut: number = 500,
) => {
  const navigate = useNavigate();
  const [isAnimationOut, setIsAnimationOut] = useState(false);
  const location = useLocation();

  // state toast
  const [isToast, setIsToast] = useState<string | undefined>(
    location.state?.status,
  );

  // reset toast
  useEffect(() => {
    if (location.state?.status) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  // set animation out
  useEffect(() => {
    if (isToast) {
      const timer = setTimeout(() => {
        setIsAnimationOut(true);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isToast, duration]);

  // delete state toast
  useEffect(() => {
    if (isAnimationOut) {
      const timer = setTimeout(() => {
        setIsToast(undefined);
      }, fadeOut);

      return () => clearTimeout(timer);
    }
  }, [isAnimationOut, location.pathname, fadeOut]);

  // set toast
  const handleSetToast = (toast: string) => {
    setIsToast(toast);
  };

  return { isToast, handleSetToast, isAnimationOut };
};
