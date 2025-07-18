import { apiHandler } from "@/utils/api-handler";

export const doctorApi = {
  getAll: () => apiHandler("get", "/doctors"),
  getAllActive: () => apiHandler("get", "/doctors/public"),
  getAllPositions: () => apiHandler("get", "/doctors/positions"),
  getById: (id) => apiHandler("get", `/doctors/${id}`),
  getBySlug: (slug) => apiHandler("get", `/doctors/by-slug/${slug}`),
  create: (formData) => apiHandler("post", "/doctors", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, formData) => apiHandler("put", `/doctors/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => apiHandler("delete", `/doctors/${id}`),
  hide: (id) => apiHandler("patch", `/doctors/${id}/hide`),
};
