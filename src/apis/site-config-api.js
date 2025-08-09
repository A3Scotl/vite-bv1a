import { apiHandler } from "../utils/api-handler";

export const siteConfigApi = {
  /**
   * Lấy thông tin cấu hình website
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  get: () => apiHandler("get", "/site-config"),

  /**
   * Cập nhật cấu hình website
   * @param {FormData} formData - Dữ liệu cấu hình (address, phoneNumber, email, workingHours, logo, banners[])
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  update: (formData) =>
    apiHandler("put", "/site-config", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
