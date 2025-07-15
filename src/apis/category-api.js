import AxiosInstance from "@/util/axios-instance"

export const categoryApi = {
  getAll: async () => {
    try {
      const res = await AxiosInstance.get("/categories")
      console.log(res)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  getById: async (id) => {
    try {
      const res = await AxiosInstance.get(`/categories/${id}`)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  create: async (data) => {
    try {
      const res = await AxiosInstance.post("/categories", data)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  update: async (id, data) => {
    try {
      const res = await AxiosInstance.put(`/categories/${id}`, data)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  delete: async (id) => {
    try {
      const res = await AxiosInstance.delete(`/categories/${id}`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  hide: async (id) => {
    try {
      const res = await AxiosInstance.patch(`/categories/${id}/hide`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
}
