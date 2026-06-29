import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Layout } from "./layout/layout";
import { AdminLayout } from "./layout/AdminLayout";
import { CitizenLayout } from "./layout/CitizenLayout";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { Guidelines } from "./pages/Guidelines";
import { Dashboard } from "./pages/admin/Dashboard";
import { Complaints } from "./pages/admin/Complaints";
import { StaffDirectory } from "./pages/admin/StaffDirectory";
import { CitizenDashboard } from "./pages/citizen/Dashboard";
import { MyComplaints } from "./pages/citizen/MyComplaints";
import { CollectionSchedule } from "./pages/citizen/CollectionSchedule";
import { Profile } from "./pages/citizen/Profile";
import { WasteGuide } from "./pages/citizen/WasteGuide";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

/**
 * Root index component that redirects based on authentication role
 */
function RootRedirect() {
  const { isAuthenticated, role, isLoading } = useAuth();
  
  if (isLoading) return null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (role === "citizen") return <Navigate to="/citizen/dashboard" replace />;
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  
  return <Navigate to="/login" replace />;
}

/**
 * Root application component.
 */
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Root Redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Admin Routes - Protected */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin" />
        }>
          <Route element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="staff" element={<StaffDirectory />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* Citizen Routes - Protected */}
        <Route path="/citizen" element={
          <ProtectedRoute allowedRole="citizen" />
        }>
          <Route element={<CitizenLayout><Outlet /></CitizenLayout>}>
            <Route path="dashboard" element={<CitizenDashboard />} />
            <Route path="complaints" element={<MyComplaints />} />
            <Route path="schedule" element={<CollectionSchedule />} />
            <Route path="profile" element={<Profile />} />
            <Route path="guide" element={<WasteGuide />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>
        
        {/* Public Routes */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </AuthProvider>
  );
}