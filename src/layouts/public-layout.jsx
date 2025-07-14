import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Public Area</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-white shadow mt-auto">
        <div className="container mx-auto px-4 py-4 text-center">
          &copy; {new Date().getFullYear()} Your App
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;