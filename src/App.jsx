"use client";

import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
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
import NotFoundPage from "@/pages/public/not-found-page";
import ScrollToTop from "@/components/common/scroll-to-top";

import { Toaster } from "sonner";
import HomePage from "@/pages/public/home-page";
import ArticlesPage from "@/pages/public/articles-page";
import ArticleDetailPage from "@/pages/public/article-detail-page";
import DoctorDetailPage from "@/pages/public/doctor-detail-page";
import DepartmentsPage from "@/pages/public/departments-page";
import DepartmentDetailPage from "@/pages/public/department-detail-page";
import ContactPage from "@/pages/public/contact-page";
import ServiceListPage from "@/pages/public/service-list-page";
import ServiceDetailPage from "@/pages/public/service-detail-page";
import ServicePricingPage from "@/pages/public/service-pricing-page";
import ArticlePage from "@/pages/public/articles-page";


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
            element={<ArticlesPage type="tin-tuc-hoat-dong" />}
          />
          <Route
            path="/thong-bao"
            element={<ArticlesPage type="thong-bao" />}
          />
          <Route
            path="/kien-thuc-y-khoa"
            element={<ArticlesPage type="kien-thuc-y-khoa" />}
          />
          <Route
            path="/bai-viet/:slug"
            element={<ArticleDetailPage />}
          />

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
        <Route path="/he-thong-khoa-phong" element={<DepartmentsPage />} />
        <Route path="/he-thong-khoa-phong/:slug" element={<DepartmentDetailPage />} />

        <Route path="/tin-tuc-hoat-dong/:type" element={<ArticlePage />} />

          <Route path="/lien-he" element={<ContactPage />} />

          {/* <Route path="/tin-tuc-hoat-dong" element={<ArticlesPage />} />
          <Route path="/tin-tuc-hoat-dong/:slug" element={<ArticleDetailPage />} /> */}
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

        {/* 404 Page */}
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
