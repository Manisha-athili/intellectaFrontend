import axios from "axios";

const baseURL = "https://intellecta-backend.onrender.com";

// General API instance (use this for most API requests)
export const api = axios.create({
  baseURL,
  withCredentials: true,  // include cookies if needed
});

// Specific endpoint (e.g., for auth routes only)
export const API = axios.create({
  baseURL: "https://intellecta-backend.onrender.com/api",  // <-- add /api
  withCredentials: true,
});
