"use client";

import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { AnimatePresence, motion } from "framer-motion";
import { SiteConfigProvider } from "@/context/site-config-context";
import PublicLayout from "@/layouts/public-layout";
import PrivateLayout from "@/layouts/private-layout";

import LoadingPage from "@/pages/common/loading-page";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "sonner";
import PageTransition from "@/components/common/page-transition"
// Lazy load tất cả page
const Login = lazy(() => import("@/pages/public/auth/login-page"));
const HomePage = lazy(() => import("@/pages/public/home-page"));
const PostDetailPage = lazy(() => import("@/pages/public/detail/post-detail-page"));
const DepartmentDetailPage = lazy(() => import("@/pages/public/detail/department-detail-page"));
const DoctorDetailPage = lazy(() => import("@/pages/public/detail/doctor-detail-page"));
const ServiceDetailPage = lazy(() => import("@/pages/public/detail/service-detail-page"));
const DoctorsPage = lazy(() => import("@/pages/public/doctors-page"));
const DepartmentsPage = lazy(() => import("@/pages/public/departments-page"));
const ContactPage = lazy(() => import("@/pages/public/contact-page"));
const ServiceListPage = lazy(() => import("@/pages/public/service-list-page"));
const ServicePricingPage = lazy(() => import("@/pages/public/service-pricing-page"));
const PostPage = lazy(() => import("@/pages/public/post-page"));
const Dashboard = lazy(() => import("@/pages/private/dashboard-page"));
const SỉteConfig = lazy(() => import("@/pages/private/site-config.jsx"));
const Appointment = lazy(() => import("@/pages/private/appointment"));
const Doctors = lazy(() => import("@/pages/private/doctors"));
const Departments = lazy(() => import("@/pages/private/departments"));
const Post = lazy(() => import("@/pages/private/post"));
const Account = lazy(() => import("@/pages/private/account"));
const Statistics = lazy(() => import("@/pages/private/statistics"));
const Setting = lazy(() => import("@/pages/private/settings"));
const NotFoundPage = lazy(() => import("@/pages/public/not-found/not-found-page"));

function AppRoutes() {
  const { loading } = useAuth();
  const location = useLocation();
  useScrollToTop();

  if (loading) return <LoadingPage />;
  return (
    <Suspense fallback={<LoadingPage />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/tin-tuc-hoat-dong" element={<PageTransition><PostPage type="tin-tuc-hoat-dong" /></PageTransition>} />
            <Route path="/thong-bao" element={<PageTransition><PostPage type="thong-bao" /></PageTransition>} />
            <Route path="/kien-thuc-y-khoa" element={<PageTransition><PostPage type="kien-thuc-y-khoa" /></PageTransition>} />
            <Route path="/tong-quan-benh-vien" element={<PageTransition><PostPage type="tong-quan-benh-vien" /></PageTransition>} />
            <Route path="/lich-su-hinh-thanh" element={<PageTransition><PostPage type="lich-su-hinh-thanh" /></PageTransition>} />
            <Route path="/so-do-to-chuc" element={<PageTransition><PostPage type="so-do-to-chuc" /></PageTransition>} />
            <Route path="/nghien-cuu-khoa-hoc" element={<PageTransition><PostPage type="ban-lanh-dao" /></PageTransition>} />
            <Route path="/hop-tac-quoc-te" element={<PageTransition><PostPage type="hop-tac-quoc-te" /></PageTransition>} />
            <Route path="/dao-tao-thuc-hanh" element={<PageTransition><PostPage type="dao-tao-thuc-hanh" /></PageTransition>} />
            <Route path="/ban-lanh-dao" element={<PageTransition><PostPage type="ban-lanh-dao" /></PageTransition>} />
            <Route path="/bai-viet/:slug" element={<PageTransition><PostDetailPage /></PageTransition>} />
            <Route path="/doi-ngu-chuyen-gia" element={<PageTransition><DoctorsPage /></PageTransition>} />
            <Route path="/doi-ngu-chuyen-gia/:slug" element={<PageTransition><DoctorDetailPage /></PageTransition>} />
            <Route path="/he-thong-khoa-phong" element={<PageTransition><DepartmentsPage /></PageTransition>} />
            <Route path="/he-thong-khoa-phong/:slug" element={<PageTransition><DepartmentDetailPage /></PageTransition>} />
            <Route path="/dich-vu" element={<PageTransition><ServiceListPage /></PageTransition>} />
            <Route path="/dich-vu/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path="/bang-gia-dich-vu" element={<PageTransition><ServicePricingPage /></PageTransition>} />
            <Route path="/tin-tuc-hoat-dong/:type" element={<PageTransition><PostPage /></PageTransition>} />
            <Route path="/lien-he" element={<PageTransition><ContactPage /></PageTransition>} />
          </Route>

          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/dashboard/appointment" element={<PageTransition><Appointment /></PageTransition>} />
            <Route path="/dashboard/doctors" element={<PageTransition><Doctors /></PageTransition>} />
            <Route path="/dashboard/departments" element={<PageTransition><Departments /></PageTransition>} />
            <Route path="/dashboard/posts" element={<PageTransition><Post /></PageTransition>} />
            <Route path="/dashboard/account" element={<PageTransition><Account /></PageTransition>} />
            <Route path="/dashboard/statistics" element={<PageTransition><Statistics /></PageTransition>} />
            <Route path="/dashboard/settings" element={<PageTransition><SỉteConfig /></PageTransition>} />
          </Route>
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
        <ScrollToTop />
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <AuthProvider>
        <Toaster position="top-right" richColors closeButton duration={3000} />
        <AppRoutes />
      </AuthProvider>
    </SiteConfigProvider>
  );
}
