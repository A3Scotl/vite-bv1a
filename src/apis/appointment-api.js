import { apiHandler } from "../utils/api-handler";

// API cho lịch hẹn
export const appointmentApi = {
  /**
   * Tạo lịch hẹn mới
   * @param {object} data - Dữ liệu lịch hẹn (fullName, phone, email, date, timeSlot, note, recaptchaToken)
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  create: (data) => apiHandler("post", "/appointments", data),

  /**
   * Lấy danh sách lịch hẹn
   * @param {object} [params] - Tham số phân trang và lọc (page, size, status, fullName)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAll: (params = {}) => apiHandler("get", "/appointments", params),

  /**
   * Lấy lịch hẹn theo ID
   * @param {number} id - ID lịch hẹn
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  getById: (id) => apiHandler("get", `/appointments/${id}`),

  /**
   * Cập nhật lịch hẹn
   * @param {number} id - ID lịch hẹn
   * @param {object} data - Dữ liệu cập nhật
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  update: (id, data) => apiHandler("put", `/appointments/${id}`, data),

  /**
   * Xóa lịch hẹn
   * @param {number} id - ID lịch hẹn
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  delete: (id) => apiHandler("delete", `/appointments/${id}`),

  /**
   * Ẩn lịch hẹn (đặt trạng thái thành CANCELLED)
   * @param {number} id - ID lịch hẹn
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  hide: (id) => apiHandler("patch", `/appointments/${id}/hide`),
};