import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/auth-context"
import { ClientLayout } from "@/layouts/client-layout"
import { AdminLayout } from "@/layouts/admin-layout"
import { HomePage } from "@/routes/client/home-page"
import { LoginPage } from "@/routes/auth/login-page"
import { OverviewPage } from "@/routes/admin/overview-page"  
import { ArticlesPage } from "@/routes/admin/articles-page"  
import { DepartmentsPage } from "@/routes/admin/departments-page"  
import { AppointmentsPage } from "@/routes/admin/appointments-page"  
import { CategoriesPage } from "@/routes/admin/categories-page"  
import { DoctorsPage } from "@/routes/admin/doctors-page"  
import { ServicesPage } from "@/routes/admin/services-page"  
import { ServicePricesPage } from "@/routes/admin/service-prices-page"  
import { MenusPage } from "@/routes/admin/menus-page"  
import { UsersPage } from "@/routes/admin/users-page"
import { SettingsPage } from "@/routes/admin/settings-page"  
import { ProtectedRoute } from "@/routes/protected-route"

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
              <Route path="dashboard" element={<OverviewPage />} /> 
              <Route path="articles" element={<ArticlesPage />} />
              <Route path="departments" element={<DepartmentsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="service-prices" element={<ServicePricesPage />} />
              <Route path="menus" element={<MenusPage />} />
              <Route path="settings" element={<SettingsPage />} />
              {/* Routes chỉ dành cho ADMIN */}
              <Route path="appointments" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                <Route index element={<AppointmentsPage />} />
              </Route>
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
