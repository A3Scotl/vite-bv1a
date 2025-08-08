import React, { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoading(false)
      return
    }

    try {
      const decoded = jwtDecode(token)

      // Kiểm tra token hết hạn
      if (decoded.exp * 1000 < Date.now()) {
        toast.warning("Phiên đăng nhập đã hết hạn")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        navigate("/")
        setLoading(false)
        return
      }

      const userData = {
        email: decoded.sub,
        role: decoded.role,
        exp: decoded.exp,
      }

      setUser(userData)
    } catch (err) {
      console.error("Lỗi giải mã token:", err)
      toast.error("Token không hợp lệ")
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData)) 
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    toast.info("Bạn đã đăng xuất")
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
