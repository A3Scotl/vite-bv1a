import AxiosInstance from "@/util/axios-instance"

export const menuApi = {
  getAll: async () => {
    try {
      const res = await AxiosInstance.get("/menus")
      console.log(res);
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  getById: async (id) => {
    try {
      const res = await AxiosInstance.get(`/menus/${id}`)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  create: async (data) => {
    try {
      const res = await AxiosInstance.post("/menus", data)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  update: async (id, data) => {
    try {
      const res = await AxiosInstance.put(`/menus/${id}`, data)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  delete: async (id) => {
    try {
      const res = await AxiosInstance.delete(`/menus/${id}`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  hide: async (id) => {
    try {
      const res = await AxiosInstance.patch(`/menus/${id}/hide`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
}
