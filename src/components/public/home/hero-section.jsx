import React from "react";
import { Button } from "@/components/ui/button";
import AppointmentDialog from "./appointment-dialog";
import { Calendar } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { number: "10+", label: "Năm kinh nghiệm" },
    { number: "100K+", label: "Khách hàng tin tưởng" },
    { number: "50+", label: "Dịch vụ y tế" },
    { number: "24/7", label: "Hỗ trợ khách hàng" },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Chăm sóc sức khỏe
              <span className="text-yellow-400"> toàn diện</span>
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị y tế hiện
              đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt
              nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <AppointmentDialog>
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Đặt lịch khám ngay
                </Button>
              </AppointmentDialog>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Thống kê ấn tượng</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
