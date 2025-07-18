import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Stethoscope,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Bệnh viện 1A</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Chăm sóc s���c khỏe toàn diện với đội ngũ bác sĩ giàu kinh nghiệm
              và trang thiết bị hiện đại.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Đội ngũ bác sĩ
                </Link>
              </li>
              <li>
                <Link
                  to="/departments"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Phòng ban
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Dịch vụ</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/tests"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Xét nghiệm
                </Link>
              </li>
              <li>
                <Link
                  to="/clinic"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Khám tổng quát
                </Link>
              </li>
              <li>
                <Link
                  to="/vaccination"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tiêm chủng
                </Link>
              </li>
              <li>
                <Link
                  to="/home-service"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dịch vụ tại nhà
                </Link>
              </li>
              <li>
                <Link
                  to="/insurance"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Bảo hiểm y tế
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Thông tin liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">123 Đường ABC, Quận 1</p>
                  <p className="text-gray-400">TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">Hotline: 1900 0000</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">info@benhvien1a.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400">7:00 - 20:00 (Thứ 2 - CN)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Bệnh viện 1A. Tất cả quyền được bảo
              lưu.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              {!user ? (
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Đăng nhập quản trị
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Chính sách bảo mật
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
