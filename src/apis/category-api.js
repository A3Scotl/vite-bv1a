import { apiHandler } from "@/utils/api-handler";

export const categoryApi = {
  getAll: () => apiHandler("get", "/categories"),
  getById: (id) => apiHandler("get", `/categories/${id}`),
  create: (data) => apiHandler("post", "/categories", data),
  update: (id, data) => apiHandler("put", `/categories/${id}`, data),
  delete: (id) => apiHandler("delete", `/categories/${id}`),
  hide: (id) => apiHandler("patch", `/categories/${id}/hide`),
};
