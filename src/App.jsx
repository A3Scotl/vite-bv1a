import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth-context";
import PublicLayout from "@/layouts/public-layout";
import PrivateLayout from "@/layouts/private-layout";
import Login from "@/pages/public/login-page";
import Dashboard from "@/pages/private/dashboard-page";
import Appointment from "@/pages/private/appointment";
import Doctors from "@/pages/private/doctors";
import Departments from "@/pages/private/departments";
import Articles from "@/pages/private/articles";
import Account from "@/pages/private/account";
import Statistics from "@/pages/private/statistics";
import Setting from "@/pages/private/settings";

import LoadingPage from "@/pages/common/loading-page";
import DoctorsPage from "@/pages/public/doctors-page";

import { Toaster } from "sonner";
import HomePage from "@/pages/public/home-page";
import DoctorDetailPage from "@/pages/public/doctor-detail-page";
import DepartmentsPage from "@/pages/public/departments-page";
import DepartmentDetailPage from "@/pages/public/department-detail-page";
import ContactPage from "@/pages/public/contact-page";

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) return <LoadingPage />;

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/doi-ngu-chuyen-gia" element={<DoctorsPage />} />
        <Route path="/doi-ngu-chuyen-gia/:slug" element={<DoctorDetailPage />} />

        <Route path="/he-thong-khoa-phong" element={<DepartmentsPage />} />
        <Route path="/he-thong-khoa-phong/:slug" element={<DepartmentDetailPage />} />

        <Route path="/lien-he" element={<ContactPage />} />

        {/* <Route path="/tin-tuc-hoat-dong" element={<DepartmentsP />} />
        <Route path="/tin-tuc-hoat-dong/:slug" element={<DepartmentsP />} /> */}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/appointment" element={<Appointment />} />
        <Route path="/dashboard/doctors" element={<Doctors />} />
        <Route path="/dashboard/departments" element={<Departments />} />
        <Route path="/dashboard/articles" element={<Articles />} />
        <Route path="/dashboard/account" element={<Account />} />
        <Route path="/dashboard/statistics" element={<Statistics />} />
        <Route path="/dashboard/settings" element={<Setting />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
