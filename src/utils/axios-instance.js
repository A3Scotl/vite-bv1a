import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

// Create Axios instance
const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add Authorization header
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
AxiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || "Đã xảy ra lỗi không mong muốn";
    console.error(`Lỗi API tại ${error.config.url}:`, message);
    return Promise.reject({ success: false, message });
  }
);

export default AxiosInstance;