"use client";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

import PublicLayout from "@/layouts/public-layout";
import PrivateLayout from "@/layouts/private-layout";

import LoadingPage from "@/pages/common/loading-page";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "sonner";

// Lazy load all pages
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
  useScrollToTop();

  if (loading) return <LoadingPage />;

  return (
    <Suspense fallback={<LoadingPage />}>
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
    </Suspense>
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
