import { apiHandler } from "@/utils/api-handler";

export const departmentApi = {
  getAll: () => apiHandler("get", "/departments"),
  getAllActive: () => apiHandler("get", "/departments/public"),
  getById: (id) => apiHandler("get", `/departments/${id}`),
  getBySlug: (slug) => apiHandler("get", `/departments/by-slug/${slug}`),
  create: (formData) =>
    apiHandler("post", "/departments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    apiHandler("put", `/departments/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => apiHandler("delete", `/departments/${id}`),
  hide: (id) => apiHandler("patch", `/departments/${id}/hide`),
};
