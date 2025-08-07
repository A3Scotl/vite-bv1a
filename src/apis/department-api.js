import { apiHandler } from "../utils/api-handler";

// API cho phòng ban
export const departmentApi = {
  /**
   * Lấy danh sách tất cả phòng ban
   * @param {object} [params] - Tham số phân trang và lọc (page, size, name, isActive)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAll: (params = {}) => apiHandler("get", "/departments", params),

  /**
   * Lấy danh sách phòng ban công khai
   * @param {object} [params] - Tham số phân trang (page, size)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAllActive: (params = {}) => apiHandler("get", "/departments/public", params),

  /**
   * Lấy phòng ban theo ID
   * @param {number} id - ID phòng ban
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  getById: (id) => apiHandler("get", `/departments/${id}`),

  /**
   * Lấy phòng ban theo slug
   * @param {string} slug - Slug phòng ban
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  getBySlug: (slug) => apiHandler("get", `/departments/by-slug/${slug}`),

  /**
   * Tạo phòng ban mới
   * @param {FormData} formData - Dữ liệu phòng ban (name, description, thumbnail, isActive)
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  create: (formData) =>
    apiHandler("post", "/departments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Cập nhật phòng ban
   * @param {number} id - ID phòng ban
   * @param {FormData} formData - Dữ liệu cập nhật
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  update: (id, formData) =>
    apiHandler("put", `/departments/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Xóa phòng ban
   * @param {number} id - ID phòng ban
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  delete: (id) => apiHandler("delete", `/departments/${id}`),

  /**
   * Ẩn/hiện phòng ban
   * @param {number} id - ID phòng ban
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  hide: (id) => apiHandler("patch", `/departments/${id}/hide`),
};