import AxiosInstance from "@/util/axios-instance";

/**
 * Gửi yêu cầu đăng nhập
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, token?: string, message?: string }>}
 */
export const loginApi = async (credentials) => {
  try {
    const res = await AxiosInstance.post("/auth/login", credentials);

    if (res.success && res.data?.token) {
      return {
        success: true,
        token: res.data.token,
        message: res.message,
      };
    }

    return {
      success: false,
      message: res.message || "Đăng nhập thất bại",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Đăng nhập thất bại",
    };
  }
};

/**
 * Gửi yêu cầu đăng xuất (nếu backend cần)
 */
export const logoutApi = async () => {
  try {
    const res = await AxiosInstance.post("/auth/logout");
    return {
      success: true,
      message: res.message || "Đăng xuất thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Đăng xuất thất bại",
    };
  }
};
