import AxiosInstance from "@/utils/axios-instance";

/**
 * Hàm dùng chung gọi API
 * @param {'get' | 'post' | 'put' | 'delete' | 'patch'} method - HTTP method
 * @param {string} url - Endpoint
 * @param {any} [data] - Body hoặc params (tuỳ loại method)
 * @param {object} [config] - Axios config (headers, etc.)
 */
export const apiHandler = async (method, url, data = null, config = {}) => {
  try {
    const isGetLike = method === "get" || method === "delete";
    const response = isGetLike
      ? await AxiosInstance[method](url, { ...config, params: data })
      : await AxiosInstance[method](url, data, config);

    return {
      success: true,
      data: response.data,
      message: response.data?.message || "Success",
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message || "Error",
    };
  }
};
