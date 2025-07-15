import axios from "axios";
import axiosRetry from "axios-retry";

const API_BASE_URL = "http://localhost:8080/api/v1";

// Axios instance
const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Chỉ retry với các method an toàn (GET, HEAD)
axiosRetry(AxiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000, // 1s, 2s, 3s
  retryCondition: (error) => {
    const method = error?.config?.method?.toLowerCase();
    return ["get", "head"].includes(method); // chỉ retry GET và HEAD
  },
});

// Authorization token nếu có
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

// Xử lý lỗi response chung
AxiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Đã xảy ra lỗi không mong muốn";
    console.error(`Lỗi API tại ${error.config?.url}:`, message);
    return Promise.reject({ success: false, message });
  }
);

export default AxiosInstance;
