import AxiosInstance from "@/util/axios-instance"

export const departmentApi = {
  getAll: async () => {
    try {
      const res = await AxiosInstance.get("/departments")
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  getById: async (id) => {
    try {
      const res = await AxiosInstance.get(`/departments/${id}`)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  create: async (formData) => {
    try {
      const res = await AxiosInstance.post("/departments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  update: async (id, formData) => {
    try {
      const res = await AxiosInstance.put(`/departments/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  delete: async (id) => {
    try {
      const res = await AxiosInstance.delete(`/departments/${id}`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  hide: async (id) => {
    try {
      const res = await AxiosInstance.patch(`/departments/${id}/hide`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
}
