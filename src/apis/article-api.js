import { apiHandler } from "@/utils/api-handler";

export const articleApi = {
  getAll: () => apiHandler("get", "/articles"),
  getById: (id) => apiHandler("get", `/articles/${id}`),
  getArticleTypes: () => apiHandler("get", "/articles/article-types"),
  getArticleByType: (type) => apiHandler("get", `/articles/by-type/${type}`),
  create: (formData) => apiHandler("post", "/articles", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, formData) => apiHandler("put", `/articles/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => apiHandler("delete", `/articles/${id}`),
  hide: (id) => apiHandler("patch", `/articles/${id}/hide`),
};
