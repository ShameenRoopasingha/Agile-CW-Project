import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Layout } from "./layout/layout";
import { AdminLayout } from "./layout/AdminLayout";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { Guidelines } from "./pages/Guidelines";
import { Dashboard } from "./pages/admin/Dashboard";
import { Complaints } from "./pages/admin/Complaints";
import { StaffDirectory } from "./pages/admin/StaffDirectory";
/**
 * Root application component.
 *
 * Defines client-side routes wrapped in the shared Layout shell.
 * - /login  → Login page
 * - /signup → Sign Up page
 * - /reset-password → Reset Password page
 * - /admin/* → Admin section wrapped in AdminLayout
 * - /       → Redirects to /login
 */
export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout><Outlet /></AdminLayout>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="staff" element={<StaffDirectory />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
      
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}