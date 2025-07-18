import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/public/header";
import Footer from "@/components/public/footer";
import HeroSection from "@/components/public/home/hero-section";
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 bg-white">
            <HeroSection />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
