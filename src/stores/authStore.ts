import { create } from "zustand";
import type { UserRole } from "../types/constanst.type";

type User = {
  id: number;
  nama: string;
  email: string;
  role: UserRole;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
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
      isInitialized: true, // Set true setelah user di-set
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    }),
}));
