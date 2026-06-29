const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data: any = null) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

/**
 * Basic fetch wrapper that adds Authorization headers and handles auto-refresh.
 */
async function apiClient(endpoint: string, options: RequestInit = {}): Promise<any> {
  let token = localStorage.getItem("accessToken");

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  // Check for expired token
  if (data?.message === "Token invalid or expired") {
    // Attempt refresh
    try {
      const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Send httpOnly cookies
      });

      if (!refreshResponse.ok) {
        throw new Error("Refresh failed");
      }

      const refreshData = await refreshResponse.json();
      
      if (refreshData.accessToken) {
        // Save new token
        localStorage.setItem("accessToken", refreshData.accessToken);
        token = refreshData.accessToken;
        
        // Retry original request
        headers.set("Authorization", `Bearer ${token}`);
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });

        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        throw new Error("No access token in refresh response");
      }
    } catch (refreshErr) {
      // Refresh failed, probably need to login again
      localStorage.removeItem("accessToken");
      throw new ApiError(401, "Session expired. Please log in again.");
    }
  }

  if (!response.ok) {
    throw new ApiError(response.status, data?.message || "API request failed", data);
  }

  return data;
}

// ── Auth Endpoints ────────────────────────────────────────────────────────

export async function authMe() {
  return apiClient("/auth/me", { method: "GET" });
}

export async function loginCitizen(payload: any) {
  return apiClient("/citizen/login/login", {
    method: "POST",
    body: JSON.stringify(payload),
    // we also need credentials: include so the refresh token is saved as a cookie?
    // login endpoint returns accessToken and sets refreshToken as httpOnly cookie.
    credentials: "include",
  });
}

export async function register(payload: any) {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyRegisterOtp(payload: any) {
  return apiClient("/auth/otp/register", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", // it sets a cookie
  });
}

export async function forgotPassword(payload: any) {
  return apiClient("/citizen/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyOtp(payload: any) {
  return apiClient("/citizen/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function resetPassword(payload: any) {
  return apiClient("/citizen/reset-password/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
}
