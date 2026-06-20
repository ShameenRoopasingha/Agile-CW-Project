import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./layout/layout";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";

/**
 * Root application component.
 *
 * Defines client-side routes wrapped in the shared Layout shell.
 * - /login  → Login page
 * - /signup → Sign Up page
 * - /reset-password → Reset Password page
 * - /       → Redirects to /login
 */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  );
}