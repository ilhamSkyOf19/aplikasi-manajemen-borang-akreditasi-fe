import { create } from "zustand";
import type { PayloadUserType } from "../models/user.model";

type AuthState = {
  user: PayloadUserType | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: PayloadUserType | null) => void;
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
