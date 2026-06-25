/**
 * API Service Layer
 * ─────────────────────────────────────────────────────────────────────────
 * Centralised Axios client for all backend communication.
 * Base URL: http://localhost:5000
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// ── Auth: Registration ──────────────────────────────────────────────────

/** Step 1 – Register and request OTP */
export const registerRequestOtp = (payload: {
  premisesNo: string;
  name: string;
  HomeTown: string;
  Landmark: string;
  email: string;
  password: string;
}) => api.post("/api/auth/register", payload);

/** Step 2 – Verify the OTP sent during registration */
export const registerVerifyOtp = (payload: {
  email: string;
  otp: string;
}) => api.post("/api/auth/otp/register", payload);

// ── Auth: Citizen Login ─────────────────────────────────────────────────

/** Login with email + password */
export const citizenLogin = (payload: {
  email: string;
  password: string;
}) => api.post("/api/citizen/login", payload);

// ── Auth: Password Reset ────────────────────────────────────────────────

/** Request a password-reset OTP */
export const forgotPassword = (payload: {
  email: string;
}) => api.post("/api/citizen/forgot-password", payload);

/** Reset the password using the OTP */
export const resetPassword = (payload: {
  email: string;
  otp: string;
  password: string;
}) => api.post("/api/citizen/reset-password/reset-password", payload);

export default api;
