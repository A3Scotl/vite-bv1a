import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"

export function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return <div className="flex justify-center items-center h-svh">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRoles = user?.roles || []
    const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role.toUpperCase()))

    if (!hasRequiredRole) {
      return <Navigate to="/" replace />
    }
  }

  // Thêm token vào các yêu cầu API
  const token = localStorage.getItem("token")
  if (token) {
    const defaultHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    }
    // Cấu hình fetch global hoặc axios để thêm header Authorization
    window.fetch = new Proxy(window.fetch, {
      apply(target, thisArg, args) {
        const [url, options = {}] = args
        options.headers = { ...defaultHeaders, ...options.headers }
        return target.apply(thisArg, [url, options])
      },
    })
  }

  return <Outlet />
}