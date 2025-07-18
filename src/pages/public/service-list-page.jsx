"use client"

import { useState } from "react"
import { Search, Stethoscope, Heart, Shield, Users, Award, Clock, ArrowRight, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AppointmentDialog from "@/components/public/home/appointment-dialog"
import { Link } from "react-router-dom"

const ServiceListPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const serviceCategories = [
    { id: "all", name: "Tất cả dịch vụ", count: 18 },
    { id: "kham-tong-quat", name: "Khám tổng quát", count: 4 },
    { id: "xet-nghiem", name: "Xét nghiệm", count: 6 },
    { id: "chuan-doan-hinh-anh", name: "Chẩn đoán hình ảnh", count: 4 },
    { id: "phau-thuat", name: "Phẫu thuật", count: 2 },
    { id: "dac-biet", name: "Dịch vụ đặc biệt", count: 2 },
  ]

  const services = [
    // Khám tổng quát
    {
      id: 1,
      name: "Gói khám sức khỏe tổng quát VIP",
      slug: "goi-kham-suc-khoe-tong-quat-vip",
      category: "kham-tong-quat",
      description: "Gói khám sức khỏe toàn diện với hơn 50 chỉ số xét nghiệm, chẩn đoán hình ảnh và tư vấn chuyên sâu",
      image: "/placeholder.svg?height=300&width=400",
      price: "2.500.000",
      duration: "4-5 giờ",
      badge: "Phổ biến",
      badgeColor: "bg-green-500",
    },
    {
      id: 2,
      name: "Gói khám sức khỏe cơ bản",
      slug: "goi-kham-suc-khoe-co-ban",
      category: "kham-tong-quat",
      description: "Gói khám sức khỏe cơ bản phù hợp cho mọi lứa tuổi với các xét nghiệm cần thiết",
      image: "/placeholder.svg?height=300&width=400",
      price: "800.000",
      duration: "2 giờ",
    },
    {
      id: 3,
      name: "Khám sức khỏe định kỳ",
      slug: "kham-suc-khoe-dinh-ky",
      category: "kham-tong-quat",
      description: "Khám sức khỏe định kỳ hàng năm cho người trưởng thành với đầy đủ các chỉ số quan trọng",
      image: "/placeholder.svg?height=300&width=400",
      price: "1.500.000",
      duration: "3 giờ",
    },
    {
      id: 4,
      name: "Gói khám sức khỏe cao cấp",
      slug: "goi-kham-suc-khoe-cao-cap",
      category: "kham-tong-quat",
      description: "Gói khám sức khỏe cao cấp với đầy đủ các chỉ số và công nghệ chẩn đoán tiên tiến",
      image: "/placeholder.svg?height=300&width=400",
      price: "3.500.000",
      duration: "1 ngày",
      badge: "Cao cấp",
      badgeColor: "bg-purple-500",
    },

    // Xét nghiệm
    {
      id: 5,
      name: "Xét nghiệm tầm soát ung thư",
      slug: "xet-nghiem-tam-soat-ung-thu",
      category: "xet-nghiem",
      description: "Gói xét nghiệm chuyên sâu để phát hiện sớm các dấu hiệu ung thư phổ biến",
      image: "/placeholder.svg?height=300&width=400",
      price: "1.800.000",
      duration: "2-3 giờ",
      badge: "Khuyến mãi",
      badgeColor: "bg-red-500",
    },
    {
      id: 6,
      name: "Xét nghiệm máu tổng quát",
      slug: "xet-nghiem-mau-tong-quat",
      category: "xet-nghiem",
      description: "Xét nghiệm máu cơ bản với 20 chỉ số quan trọng đánh giá tình trạng sức khỏe",
      image: "/placeholder.svg?height=300&width=400",
      price: "300.000",
      duration: "30 phút",
    },
    {
      id: 7,
      name: "Xét nghiệm sinh hóa mở rộng",
      slug: "xet-nghiem-sinh-hoa-mo-rong",
      category: "xet-nghiem",
      description: "Xét nghiệm sinh hóa với hơn 40 chỉ số đánh giá chức năng các cơ quan",
      image: "/placeholder.svg?height=300&width=400",
      price: "800.000",
      duration: "1 giờ",
    },
    {
      id: 8,
      name: "Xét nghiệm di truyền",
      slug: "xet-nghiem-di-truyen",
      category: "xet-nghiem",
      description: "Xét nghiệm di truyền phát hiện nguy cơ bệnh tật và tư vấn di truyền học",
      image: "/placeholder.svg?height=300&width=400",
      price: "2.000.000",
      duration: "1 tuần",
      badge: "Mới",
      badgeColor: "bg-blue-500",
    },
    {
      id: 9,
      name: "Xét nghiệm hormone",
      slug: "xet-nghiem-hormone",
      category: "xet-nghiem",
      description: "Xét nghiệm đầy đủ các hormone quan trọng trong cơ thể",
      image: "/placeholder.svg?height=300&width=400",
      price: "1.200.000",
      duration: "1 giờ",
    },
    {
      id: 10,
      name: "Xét nghiệm dị ứng",
      slug: "xet-nghiem-di-ung",
      category: "xet-nghiem",
      description: "Xét nghiệm tầm soát các loại dị ứng phổ biến",
      image: "/placeholder.svg?height=300&width=400",
      price: "900.000",
      duration: "45 phút",
    },

    // Chẩn đoán hình ảnh
    {
      id: 11,
      name: "Chụp CT Scanner",
      slug: "chup-ct-scanner",
      category: "chuan-doan-hinh-anh",
      description: "Chụp CT Scanner với máy 64 dãy hiện đại, hình ảnh rõ nét và chính xác",
      image: "/placeholder.svg?height=300&width=400",
      price: "1.500.000",
      duration: "45 phút",
    },
    {
      id: 12,
      name: "Chụp MRI",
      slug: "chup-mri",
      category: "chuan-doan-hinh-anh",
      description: "Chụp cộng hưởng từ với máy 1.5 Tesla, không xạ trị, an toàn tuyệt đối",
      image: "/placeholder.svg?height=300&width=400",
      price: "2.500.000",
      duration: "1 giờ",
    },
    {
      id: 13,
      name: "Siêu âm 4D",
      slug: "sieu-am-4d",
      category: "chuan-doan-hinh-anh",
      description: "Siêu âm 4D cho thai phụ và khám tổng quát với hình ảnh sống động",
      image: "/placeholder.svg?height=300&width=400",
      price: "500.000",
      duration: "30 phút",
    },
    {
      id: 14,
      name: "X-quang kỹ thuật số",
      slug: "x-quang-ky-thuat-so",
      category: "chuan-doan-hinh-anh",
      description: "X-quang kỹ thuật số với độ phân giải cao và liều xạ thấp",
      image: "/placeholder.svg?height=300&width=400",
      price: "200.000",
      duration: "15 phút",
    },

    // Phẫu thuật
    {
      id: 15,
      name: "Phẫu thuật nội soi",
      slug: "phau-thuat-noi-soi",
      category: "phau-thuat",
      description: "Phẫu thuật nội soi ít xâm lấn với thời gian hồi phục nhanh",
      image: "/placeholder.svg?height=300&width=400",
      price: "Tùy ca",
      duration: "2-4 giờ",
      badge: "Công nghệ cao",
      badgeColor: "bg-indigo-500",
    },
    {
      id: 16,
      name: "Phẫu thuật thẩm mỹ",
      slug: "phau-thuat-tham-my",
      category: "phau-thuat",
      description: "Phẫu thuật thẩm mỹ với kỹ thuật tiên tiến và bác sĩ giàu kinh nghiệm",
      image: "/placeholder.svg?height=300&width=400",
      price: "Tùy ca",
      duration: "1-3 giờ",
    },

    // Dịch vụ đặc biệt
    {
      id: 17,
      name: "Khám tim mạch chuyên sâu",
      slug: "kham-tim-mach-chuyen-sau",
      category: "dac-biet",
      description: "Gói khám chuyên khoa tim mạch với các thiết bị hiện đại nhất",
      image: "/placeholder.svg?height=300&width=400",
      price: "1.200.000",
      duration: "2 giờ",
    },
    {
      id: 18,
      name: "Dịch vụ khám tại nhà",
      slug: "dich-vu-kham-tai-nha",
      category: "dac-biet",
      description: "Dịch vụ khám bệnh và lấy mẫu xét nghiệm tại nhà tiện lợi",
      image: "/placeholder.svg?height=300&width=400",
      price: "500.000",
      duration: "1 giờ",
      badge: "Tiện lợi",
      badgeColor: "bg-orange-500",
    },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">DANH SÁCH DỊCH VỤ</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Khám phá đa dạng các dịch vụ y tế chất lượng cao với công nghệ hiện đại và đội ngũ chuyên gia giàu kinh
              nghiệm
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AppointmentDialog>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3">
                  Đặt lịch khám ngay
                </Button>
              </AppointmentDialog>
              <Link to="/bang-gia-dich-vu">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-8 py-3"
                >
                  Xem bảng giá
                </Button>
              </Link>
            </div>
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

        {/* Services Grid */}
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
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {service.badge && (
                    <Badge className={`absolute top-4 left-4 ${service.badgeColor} text-white border-0`}>
                      {service.badge}
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center text-sm font-semibold text-gray-700">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-blue-600">
                      {service.price === "Tùy ca"
                        ? service.price
                        : `${Number.parseInt(service.price).toLocaleString()}đ`}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link to={`/dich-vu/${service.slug}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Xem chi tiết
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <AppointmentDialog>
                      <Button variant="outline" className="px-4 bg-transparent">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </AppointmentDialog>
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

      {/* Quick Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn dịch vụ của chúng tôi?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8 text-blue-600" />, number: "18+", label: "Dịch vụ đa dạng" },
              { icon: <Users className="w-8 h-8 text-green-600" />, number: "50K+", label: "Khách hàng tin tưởng" },
              { icon: <Shield className="w-8 h-8 text-purple-600" />, number: "100%", label: "An toàn chất lượng" },
              { icon: <Heart className="w-8 h-8 text-red-600" />, number: "24/7", label: "Hỗ trợ tận tâm" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Cần tư vấn về dịch vụ phù hợp?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Đội ngũ tư vấn viên của chúng tôi sẽ giúp bạn lựa chọn dịch vụ phù hợp nhất với nhu cầu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppointmentDialog>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3">
                Đặt lịch tư vấn
              </Button>
            </AppointmentDialog>
            <Link to="/lien-he">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent px-8 py-3"
              >
                Liên hệ hotline
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceListPage
