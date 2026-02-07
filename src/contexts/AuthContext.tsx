import { createContext, useContext, useState, type ReactNode } from "react";
import type { PayloadUserType } from "../models/user.model";

type AuthContextType = {
  user: PayloadUserType | null;
  handleUser: (user: PayloadUserType) => void;
  logout: () => void;
};

// default undefined biar aman (wajib pakai provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PayloadUserType | null>(null);

  const handleUser = (user: PayloadUserType) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook biar enak dipakai
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
