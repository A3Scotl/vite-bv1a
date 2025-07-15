import AxiosInstance from "@/util/axios-instance"

export const articleApi = {
  getAll: async () => {
    try {
      const res = await AxiosInstance.get("/articles")
      console.log(res.data)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  getById: async (id) => {
    try {
      const res = await AxiosInstance.get(`/articles/${id}`)
      return { success: true, data: res.data, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  create: async (formData) => {
    try {
      const res = await AxiosInstance.post("/articles", formData, {
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
      const res = await AxiosInstance.put(`/articles/${id}`, formData, {
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
      const res = await AxiosInstance.delete(`/articles/${id}`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
  hide: async (id) => {
    try {
      const res = await AxiosInstance.patch(`/articles/${id}/hide`)
      return { success: true, message: res.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },
}
