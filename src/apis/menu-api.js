import { apiHandler } from "@/utils/api-handler";

export const menuApi = {
  getAll: () => apiHandler("get", "/menus"),
  getById: (id) => apiHandler("get", `/menus/${id}`),
  create: (data) => apiHandler("post", "/menus", data),
  update: (id, data) => apiHandler("put", `/menus/${id}`, data),
  delete: (id) => apiHandler("delete", `/menus/${id}`),
  hide: (id) => apiHandler("patch", `/menus/${id}/hide`),
};
