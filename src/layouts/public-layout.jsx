import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
