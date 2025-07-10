import axios from "axios";
const baseURL = "http://localhost:5000/api"

export const api = axios.create({
  baseURL: baseURL,    
  withCredentials: true,
});

const PORT =  5000;
export const API = axios.create({ baseURL: `http://localhost:${PORT}/api/auth` });


