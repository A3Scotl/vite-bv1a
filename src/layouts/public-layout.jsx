import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";

const PublicLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Bệnh viện 1A</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bệnh viện 1A — Quản trị viên |{" "}
          {!user ? (
            <Link to="/login" className="hover:text-primary underline">
              Đăng nhập
            </Link>
          ) : (
            <Link to="/dashboard" className="hover:text-primary underline">
              Dashboard
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
