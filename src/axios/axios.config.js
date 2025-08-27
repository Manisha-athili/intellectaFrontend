// import axios from "axios";
// const baseURL = "http://localhost:5000/api"

// export const api = axios.create({
//   baseURL: baseURL,    
//   withCredentials: true,
// });

// const PORT =  5000;
// export const API = axios.create({ baseURL: `http://localhost:${PORT}/api/auth` });


import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;




// General API instance for all routes
export const api = axios.create({
  baseURL: `${baseURL}/api`,  // Add /api here
  withCredentials: true,  
});

// Specific endpoint for auth routes
export const API = axios.create({
  baseURL: `${baseURL}/api/auth`,  // Add /api here too
  withCredentials: true,
});