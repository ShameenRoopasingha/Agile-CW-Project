import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkLocationAvailability } from "./lib/api";
import { Layout } from "./layout/layout";
import { AdminLayout } from "./layout/AdminLayout";
import { CitizenLayout } from "./layout/CitizenLayout";
import { DriverLayout } from "./layout/DriverLayout";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { Guidelines } from "./pages/Guidelines";
import { Dashboard } from "./pages/admin/Dashboard";
import { Complaints } from "./pages/admin/Complaints";
import { StaffDirectory } from "./pages/admin/StaffDirectory";
import { ResidentDirectory } from "./pages/admin/ResidentDirectory";
import { CitizenDashboard } from "./pages/citizen/Dashboard";
import { MyComplaints } from "./pages/citizen/MyComplaints";
import { CollectionSchedule } from "./pages/citizen/CollectionSchedule";
import { Profile } from "./pages/citizen/Profile";
import { BulkyWaste } from "./pages/citizen/BulkyWaste";
import { AddLocation } from "./pages/citizen/AddLocation";
import { SelectCollectionPoint } from "./pages/citizen/SelectCollectionPoint";
import { DailyRoute } from "./pages/driver/DailyRoute";
import { SpecialPickups } from "./pages/driver/SpecialPickups";
import { ApplyLeave } from "./pages/driver/ApplyLeave";
import { FleetLayout } from "./layout/FleetLayout";
import { FleetDashboard } from "./pages/fleet/Dashboard";
import { DriverManagement } from "./pages/fleet/DriverManagement";
import { Employees } from "./pages/fleet/Employees";
import { FleetManagement } from "./pages/fleet/FleetManagement";
import { LiveTracking } from "./pages/fleet/LiveTracking";
import { RoutesOverview } from "./pages/fleet/RoutesOverview";
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
  
  if (role === "citizen") {
    return <Navigate to="/citizen/dashboard" replace />;
  }
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "driver") return <Navigate to="/driver/daily-route" replace />;
  if (role === "fleet_manager") return <Navigate to="/fleet/dashboard" replace />;
  
  return <Navigate to="/login" replace />;
}

/**
 * Guard to check citizen location and collection point status
 */
function CitizenLocationGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ hasLocation?: boolean; hasCollectionPoint?: boolean } | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkLocationAvailability()
      .then((res) => {
        setStatus(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to check location availability", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#e6e9ef]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#629955] border-t-transparent"></div>
          <p className="font-semibold text-blue-gray-900">Loading citizen data...</p>
        </div>
      </div>
    );
  }

  const path = location.pathname;
  
  if (status) {
    if (status.hasLocation === false && path !== "/citizen/add-location") {
      // Allow moving to select-collection-point if we just added the location (state exists)
      if (path === "/citizen/select-collection-point" && location.state?.collectionPoints) {
         // allow pass through
      } else {
        return <Navigate to="/citizen/add-location" replace />;
      }
    }
    if (status.hasLocation === true && status.hasCollectionPoint === false && path !== "/citizen/select-collection-point") {
      return <Navigate to="/citizen/select-collection-point" replace />;
    }
    if (status.hasLocation === true && status.hasCollectionPoint === true && 
        (path === "/citizen/add-location" || path === "/citizen/select-collection-point")) {
      return <Navigate to="/citizen/dashboard" replace />;
    }
  }

  return <>{children}</>;
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
            <Route path="residents" element={<ResidentDirectory />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* Citizen Routes - Protected */}
        <Route path="/citizen" element={
          <ProtectedRoute allowedRole="citizen" />
        }>
          <Route element={<CitizenLocationGuard><Outlet /></CitizenLocationGuard>}>
            {/* Dashboard pages with sidebar */}
            <Route element={<CitizenLayout><Outlet /></CitizenLayout>}>
              <Route path="dashboard" element={<CitizenDashboard />} />
              <Route path="complaints" element={<MyComplaints />} />
              <Route path="schedule" element={<CollectionSchedule />} />
              <Route path="profile" element={<Profile />} />
              <Route path="bulky-waste" element={<BulkyWaste />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
            
            {/* Simple pages for location setup */}
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="add-location" element={<AddLocation />} />
              <Route path="select-collection-point" element={<SelectCollectionPoint />} />
            </Route>
          </Route>
        </Route>

        {/* Driver Routes - Protected */}
        <Route path="/driver" element={
          <ProtectedRoute allowedRole="driver" />
        }>
          <Route element={<DriverLayout><Outlet /></DriverLayout>}>
            <Route path="daily-route" element={<DailyRoute />} />
            <Route path="special-pickups" element={<SpecialPickups />} />
            <Route path="apply-leave" element={<ApplyLeave />} />
            <Route index element={<Navigate to="daily-route" replace />} />
          </Route>
        </Route>

        {/* Fleet Manager Routes - Protected */}
        <Route path="/fleet" element={
          <ProtectedRoute allowedRole="fleet_manager" />
        }>
          <Route element={<FleetLayout><Outlet /></FleetLayout>}>
            <Route path="dashboard" element={<FleetDashboard />} />
            <Route path="drivers" element={<DriverManagement />} />
            <Route path="employees" element={<Employees />} />
            <Route path="management" element={<FleetManagement />} />
            <Route path="tracking" element={<LiveTracking />} />
            <Route path="routes" element={<RoutesOverview />} />
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