import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppointmentDialog from "../public/home/appointment-dialog";
import {
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  Stethoscope,
  Calendar,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("vi");

  const navigationItems = [
    { name: "Xét nghiệm", href: "/tests" },
    { name: "Phòng khám", href: "/clinic" },
    { name: "Lấy mẫu tại nhà", href: "/home-service" },
    { name: "Tiêm chủng", href: "/vaccination" },
    { name: "Bảo hiểm", href: "/insurance" },
    { name: "Khuyến mãi", href: "/promotions" },
    { name: "Phòng ban", href: "/departments" },
    { name: "Bác sĩ", href: "/doctors" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-blue-600 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Hotline: 1900 0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@benhvien1a.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Mở cửa: 7:00 - 20:00 (Thứ 2 - CN)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
                className="hover:text-blue-200 transition-colors"
              >
                {language === "vi" ? "EN" : "VI"}
              </button>
              <div className="flex space-x-2">
                <Facebook className="w-4 h-4 hover:text-blue-200 cursor-pointer" />
                <Instagram className="w-4 h-4 hover:text-blue-200 cursor-pointer" />
                <Youtube className="w-4 h-4 hover:text-blue-200 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  Bệnh viện 1A
                </h1>
                <p className="text-sm text-gray-600">
                  Chăm sóc sức khỏe toàn diện
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group text-sm"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <AppointmentDialog>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt lịch ngay
                </Button>
              </AppointmentDialog>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <AppointmentDialog>
                  <Button className="bg-blue-600 hover:bg-blue-700 mt-4 w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Đặt lịch ngay
                  </Button>
                </AppointmentDialog>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
