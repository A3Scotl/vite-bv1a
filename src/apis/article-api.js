import { apiHandler } from "@/utils/api-handler";

export const articleApi = {
  getAll: () => apiHandler("get", "/articles"),
  getById: (id) => apiHandler("get", `/articles/${id}`),
  create: (formData) => apiHandler("post", "/articles", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, formData) => apiHandler("put", `/articles/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => apiHandler("delete", `/articles/${id}`),
  hide: (id) => apiHandler("patch", `/articles/${id}/hide`),
};
