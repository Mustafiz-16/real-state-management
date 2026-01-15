import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5001/api",
  withCredentials: true,
});

// Request interceptor - auto attach token and set Content-Type
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    
    // For FormData (file uploads), let browser set Content-Type with boundary
    // For other requests, set JSON content type
    if (req.data instanceof FormData) {
      // Delete any Content-Type header - browser will set it with boundary
      delete req.headers["Content-Type"];
    } else if (!req.headers["Content-Type"]) {
      req.headers["Content-Type"] = "application/json";
    }
    
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
