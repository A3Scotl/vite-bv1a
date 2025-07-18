"use client"

import { useState } from "react"
import { Search, Stethoscope, Heart, Shield, Star, Clock, Award, CheckCircle, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AppointmentDialog from "@/components/public/home/appointment-dialog"
import { Link } from "react-router-dom"

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const serviceCategories = [
    { id: "all", name: "Tất cả dịch vụ", count: 24 },
    { id: "kham-tong-quat", name: "Khám tổng quát", count: 6 },
    { id: "xet-nghiem", name: "Xét nghiệm", count: 8 },
    { id: "chuan-doan-hinh-anh", name: "Chẩn đoán hình ảnh", count: 5 },
    { id: "phau-thuat", name: "Phẫu thuật", count: 3 },
    { id: "dac-biet", name: "Dịch vụ đặc biệt", count: 2 },
  ]

  const featuredServices = [
    {
      id: 1,
      title: "Gói khám sức khỏe tổng quát VIP",
      category: "kham-tong-quat",
      description: "Gói khám sức khỏe toàn diện với hơn 50 chỉ số xét nghiệm, chẩn đoán hình ảnh và tư vấn chuyên sâu",
      price: "2.500.000",
      originalPrice: "3.200.000",
      duration: "4-5 giờ",
      features: [
        "Khám lâm sàng tổng quát",
        "Xét nghiệm máu 30 chỉ số",
        "Siêu âm tổng quát",
        "X-quang phổi",
        "Điện tim",
        "Tư vấn dinh dưỡng",
        "Báo cáo chi tiết",
      ],
      image: "/placeholder.svg?height=300&width=400",
      badge: "Phổ biến",
      badgeColor: "bg-green-500",
    },
    {
      id: 2,
      title: "Xét nghiệm tầm soát ung thư",
      category: "xet-nghiem",
      description: "Gói xét nghiệm chuyên sâu để phát hiện sớm các dấu hiệu ung thư phổ biến",
      price: "1.800.000",
      originalPrice: "2.400.000",
      duration: "2-3 giờ",
      features: [
        "Xét nghiệm máu CEA, AFP, CA 19-9",
        "Xét nghiệm nước tiểu",
        "Nội soi dạ dày",
        "Siêu âm ổ bụng",
        "Chụp X-quang ngực",
        "Tư vấn kết quả",
      ],
      image: "/placeholder.svg?height=300&width=400",
      badge: "Khuyến mãi",
      badgeColor: "bg-red-500",
    },
    {
      id: 3,
      title: "Khám tim mạch chuyên sâu",
      category: "kham-tong-quat",
      description: "Gói khám chuyên khoa tim mạch với các thiết bị hiện đại nhất",
      price: "1.200.000",
      originalPrice: null,
      duration: "2 giờ",
      features: [
        "Khám lâm sàng tim mạch",
        "Điện tim 12 chuyển đạo",
        "Siêu âm tim",
        "Đo huyết áp 24h",
        "Xét nghiệm lipid máu",
        "Tư vấn chế độ ăn",
      ],
      image: "/placeholder.svg?height=300&width=400",
      badge: "Mới",
      badgeColor: "bg-blue-500",
    },
  ]

  const allServices = [
    // Khám tổng quát
    {
      id: 4,
      title: "Gói khám sức khỏe cơ bản",
      category: "kham-tong-quat",
      description: "Gói khám sức khỏe cơ bản phù hợp cho mọi lứa tuổi",
      price: "800.000",
      duration: "2 giờ",
      features: ["Khám lâm sàng", "Xét nghiệm máu cơ bản", "X-quang phổi", "Điện tim"],
    },
    {
      id: 5,
      title: "Khám sức khỏe định kỳ",
      category: "kham-tong-quat",
      description: "Khám sức khỏe định kỳ hàng năm cho người trưởng thành",
      price: "1.500.000",
      duration: "3 giờ",
      features: ["Khám tổng quát", "Xét nghiệm sinh hóa", "Siêu âm bụng", "Đo mật độ xương"],
    },
    {
      id: 6,
      title: "Gói khám sức khỏe cao cấp",
      category: "kham-tong-quat",
      description: "Gói khám sức khỏe cao cấp với đầy đủ các chỉ số",
      price: "3.500.000",
      duration: "1 ngày",
      features: ["Khám toàn diện", "CT Scanner", "MRI", "Nội soi", "Tư vấn chuyên gia"],
    },

    // Xét nghiệm
    {
      id: 7,
      title: "Xét nghiệm máu tổng quát",
      category: "xet-nghiem",
      description: "Xét nghiệm máu cơ bản với 20 chỉ số quan trọng",
      price: "300.000",
      duration: "30 phút",
      features: ["Công thức máu", "Đường huyết", "Chức năng gan", "Chức năng thận"],
    },
    {
      id: 8,
      title: "Xét nghiệm sinh hóa mở rộng",
      category: "xet-nghiem",
      description: "Xét nghiệm sinh hóa với hơn 40 chỉ số",
      price: "800.000",
      duration: "1 giờ",
      features: ["Lipid máu", "Enzyme tim", "Hormone", "Vitamin"],
    },
    {
      id: 9,
      title: "Xét nghiệm di truyền",
      category: "xet-nghiem",
      description: "Xét nghiệm di truyền phát hiện nguy cơ bệnh tật",
      price: "2.000.000",
      duration: "1 tuần",
      features: ["Phân tích DNA", "Nguy cơ ung thư", "Nguy cơ tim mạch", "Tư vấn di truyền"],
    },

    // Chẩn đoán hình ảnh
    {
      id: 10,
      title: "Chụp CT Scanner",
      category: "chuan-doan-hinh-anh",
      description: "Chụp CT Scanner với máy 64 dãy hiện đại",
      price: "1.500.000",
      duration: "45 phút",
      features: ["CT không thuốc", "CT có thuốc", "Tái tạo 3D", "Báo cáo chuyên khoa"],
    },
    {
      id: 11,
      title: "Chụp MRI",
      category: "chuan-doan-hinh-anh",
      description: "Chụp cộng hưởng từ với máy 1.5 Tesla",
      price: "2.500.000",
      duration: "1 giờ",
      features: ["MRI não", "MRI cột sống", "MRI khớp", "Không xạ trị"],
    },
    {
      id: 12,
      title: "Siêu âm 4D",
      category: "chuan-doan-hinh-anh",
      description: "Siêu âm 4D cho thai phụ và khám tổng quát",
      price: "500.000",
      duration: "30 phút",
      features: ["Hình ảnh rõ nét", "Video 4D", "In ảnh", "Tư vấn bác sĩ"],
    },
  ]

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">DỊCH VỤ Y TẾ CHUYÊN NGHIỆP</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Chúng tôi cung cấp đa dạng các dịch vụ y tế chất lượng cao với công nghệ hiện đại và đội ngũ bác sĩ giàu
              kinh nghiệm
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm dịch vụ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-lg bg-white text-gray-900 border-0 rounded-xl"
                />
              </div>
            </div>

            <AppointmentDialog>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3">
                Đặt lịch khám ngay
              </Button>
            </AppointmentDialog>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Service Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh mục dịch vụ</h2>
          <div className="flex flex-wrap gap-3">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dịch vụ nổi bật</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-4 left-4 ${service.badgeColor} text-white border-0`}>
                    {service.badge}
                  </Badge>
                  {service.originalPrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Giảm{" "}
                      {Math.round((1 - Number.parseInt(service.price) / Number.parseInt(service.originalPrice)) * 100)}%
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {Number.parseInt(service.price).toLocaleString()}đ
                      </span>
                      {service.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {Number.parseInt(service.originalPrice).toLocaleString()}đ
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Bao gồm:</h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-sm text-blue-600 font-medium">
                          +{service.features.length - 4} dịch vụ khác
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <AppointmentDialog>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Đặt lịch ngay</Button>
                    </AppointmentDialog>
                    <Button variant="outline" className="px-4 bg-transparent">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Services */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "all"
                ? "Tất cả dịch vụ"
                : serviceCategories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-500">{filteredServices.length} dịch vụ</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-blue-600">
                      {Number.parseInt(service.price).toLocaleString()}đ
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>

                  <div className="mb-4">
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-blue-600 font-medium">
                          +{service.features.length - 3} dịch vụ khác
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <AppointmentDialog>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Đặt lịch
                      </Button>
                    </AppointmentDialog>
                    <Button variant="outline" size="sm" className="px-3 bg-transparent">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Không tìm thấy dịch vụ phù hợp</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tại sao chọn chúng tôi?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những lý do khiến bạn nên tin tưởng dịch vụ của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-blue-600" />,
                title: "Đội ngũ chuyên nghiệp",
                description: "Bác sĩ giàu kinh nghiệm, được đào tạo bài bản",
              },
              {
                icon: <Shield className="w-8 h-8 text-green-600" />,
                title: "Trang thiết bị hiện đại",
                description: "Máy móc, thiết bị y tế tiên tiến nhất",
              },
              {
                icon: <Heart className="w-8 h-8 text-red-600" />,
                title: "Dịch vụ tận tâm",
                description: "Chăm sóc chu đáo, tận tình với từng bệnh nhân",
              },
              {
                icon: <Star className="w-8 h-8 text-yellow-600" />,
                title: "Giá cả hợp lý",
                description: "Chi phí minh bạch, phù hợp với mọi đối tượng",
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sẵn sàng chăm sóc sức khỏe của bạn</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Đặt lịch khám ngay hôm nay để được tư vấn và chăm sóc tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppointmentDialog>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3">
                Đặt lịch khám
              </Button>
            </AppointmentDialog>
            <Link to="/lien-he">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-8 py-3"
              >
                Liên hệ tư vấn
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
