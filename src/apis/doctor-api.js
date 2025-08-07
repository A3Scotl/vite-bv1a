import { apiHandler } from "../utils/api-handler";

// API cho bác sĩ
export const doctorApi = {
  /**
   * Lấy danh sách tất cả bác sĩ
   * @param {object} [params] - Tham số phân trang và lọc (page, size, fullName, isActive)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAll: (params = {}) => apiHandler("get", "/doctors", params),

  /**
   * Lấy danh sách bác sĩ công khai
   * @param {object} [params] - Tham số phân trang (page, size)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAllActive: (params = {}) => apiHandler("get", "/doctors/public", params),

  /**
   * Lấy danh sách bác sĩ theo slug phòng ban
   * @param {string} departmentSlug - Slug phòng ban
   * @param {object} [params] - Tham số phân trang (page, size)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAllByDepartmentSlug: (departmentSlug, params = {}) =>
    apiHandler("get", `/doctors/public/${departmentSlug}`, params),

  /**
   * Lấy danh sách chức vụ bác sĩ
   * @returns {Promise<{success: boolean, data: string[], message: string}>}
   */
  getAllPositions: () => apiHandler("get", "/doctors/positions"),

  /**
   * Lấy bác sĩ theo ID
   * @param {number} id - ID bác sĩ
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  getById: (id) => apiHandler("get", `/doctors/${id}`),

  /**
   * Lấy bác sĩ theo slug
   * @param {string} slug - Slug bác sĩ
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  getBySlug: (slug) => apiHandler("get", `/doctors/by-slug/${slug}`),

  /**
   * Tạo bác sĩ mới
   * @param {FormData} formData - Dữ liệu bác sĩ (fullName, departmentId, description, avatarFile, position, isActive)
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  create: (formData) =>
    apiHandler("post", "/doctors", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Cập nhật bác sĩ
   * @param {number} id - ID bác sĩ
   * @param {FormData} formData - Dữ liệu cập nhật
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  update: (id, formData) =>
    apiHandler("put", `/doctors/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Xóa bác sĩ
   * @param {number} id - ID bác sĩ
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  delete: (id) => apiHandler("delete", `/doctors/${id}`),

  /**
   * Ẩn/hiện bác sĩ
   * @param {number} id - ID bác sĩ
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  hide: (id) => apiHandler("patch", `/doctors/${id}/hide`),
};