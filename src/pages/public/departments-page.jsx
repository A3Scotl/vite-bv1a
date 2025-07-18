"use client"

import { useState, useEffect } from "react"
import { Search, Building2, Users, Award, Clock, ArrowRight, Phone, MapPin, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { departmentApi } from "@/apis/department-api"
import { handleFetch } from "@/utils/fetch-helper"
import { Link } from "react-router-dom"
import AppointmentDialog from "@/components/public/home/appointment-dialog"

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const departmentCategories = [
    { id: "all", name: "Tất cả khoa phòng", count: 0 },
    { id: "noi-khoa", name: "Nội khoa", count: 0 },
    { id: "ngoai-khoa", name: "Ngoại khoa", count: 0 },
    { id: "san-phu-khoa", name: "Sản phụ khoa", count: 0 },
    { id: "nhi-khoa", name: "Nhi khoa", count: 0 },
    { id: "chan-doan-hinh-anh", name: "Chẩn đoán hình ảnh", count: 0 },
  ]

  // Mock featured departments data
  const featuredDepartments = [
    {
      id: 1,
      name: "Khoa Tim mạch",
      slug: "khoa-tim-mach",
      description:
        "Chuyên điều trị các bệnh lý tim mạch với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại nhất",
      thumbnail: "/placeholder.svg?height=300&width=400",
      category: "noi-khoa",
      doctorCount: 12,
      services: ["Siêu âm tim", "Điện tim", "Thông tim", "Phẫu thuật tim"],
      workingHours: "7:00 - 17:00",
      location: "Tầng 3, Tòa A",
      badge: "Chuyên khoa hàng đầu",
      badgeColor: "bg-red-500",
    },
    {
      id: 2,
      name: "Khoa Ngoại tổng hợp",
      slug: "khoa-ngoai-tong-hop",
      description: "Thực hiện các ca phẫu thuật từ cơ bản đến phức tạp với công nghệ phẫu thuật nội soi tiên tiến",
      thumbnail: "/placeholder.svg?height=300&width=400",
      category: "ngoai-khoa",
      doctorCount: 15,
      services: ["Phẫu thuật nội soi", "Phẫu thuật tạo hình", "Phẫu thuật cấp cứu", "Phẫu thuật ung thư"],
      workingHours: "24/7",
      location: "Tầng 4-5, Tòa B",
      badge: "Công nghệ cao",
      badgeColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Khoa Sản phụ khoa",
      slug: "khoa-san-phu-khoa",
      description: "Chăm sóc toàn diện cho phụ nữ từ thai kỳ đến sinh nở và các vấn đề sức khỏe phụ khoa",
      thumbnail: "/placeholder.svg?height=300&width=400",
      category: "san-phu-khoa",
      doctorCount: 10,
      services: ["Siêu âm 4D", "Sinh thường", "Sinh mổ", "Điều trị vô sinh"],
      workingHours: "24/7",
      location: "Tầng 6, Tòa A",
      badge: "Thân thiện với gia đình",
      badgeColor: "bg-pink-500",
    },
  ]

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = () => {
    handleFetch({
      apiCall: departmentApi.getAllActive,
      setData: setDepartments,
      setLoading,
    })
  }

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">HỆ THỐNG KHOA PHÒNG</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Đa dạng các chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, sẵn sàng phục vụ
              mọi nhu cầu chăm sóc sức khỏe của bạn
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm khoa phòng..."
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
        {/* Department Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh mục khoa phòng</h2>
          <div className="flex flex-wrap gap-3">
            {departmentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Departments */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Khoa phòng nổi bật</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredDepartments.map((department) => (
              <Card
                key={department.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={department.thumbnail || "/placeholder.svg"}
                    alt={department.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-4 left-4 ${department.badgeColor} text-white border-0`}>
                    {department.badge}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center text-sm font-semibold text-gray-700">
                      <Users className="w-4 h-4 mr-1" />
                      {department.doctorCount} bác sĩ
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {department.name}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">{department.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span>Giờ làm việc: {department.workingHours}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span>Vị trí: {department.location}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Dịch vụ chính:</h4>
                    <div className="flex flex-wrap gap-2">
                      {department.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {department.services.length > 3 && (
                        <Badge variant="outline" className="text-xs text-blue-600">
                          +{department.services.length - 3} khác
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link to={`/he-thong-khoa-phong/${department.slug}`} className="flex-1">
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
        </div>

        {/* All Departments */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Tất cả khoa phòng</h2>
            <span className="text-gray-500">
              {loading ? "Đang tải..." : `${filteredDepartments.length} khoa phòng`}
            </span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4" />
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Departments Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDepartments.map((department) => (
                  <Card
                    key={department.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {department.thumbnail ? (
                          <img
                            src={department.thumbnail || "/placeholder.svg"}
                            alt={department.name}
                            className="w-16 h-16 rounded-lg object-cover mr-4"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <Building2 className="w-8 h-8 text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {department.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Award className="w-4 h-4 mr-1" />
                            Chuyên khoa
                          </div>
                        </div>
                      </div>

                      <div
                        className="text-gray-600 text-sm line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{ __html: department.description }}
                      />

                      <div className="flex gap-2">
                        <Link to={`/he-thong-khoa-phong/${department.slug}`} className="flex-1">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Xem chi tiết</Button>
                        </Link>
                        <AppointmentDialog>
                          <Button variant="outline" size="sm" className="px-3 bg-transparent">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </AppointmentDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* No Results */}
              {filteredDepartments.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-4">Không tìm thấy khoa phòng phù hợp</p>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thống kê ấn tượng</h2>
            <p className="text-lg text-gray-600">Những con số chứng minh chất lượng dịch vụ của chúng tôi</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Khoa phòng chuyên môn", icon: <Building2 className="w-8 h-8 text-blue-600" /> },
              { number: "150+", label: "Bác sĩ chuyên khoa", icon: <Users className="w-8 h-8 text-green-600" /> },
              { number: "50K+", label: "Bệnh nhân tin tưởng", icon: <Heart className="w-8 h-8 text-red-600" /> },
              { number: "15+", label: "Năm kinh nghiệm", icon: <Award className="w-8 h-8 text-yellow-600" /> },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Cần tư vấn về khoa phòng phù hợp?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Đội ngũ tư vấn viên của chúng tôi sẽ giúp bạn lựa chọn khoa phòng và bác sĩ phù hợp nhất
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

export default DepartmentsPage
