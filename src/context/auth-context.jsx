"use client"
import { createContext, useState, useEffect, useCallback } from "react"
import { login as apiLogin, logout as apiLogout } from "@/lib/api"

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Hàm để kiểm tra trạng thái đăng nhập từ localStorage hoặc cookie
  const checkAuthStatus = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user")
      const storedToken = localStorage.getItem("token")
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    try {
      const response = await apiLogin(email, password)
      if (response.success) {
        const userData = response.data.user
        const token = response.data.token
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)
        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error("Login failed:", error)
      return { success: false, message: "An unexpected error occurred during login." }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await apiLogout() // Gọi API logout nếu có
    } catch (error) {
      console.error("Logout API call failed:", error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      setIsLoading(false)
    }
  }, [])

  const hasRole = useCallback(
    (requiredRoles) => {
      if (!user || !user.roles) {
        return false
      }
      const userRoles = user.roles.map((role) => role.toUpperCase())
      return requiredRoles.some((role) => userRoles.includes(role.toUpperCase()))
    },
    [user],
  )

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
