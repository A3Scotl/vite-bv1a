import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppointmentDialog from "./home/appointment-dialog";
import { navigationItems } from "@/context/header-navigation-context";
import { handleFetch } from "@/utils/fetch-helper";
import { articleApi } from "@/apis/article-api";

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
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("vi");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [articleTypes, setArticleTypes] = useState([]);

  useEffect(() => {
    fetchArticleTypes();
  }, []);

  const toggleDropdown = async (name) => {
    if (name === "Tin tức" && openDropdown !== name) {
      await fetchArticleTypes();
    }
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const fetchArticleTypes = async () => {
    await handleFetch({
      apiCall: articleApi.getArticleTypes,

      setData: (data) => {
        // Transform array of strings to array of objects if needed
        const transformedData = Array.isArray(data)
          ? data.map((type, index) => ({
              id: type, // Use the string as the ID
              name: type
                .replace("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase()), // Convert to readable name
            }))
          : [];
        setArticleTypes(transformedData);
      },
      setLoading,
      errorMessage: "Failed to fetch article types",
    });
  };
 

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-blue-600 text-white py-2 hidden md:block">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="uppercase">Hotline: 1900 0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="uppercase">info@benhvien1a.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="uppercase">
                  Mở cửa: 7:00 - 20:00 (Thứ 2 - CN)
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
                className="hover:text-blue-200 transition-colors"
                aria-label="Chuyển ngôn ngữ"
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
      <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo/BENH-VIEN-1A-1-2.webp"
                alt="Bệnh viện 1A"
                className="h-18 object-contain"
              />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden ml-auto p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.name === "Tin tức" ? (
                    <>
                      <button
                        className="text-gray-700 uppercase hover:text-blue-600 font-medium transition-colors flex items-center text-sm"
                        aria-haspopup="true"
                        onMouseEnter={fetchArticleTypes}
                        onFocus={fetchArticleTypes}
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        {articleTypes.length > 0 ? (
                          articleTypes.map((type) => (
                            <Link
                              key={type.id}
                              to={`/tin-tuc-hoat-dong/${type.id}`}
                              className="block px-4 py-2 uppercase text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                              {type.name}
                            </Link>
                          ))
                        ) : (
                          <span className="block px-4 py-2 text-sm text-gray-400">
                            Đang tải...
                          </span>
                        )}
                      </div>
                    </>
                  ) : item.items ? (
                    <>
                      <button
                        className="text-gray-700 uppercase hover:text-blue-600 font-medium transition-colors flex items-center text-sm"
                        aria-haspopup="true"
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 uppercase text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-gray-700 uppercase hover:text-blue-600 font-medium transition-colors relative group text-sm"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <AppointmentDialog>
                <Button className="bg-blue-600 uppercase hover:bg-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt lịch ngay
                </Button>
              </AppointmentDialog>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-4">
              <div className="container mx-auto px-4">
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      {item.items === "Tin tức" ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className="text-gray-700 h-6 uppercase hover:text-blue-600 font-medium py-2 flex items-center w-full"
                            aria-expanded={openDropdown === item.name}
                          >
                            {item.name}
                            <ChevronDown
                              className={`w-4 h-4 ml-1 transform ${
                                openDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openDropdown === item.name && (
                            <div className="pl-4 flex flex-col space-y-2">
                              {articleTypes.length > 0 ? (
                                articleTypes.map((type) => (
                                  <Link
                                    key={type.id}
                                    to={`/tin-tuc-hoat-dong/${type.id}`}
                                    className="text-gray-600 uppercase hover:text-blue-600 py-1"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {type.name}
                                  </Link>
                                ))
                              ) : (
                                <span className="text-gray-400 py-1">
                                  Đang tải...
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      ) : item.items ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className="text-gray-700 h-6 uppercase hover:text-blue-600 font-medium py-2 flex items-center w-full"
                            aria-expanded={openDropdown === item.name}
                          >
                            {item.name}
                            <ChevronDown
                              className={`w-4 h-4 ml-1 transform ${
                                openDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openDropdown === item.name && (
                            <div className="pl-4 flex flex-col space-y-2">
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="text-gray-600 uppercase hover:text-blue-600 py-1"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          to={item.href}
                          className="text-gray-700 uppercase hover:text-blue-600 font-medium py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <AppointmentDialog>
                    <Button className="bg-blue-600 uppercase hover:bg-blue-700 mt-4 w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt lịch ngay
                    </Button>
                  </AppointmentDialog>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
