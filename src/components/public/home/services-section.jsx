import React from "react";
import { Stethoscope, Heart, Shield, Users, Star } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Stethoscope className="w-12 h-12 text-blue-600" />,
      title: "Xét nghiệm tổng quát",
      description:
        "Đầy đủ các loại xét nghiệm máu, nước tiểu, sinh hóa với công nghệ hiện đại",
      features: ["Nhanh chóng", "Chính xác", "An toàn"],
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Khám sức khỏe",
      description:
        "Gói khám sức khỏe tổng quát và chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm",
      features: ["Tư vấn chuyên sâu", "Báo cáo chi tiết", "Theo dõi sức khỏe"],
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: "Tiêm chủng",
      description: "Tiêm chủng đầy đủ các loại vaccine cho trẻ em và người lớn",
      features: [
        "Vaccine chính hãng",
        "Lịch tiêm khoa học",
        "Theo dõi sau tiêm",
      ],
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: "Dịch vụ tại nhà",
      description: "Lấy mẫu xét nghiệm tại nhà tiện lợi, an toàn cho gia đình",
      features: ["Đội ngũ chuyên nghiệp", "Thiết bị hiện đại", "Kết quả nhanh"],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dịch vụ y tế chuyên nghiệp
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp đa dạng các dịch vụ y tế chất lượng cao với công
            nghệ hiện đại
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
