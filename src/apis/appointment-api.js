import { apiHandler } from "@/utils/api-handler";

export const appointmentApi = {
  create: (data) => apiHandler("post", "/appointments", data),
  getAll: () => apiHandler("get", "/appointments"),
};
