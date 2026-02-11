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

  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  //   set user
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  // logout
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
