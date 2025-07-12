import { Navigate, Outlet } from "react-router-dom"
import  {useAuth}  from "@/hooks/use-auth"

export function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    // Có thể hiển thị một spinner hoặc loading state ở đây
    return <div className="flex justify-center items-center h-svh">Loading...</div>
  }

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang login
    return <Navigate to="/auth/login" replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRoles = user?.roles || []
    const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role.toUpperCase()))

    if (!hasRequiredRole) {
      // Nếu không có quyền, chuyển hướng đến trang không có quyền truy cập hoặc trang chủ
      return <Navigate to="/" replace /> // Hoặc một trang 403 Forbidden
    }
  }

  // Nếu đã xác thực và có quyền, hiển thị nội dung của route con
  return <Outlet />
}
