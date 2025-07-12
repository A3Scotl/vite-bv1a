import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import  {AuthProvider}  from "@/context/auth-context";
import  {ClientLayout}  from "@/layouts/client-layout"
import  {AdminLayout}  from "@/layouts/admin-layout"
import  {HomePage}  from "@/routes/client/home-page"
import  {LoginPage}  from "@/routes/auth/login-page"
import  {DashboardPage}  from "@/routes/admin/dashboard-page"
import  {UsersPage}  from "@/routes/admin/users-page"
import  {ProtectedRoute}  from "@/routes/protected-route"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<HomePage />} />
            {/* Thêm các route client khác ở đây */}
            <Route path="services" element={<div>Our Services Page</div>} />
            <Route path="contact" element={<div>Contact Us Page</div>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN", "ROLE_EDITOR"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="posts" element={<div>Admin Posts Page</div>} />
              <Route path="settings" element={<div>Admin Settings Page</div>} />
              {/* Route chỉ dành cho ADMIN */}
              <Route path="users" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                <Route index element={<UsersPage />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={
              <div className="flex min-h-svh items-center justify-center text-2xl font-bold">404 - Page Not Found</div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
