import { Navigate, Outlet } from "react-router-dom";
import { useAuth, type Role } from "../context/AuthContext";
import { Typography } from "../lib/mt-components";

interface ProtectedRouteProps {
  allowedRole: Role;
}

export function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e6e9ef]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#629955] border-t-transparent"></div>
          <Typography color="blue-gray" className="font-semibold">
            Loading...
          </Typography>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Not logged in, redirect to login page with the return url
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Logged in but not the right role. Redirect to appropriate dashboard.
    if (role === "citizen") return <Navigate to="/citizen/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "driver") return <Navigate to="/driver/daily-route" replace />;
    
    // Fallback if role is completely unknown
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
