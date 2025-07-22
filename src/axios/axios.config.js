import axios from "axios";
const baseURL = "https://intellecta-backend.onrender.com"

export const api = axios.create({
  baseURL: baseURL,    
  withCredentials: true,
});

const PORT =  5000;
// export const API = axios.create({ baseURL: `http://localhost:${PORT}/api/auth` });

export const API = axios.create({ baseURL:"https://intellecta-backend.onrender.com" });
