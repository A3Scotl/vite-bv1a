"use client";

import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

import PublicLayout from "@/layouts/public-layout";
import PrivateLayout from "@/layouts/private-layout";

import Login from "@/pages/public/auth/login-page";
import HomePage from "@/pages/public/home-page";

import PostDetailPage from   "@/pages/public/detail/post-detail-page";
import DepartmentDetailPage from "@/pages/public/detail/department-detail-page";
import DoctorDetailPage from "@/pages/public/detail/doctor-detail-page";
import ServiceDetailPage from "@/pages/public/detail/service-detail-page";

import DoctorsPage from      "@/pages/public/doctors-page";
import DepartmentsPage from  "@/pages/public/departments-page";
import ContactPage from "@/pages/public/contact-page";
import ServiceListPage from "@/pages/public/service-list-page";

import ServicePricingPage from "@/pages/public/service-pricing-page";
import PostPage from "@/pages/public/post-page";

import Dashboard from "@/pages/private/dashboard-page";
import Appointment from "@/pages/private/appointment";
import Doctors from "@/pages/private/doctors";
import Departments from "@/pages/private/departments";
import Post from "@/pages/private/post";
import Account from "@/pages/private/account";
import Statistics from "@/pages/private/statistics";
import Setting from "@/pages/private/settings";

import NotFoundPage from "@/pages/public/not-found/not-found-page";

import LoadingPage from "@/pages/common/loading-page";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "sonner";

function AppRoutes() {
  const { loading } = useAuth();
  useScrollToTop();

  if (loading) return <LoadingPage />;

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/tin-tuc-hoat-dong"
            element={<PostPage type="tin-tuc-hoat-dong" />}
          />
          <Route path="/thong-bao" element={<PostPage type="thong-bao" />} />
          <Route
            path="/kien-thuc-y-khoa"
            element={<PostPage type="kien-thuc-y-khoa" />}
          />
          
          <Route
            path="/tong-quan-benh-vien"
            element={<PostPage type="tong-quan-benh-vien" />}
          />
          <Route path="/lich-su-hinh-thanh" element={<PostPage type="lich-su-hinh-thanh" />} />
          <Route
            path="/so-do-to-chuc"
            element={<PostPage type="so-do-to-chuc" />}
          />
          <Route
            path="/nghien-cuu-khoa-hoc"
            element={<PostPage type="ban-lanh-dao" />}
          />
           <Route path="/hop-tac-quoc-te" element={<PostPage type="hop-tac-quoc-te" />} />
          <Route
            path="/dao-tao-thuc-hanh"
            element={<PostPage type="dao-tao-thuc-hanh" />}
          />
          <Route
            path="/ban-lanh-dao"
            element={<PostPage type="ban-lanh-dao" />}
          />
          
          <Route path="/bai-viet/:slug" element={<PostDetailPage />} />
          <Route path="/doi-ngu-chuyen-gia" element={<DoctorsPage />} />
          <Route
            path="/doi-ngu-chuyen-gia/:slug"
            element={<DoctorDetailPage />}
          />
          <Route path="/he-thong-khoa-phong" element={<DepartmentsPage />} />
          <Route
            path="/he-thong-khoa-phong/:slug"
            element={<DepartmentDetailPage />}
          />
          <Route path="/dich-vu" element={<ServiceListPage />} />
          <Route path="/dich-vu/:slug" element={<ServiceDetailPage />} />
          <Route path="/bang-gia-dich-vu" element={<ServicePricingPage />} />
          <Route path="/tin-tuc-hoat-dong/:type" element={<PostPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/appointment" element={<Appointment />} />
          <Route path="/dashboard/doctors" element={<Doctors />} />
          <Route path="/dashboard/departments" element={<Departments />} />
          <Route path="/dashboard/posts" element={<Post />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/statistics" element={<Statistics />} />
          <Route path="/dashboard/settings" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollToTop />
    </>
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
