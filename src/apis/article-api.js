import { apiHandler } from "@/utils/api-handler";

export const articleApi = {
  getAll: () => apiHandler("get", "/articles"),
  getAllActive: () => apiHandler("get", "/articles/public"),
  getById: (id) => apiHandler("get", `/articles/${id}`),
  getByType: (type) => apiHandler("get", `/articles/by-type/${type}`),
  getArticleTypes: () => apiHandler("get", "/articles/article-types"),
  getArticleByType: (type) => apiHandler("get", `/articles/by-type/${type}`),
  getArticleBySlug: (slug) => apiHandler("get", `/articles/by-slug/${slug}`),
  create: (formData) => apiHandler("post", "/articles", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, formData) => apiHandler("put", `/articles/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => apiHandler("delete", `/articles/${id}`),
  hide: (id) => apiHandler("patch", `/articles/${id}/hide`),
};
