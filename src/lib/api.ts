const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const ENDPOINTS = {
  authMe: import.meta.env.VITE_API_ENDPOINT_AUTH_ME || "/auth/me",
  loginCitizen: import.meta.env.VITE_API_ENDPOINT_LOGIN_CITIZEN || "/citizen/login/login",
  register: import.meta.env.VITE_API_ENDPOINT_REGISTER || "/auth/register",
  verifyRegisterOtp: import.meta.env.VITE_API_ENDPOINT_VERIFY_REGISTER_OTP || "/auth/otp/register",
  authRefresh: import.meta.env.VITE_API_ENDPOINT_AUTH_REFRESH || "/auth/refresh",

  forgotPassword: import.meta.env.VITE_API_ENDPOINT_FORGOT_PASSWORD || "/citizen/forgot-password",
  verifyOtp: import.meta.env.VITE_API_ENDPOINT_VERIFY_OTP || "/citizen/verify-otp",
  resetPassword: import.meta.env.VITE_API_ENDPOINT_RESET_PASSWORD || "/citizen/reset-password/reset-password",

  locationAvailability: import.meta.env.VITE_API_ENDPOINT_LOCATION_AVAILABILITY || "/citizen/location-availability",
  addMyLocation: import.meta.env.VITE_API_ENDPOINT_ADD_MY_LOCATION || "/citizen/mylocation",
  saveCollectionPoint: import.meta.env.VITE_API_ENDPOINT_SAVE_COLLECTION_POINT || "/citizen/mycollectionpointid",

  adminStaff: import.meta.env.VITE_API_ENDPOINT_ADMIN_STAFF || "/admin/staff",
  adminStaffSearch: import.meta.env.VITE_API_ENDPOINT_ADMIN_STAFF_SEARCH || "/admin/staff/search",
  adminStaffCount: import.meta.env.VITE_API_ENDPOINT_ADMIN_STAFF_COUNT || "/admin/staff/count",
  adminStaffAll: import.meta.env.VITE_API_ENDPOINT_ADMIN_STAFF_ALL || "/admin/staff/all",

  staffLeaveApply: import.meta.env.VITE_API_ENDPOINT_STAFF_LEAVE_APPLY || "/staff/leave/apply",
  staffLeaveHistory: import.meta.env.VITE_API_ENDPOINT_STAFF_LEAVE_HISTORY || "/staff/leave/history",

  adminResident: import.meta.env.VITE_API_ENDPOINT_ADMIN_RESIDENT || "/admin/resident",
  adminResidentSearch: import.meta.env.VITE_API_ENDPOINT_ADMIN_RESIDENT_SEARCH || "/admin/resident/search",
  adminResidentCount: import.meta.env.VITE_API_ENDPOINT_ADMIN_RESIDENT_COUNT || "/admin/resident/count",
  adminResidentAll: import.meta.env.VITE_API_ENDPOINT_ADMIN_RESIDENT_ALL || "/admin/resident/all",

  addComplaint: import.meta.env.VITE_API_ENDPOINT_ADD_COMPLAINT || "/citizen/myComplaint",
  getComplaintHistory: import.meta.env.VITE_API_ENDPOINT_GET_COMPLAINT_HISTORY || "/citizen/myComplaint/history",

  adminComplaintAll: import.meta.env.VITE_API_ENDPOINT_ADMIN_COMPLAINT_ALL || "/admin/complaint/all",
  adminComplaintSearch: import.meta.env.VITE_API_ENDPOINT_ADMIN_COMPLAINT_SEARCH || "/admin/complaint/search",
  adminComplaintFilter: import.meta.env.VITE_API_ENDPOINT_ADMIN_COMPLAINT_FILTER || "/admin/complaint/filter",
  adminComplaintStatus: import.meta.env.VITE_API_ENDPOINT_ADMIN_COMPLAINT_STATUS || "/admin/complaint",

  // RouteG
  routegGenerate: import.meta.env.VITE_API_ENDPOINT_ROUTEG_GENERATE || "/routes/generate",
  routegStats: import.meta.env.VITE_API_ENDPOINT_ROUTEG_STATS || "/routes/stats",
  routegWeek: import.meta.env.VITE_API_ENDPOINT_ROUTEG_WEEK || "/routes/week",
  routegDay: import.meta.env.VITE_API_ENDPOINT_ROUTEG_DAY || "/routes/day",
  routegRoute: import.meta.env.VITE_API_ENDPOINT_ROUTEG_ROUTE || "/routes",
  routegPlans: import.meta.env.VITE_API_ENDPOINT_ROUTEG_PLANS || "/routes/plans",
  routegTruckAssignments: import.meta.env.VITE_API_ENDPOINT_ROUTEG_TRUCK_ASSIGNMENTS || "/truck-assignments"
};

const ROUTEG_API_BASE_URL = import.meta.env.VITE_ROUTEG_API_BASE_URL || "http://localhost:3000/api";

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
async function apiClient(endpoint: string, options: RequestInit = {}, baseUrl: string = API_BASE_URL): Promise<any> {
  let token = localStorage.getItem("accessToken");

  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(`${baseUrl}${endpoint}`, {
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
      const refreshResponse = await fetch(`${API_BASE_URL}${ENDPOINTS.authRefresh}`, {
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
        response = await fetch(`${baseUrl}${endpoint}`, {
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
  return apiClient(ENDPOINTS.authMe, { method: "GET" });
}

export async function loginCitizen(payload: any) {
  return apiClient(ENDPOINTS.loginCitizen, {
    method: "POST",
    body: JSON.stringify(payload),
    // we also need credentials: include so the refresh token is saved as a cookie?
    // login endpoint returns accessToken and sets refreshToken as httpOnly cookie.
    credentials: "include",
  });
}

export async function register(payload: any) {
  return apiClient(ENDPOINTS.register, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyRegisterOtp(payload: any) {
  return apiClient(ENDPOINTS.verifyRegisterOtp, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include", // it sets a cookie
  });
}

export async function forgotPassword(payload: any) {
  return apiClient(ENDPOINTS.forgotPassword, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyOtp(payload: any) {
  return apiClient(ENDPOINTS.verifyOtp, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function resetPassword(payload: any) {
  return apiClient(ENDPOINTS.resetPassword, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
}

// ── Citizen Endpoints ──────────────────────────────────────────────────────

export async function checkLocationAvailability() {
  return apiClient(ENDPOINTS.locationAvailability, { method: "GET" });
}

export async function addMyLocation(payload: { residentLatitude: number; residentLongitude: number }) {
  return apiClient(ENDPOINTS.addMyLocation, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function saveCollectionPoint(payload: { collectionPointId: string }) {
  return apiClient(ENDPOINTS.saveCollectionPoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Admin Staff Endpoints ──────────────────────────────────────────────────

export async function addStaff(payload: any) {
  return apiClient(ENDPOINTS.adminStaff, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateStaff(id: string, payload: any) {
  return apiClient(`${ENDPOINTS.adminStaff}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteStaff(id: string) {
  return apiClient(`${ENDPOINTS.adminStaff}/${id}`, {
    method: "DELETE",
  });
}

export async function searchStaff(query: string) {
  return apiClient(`${ENDPOINTS.adminStaffSearch}?q=${encodeURIComponent(query)}`, {
    method: "GET",
  });
}

export async function getStaffCount() {
  return apiClient(ENDPOINTS.adminStaffCount, {
    method: "GET",
  });
}

export async function getAllStaff() {
  return apiClient(ENDPOINTS.adminStaffAll, {
    method: "GET",
  });
}

// ── Staff Leave Endpoints ──────────────────────────────────────────────────

export async function applyLeave(payload: any) {
  return apiClient(ENDPOINTS.staffLeaveApply, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getLeaveHistory() {
  return apiClient(ENDPOINTS.staffLeaveHistory, {
    method: "GET",
  });
}

// ── Admin Resident Endpoints ───────────────────────────────────────────────

export async function addResident(payload: any) {
  return apiClient(ENDPOINTS.adminResident, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateResident(id: string, payload: any) {
  return apiClient(`${ENDPOINTS.adminResident}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function searchResident(query: string) {
  return apiClient(`${ENDPOINTS.adminResidentSearch}?q=${encodeURIComponent(query)}`, {
    method: "GET",
  });
}

export async function getResidentCount() {
  return apiClient(ENDPOINTS.adminResidentCount, {
    method: "GET",
  });
}

export async function getAllResidents() {
  return apiClient(ENDPOINTS.adminResidentAll, {
    method: "GET",
  });
}

// ── Complaint Endpoints ────────────────────────────────────────────────────

export async function addComplaint(formData: FormData) {
  return apiClient(ENDPOINTS.addComplaint, {
    method: "POST",
    body: formData,
  });
}

export async function getComplaintHistory() {
  return apiClient(ENDPOINTS.getComplaintHistory, {
    method: "GET",
  });
}

export async function getAllComplaints() {
  return apiClient(ENDPOINTS.adminComplaintAll, {
    method: "GET",
  });
}

export async function searchComplaints(query: string) {
  return apiClient(`${ENDPOINTS.adminComplaintSearch}?q=${encodeURIComponent(query)}`, {
    method: "GET",
  });
}

export async function filterComplaints(status?: string, type?: string, date?: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (type) params.append("type", type);
  if (date) params.append("date", date);
  return apiClient(`${ENDPOINTS.adminComplaintFilter}?${params.toString()}`, {
    method: "GET",
  });
}

export async function updateComplaintStatus(id: string, status: string) {
  return apiClient(`${ENDPOINTS.adminComplaintStatus}/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

// ── RouteG Endpoints ───────────────────────────────────────────────────────

export async function generateWeeklyRoutes(payload: { weekStartDate: string }) {
  return apiClient(ENDPOINTS.routegGenerate, {
    method: "POST",
    body: JSON.stringify(payload),
  }, ROUTEG_API_BASE_URL);
}

export async function getWeeklyRouteStats(weekStartDate: string) {
  return apiClient(`${ENDPOINTS.routegStats}/${weekStartDate}`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

export async function getAllRoutesForWeek(weekStartDate: string) {
  return apiClient(`${ENDPOINTS.routegWeek}/${weekStartDate}`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

export async function deleteAllRoutesForWeek(weekStartDate: string) {
  return apiClient(`${ENDPOINTS.routegWeek}/${weekStartDate}`, {
    method: "DELETE",
  }, ROUTEG_API_BASE_URL);
}

export async function getRoutesForDay(weekStartDate: string, dayOfWeek: number) {
  return apiClient(`${ENDPOINTS.routegDay}/${weekStartDate}/${dayOfWeek}`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

export async function getSingleRoute(routeId: string) {
  return apiClient(`${ENDPOINTS.routegRoute}/${routeId}`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

export async function getRouteCoordinates(routeId: string) {
  return apiClient(`${ENDPOINTS.routegRoute}/${routeId}/coordinates`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

export async function getRouteCollectionPoints(routeId: string) {
  return apiClient(`${ENDPOINTS.routegRoute}/${routeId}/collection-points`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

// ── Route Plan Endpoints ───────────────────────────────────────────────────

export async function getAllRoutePlans() {
  return apiClient(ENDPOINTS.routegPlans, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

export async function getRoutePlan(planId: string) {
  return apiClient(`${ENDPOINTS.routegPlans}/${planId}`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

export async function getRoutesForPlan(planId: string) {
  return apiClient(`${ENDPOINTS.routegPlans}/${planId}/routes`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}

// ── Truck Assignments Endpoints ────────────────────────────────────────────

export async function randomlyAssignTrucks(planId: string) {
  return apiClient(`${ENDPOINTS.routegTruckAssignments}/random/${planId}`, {
    method: "POST",
  }, ROUTEG_API_BASE_URL);
}

export async function manuallyAssignTruck(payload: { routeId: string; truckId: string }) {
  return apiClient(`${ENDPOINTS.routegTruckAssignments}/manual`, {
    method: "POST",
    body: JSON.stringify(payload),
  }, ROUTEG_API_BASE_URL);
}

export async function unassignTruck(routeId: string) {
  return apiClient(`${ENDPOINTS.routegTruckAssignments}/${routeId}`, {
    method: "DELETE",
  }, ROUTEG_API_BASE_URL);
}

export async function unassignAllTrucks(planId: string) {
  return apiClient(`${ENDPOINTS.routegTruckAssignments}/plan/${planId}`, {
    method: "DELETE",
  }, ROUTEG_API_BASE_URL);
}

export async function getAvailableTrucks(planId: string, dayOfWeek: number) {
  return apiClient(`${ENDPOINTS.routegTruckAssignments}/available/${planId}/${dayOfWeek}`, {
    method: "GET",
  }, ROUTEG_API_BASE_URL);
}
