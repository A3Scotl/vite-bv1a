import { apiHandler } from "../utils/api-handler";

// API cho bài viết
export const postApi = {
  /**
   * Lấy danh sách tất cả bài viết
   * @param {object} [params] - Tham số phân trang và lọc (page, size, title, status, type)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAll: (params = {}) => apiHandler("get", "/posts", params),

  /**
   * Lấy danh sách bài viết công khai
   * @param {object} [params] - Tham số phân trang (page, size)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getAllActive: (params = {}) => apiHandler("get", "/posts/public", params),

  /**
   * Lấy bài viết theo ID
   * @param {number} id - ID bài viết
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  getById: (id) => apiHandler("get", `/posts/${id}`),

  /**
   * Lấy bài viết theo loại
   * @param {string} type - Loại bài viết (ARTICLE, NEWS, NOTIFICATION)
   * @param {object} [params] - Tham số phân trang (page, size)
   * @returns {Promise<{success: boolean, data: {content: object[], pageable: object}, message: string}>}
   */
  getByType: (type, params = {}) => apiHandler("get", `/posts/by-type/${type}`, params),

  /**
   * Lấy danh sách loại bài viết
   * @returns {Promise<{success: boolean, data: string[], message: string}>}
   */
  getArticleTypes: () => apiHandler("get", "/posts/post-types"),

  /**
   * Lấy bài viết theo slug
   * @param {string} slug - Slug bài viết
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  getBySlug: (slug) => apiHandler("get", `/posts/by-slug/${slug}`),

  /**
   * Tạo bài viết mới
   * @param {FormData} formData - Dữ liệu bài viết (title, content, type, thumbnail, status)
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  create: (formData) =>
    apiHandler("post", "/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Cập nhật bài viết
   * @param {number} id - ID bài viết
   * @param {FormData} formData - Dữ liệu cập nhật
   * @returns {Promise<{success: boolean, data: object, message: string}>}
   */
  update: (id, formData) =>
    apiHandler("put", `/posts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Xóa bài viết
   * @param {number} id - ID bài viết
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  delete: (id) => apiHandler("delete", `/posts/${id}`),

  /**
   * Ẩn/hiện bài viết
   * @param {number} id - ID bài viết
   * @returns {Promise<{success: boolean, data: null, message: string}>}
   */
  hide: (id) => apiHandler("patch", `/posts/${id}/hide`),
};