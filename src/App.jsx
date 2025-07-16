import { Routes, Route } from "react-router-dom"
import { AuthProvider, useAuth } from "@/context/auth-context"
import PublicLayout from "@/layouts/public-layout"
import PrivateLayout from "@/layouts/private-layout"
import Login from "@/pages/public/login-page"
import Dashboard from "@/pages/private/dashboard-page"
import AppointmentPage from "@/pages/private/appointment-page"
import MenusPage from "@/pages/private/menus-page"
import CategoriesPage from "@/pages/private/categories-page"
import DoctorsPage from "@/pages/private/doctors-page"
import DepartmentsPage from "@/pages/private/departments-page"
import ArticlesPage from "@/pages/private/articles-page"
import AccountPage from "@/pages/private/account-page"
import StatisticsPage from "@/pages/private/statistics-page"
import SettingsPage from "@/pages/private/settings-page"
import LoadingPage from "@/pages/common/loading-page"

import { Toaster } from "sonner"
import HomePage from "./pages/public/home-page"

function AppRoutes() {
  const { loading } = useAuth()

  if (loading) return <LoadingPage />

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage/>} /> 
      </Route>
       <Route path="/login" element={<Login />} />
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/appointment" element={<AppointmentPage />} />
        <Route path="/dashboard/menus" element={<MenusPage />} />
        <Route path="/dashboard/categories" element={<CategoriesPage />} />
        <Route path="/dashboard/doctors" element={<DoctorsPage />} />
        <Route path="/dashboard/departments" element={<DepartmentsPage />} />
        <Route path="/dashboard/articles" element={<ArticlesPage />} />
        <Route path="/dashboard/account" element={<AccountPage />} />
        <Route path="/dashboard/statistics" element={<StatisticsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
