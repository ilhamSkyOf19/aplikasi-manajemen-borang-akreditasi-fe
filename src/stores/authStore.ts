import { create } from "zustand";
import type { ResponseUserType } from "../models/user.model";

type AuthState = {
  user: ResponseUserType | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: ResponseUserType | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isInitialized: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    }),
}));
