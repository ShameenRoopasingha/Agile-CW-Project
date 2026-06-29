import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authMe } from "../lib/api";

export interface UserData {
  _id: string;
  premisesNo: string;
  name: string;
  HomeTown: string;
  Landmark: string;
  isRegistered: boolean;
  email: string;
}

export type Role = "citizen" | "admin" | "driver" | null;

interface AuthContextType {
  user: UserData | null;
  role: Role;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData?: UserData, roleData?: Role) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setRole(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authMe();
      if (response && response.success && response.data) {
        setUser(response.data);
        const normalizedRole = response.model?.toString().toLowerCase();
        setRole(normalizedRole as Role);
      } else {
        throw new Error("Invalid auth data");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("accessToken");
      setUser(null);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (token: string, userData?: UserData, roleData?: Role) => {
    localStorage.setItem("accessToken", token);
    
    if (userData && roleData) {
       setUser(userData);
       setRole(roleData);
    } else {
       await checkAuth();
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setRole(null);
    // Use window.location instead of useNavigate because this is outside a router
    window.location.href = "/login";
  };

  const value = {
    user,
    role,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
