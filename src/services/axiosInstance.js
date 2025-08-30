// src/api/axiosInstance.js
import axios from "axios";
import { baseUrl } from "./config";

// Get token from localStorage or wherever you store it
const getToken = () => {
  return localStorage.getItem("token"); // or sessionStorage or cookie
};

// Create instance
const axiosInstance = axios.create({
  baseURL: `${baseUrl}`, // Change to your base API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to handle params vs data
export const apiRequest = ({ url, method = "GET", params = {}, data = {} }) => {
  return axiosInstance({
    url,
    method,
    params: method === "GET" ? params : {}, // send params only in GET
    data: method !== "GET" ? data : {},       // send body in POST/PUT etc.
  });
};

export default axiosInstance;
