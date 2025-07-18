"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Clock,
  DollarSign,
  CheckCircle,
  Phone,
  Calendar,
  ArrowLeft,
  Star,
  Shield,
  Award,
  Users,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import AppointmentDialog from "@/components/public/home/appointment-dialog"

const ServiceDetailPage = () => {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock service data - trong thực tế sẽ fetch từ API
  const serviceData = {
    "goi-kham-suc-khoe-tong-quat-vip": {
      id: 1,
      name: "Gói khám sức khỏe tổng quát VIP",
      category: "Khám tổng quát",
      description:
        "Gói khám sức khỏe toàn diện với hơn 50 chỉ số xét nghiệm, chẩn đoán hình ảnh và tư vấn chuyên sâu từ đội ngũ bác sĩ giàu kinh nghiệm.",
      image: "/placeholder.svg?height=400&width=600",
      price: "2.500.000",
      originalPrice: "3.200.000",
      duration: "4-5 giờ",
      badge: "Phổ biến",
      badgeColor: "bg-green-500",
      features: [
        "Khám lâm sàng tổng quát với bác sĩ chuyên khoa",
        "Xét nghiệm máu 30 chỉ số quan trọng",
        "Xét nghiệm nước tiểu và phân",
        "Siêu âm tổng quát (gan, mật, thận, lách, tuyến giáp)",
        "X-quang phổi thẳng và nghiêng",
        "Điện tim 12 chuyển đạo",
        "Đo mật độ xương",
        "Tư vấn dinh dưỡng cá nhân hóa",
        "Báo cáo sức khỏe chi tiết",
        "Tư vấn kết quả với bác sĩ chuyên khoa",
      ],
      process: [
        "Đăng ký và làm thủ tục",
        "Khám lâm sàng tổng quát",
        "Thực hiện các xét nghiệm",
        "Chẩn đoán hình ảnh",
        "Tư vấn kết quả",
        "Nhận báo cáo sức khỏe",
      ],
      benefits: [
        "Phát hiện sớm các bệnh lý tiềm ẩn",
        "Đánh giá toàn diện tình trạng sức khỏe",
        "Tư vấn chế độ dinh dưỡng phù hợp",
        "Lập kế hoạch chăm sóc sức khỏe dài hạn",
      ],
      preparation: [
        "Nhịn ăn 8-12 tiếng trước khi xét nghiệm",
        "Uống đủ nước, tránh rượu bia 24h trước",
        "Mang theo CMND/CCCD và thẻ bảo hiểm (nếu có)",
        "Mặc quần áo thoải mái, dễ thay đổi",
      ],
      targetAudience: [
        "Người trưởng thành từ 18 tuổi trở lên",
        "Người muốn kiểm tra sức khỏe định kỳ",
        "Người có tiền sử gia đình mắc bệnh mãn tính",
        "Người làm việc trong môi trường áp lực cao",
      ],
    },
    "xet-nghiem-tam-soat-ung-thu": {
      id: 2,
      name: "Xét nghiệm tầm soát ung thư",
      category: "Xét nghiệm",
      description: "Gói xét nghiệm chuyên sâu để phát hiện sớm các dấu hiệu ung thư phổ biến với độ chính xác cao.",
      image: "/placeholder.svg?height=400&width=600",
      price: "1.800.000",
      originalPrice: "2.400.000",
      duration: "2-3 giờ",
      badge: "Khuyến mãi",
      badgeColor: "bg-red-500",
      features: [
        "Xét nghiệm máu CEA (ung thư đại trực tràng)",
        "Xét nghiệm AFP (ung thư gan)",
        "Xét nghiệm CA 19-9 (ung thư tuyến tụy)",
        "Xét nghiệm CA 125 (ung thư buồng trứng)",
        "Xét nghiệm PSA (ung thư tuyến tiền liệt)",
        "Nội soi dạ dày không đau",
        "Siêu âm ổ bụng tổng quát",
        "Chụp X-quang ngực",
        "Tư vấn kết quả với bác sĩ ung bướu",
      ],
      process: [
        "Tư vấn và đăng ký",
        "Lấy mẫu máu xét nghiệm",
        "Thực hiện nội soi dạ dày",
        "Siêu âm và chụp X-quang",
        "Phân tích kết quả",
        "Tư vấn với bác sĩ chuyên khoa",
      ],
      benefits: [
        "Phát hiện sớm các dấu hiệu ung thư",
        "Tăng cơ hội điều trị thành công",
        "An tâm về tình trạng sức khỏe",
        "Kế hoạch theo dõi phù hợp",
      ],
      preparation: [
        "Nhịn ăn 8 tiếng trước nội soi",
        "Tránh thuốc kháng sinh 1 tuần trước",
        "Thông báo tiền sử bệnh và thuốc đang dùng",
        "Chuẩn bị tinh thần thoải mái",
      ],
      targetAudience: [
        "Người từ 40 tuổi trở lên",
        "Người có tiền sử gia đình mắc ung thư",
        "Người có triệu chứng nghi ngờ",
        "Người muốn tầm soát định kỳ",
      ],
    },
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundService = serviceData[slug]
      setService(foundService)
      setLoading(false)
    }, 500)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin dịch vụ...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy dịch vụ</h1>
          <Link to="/dich-vu">
            <Button>Quay lại danh sách dịch vụ</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              Trang chủ
            </Link>
            <span>/</span>
            <Link to="/dich-vu" className="hover:text-blue-600">
              Dịch vụ
            </Link>
            <span>/</span>
            <span className="text-gray-900">{service.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/dich-vu" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách dịch vụ
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  {service.badge && (
                    <Badge className={`absolute top-4 left-4 ${service.badgeColor} text-white border-0`}>
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{service.category}</Badge>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.9/5)</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Service Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dịch vụ bao gồm</h2>
                <div className="grid gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quy trình thực hiện</h2>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lợi ích của dịch vụ</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preparation */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Chuẩn bị trước khi thực hiện</h2>
                <div className="space-y-3">
                  {service.preparation.map((prep, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{prep}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Target Audience */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Đối tượng phù hợp</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.targetAudience.map((audience, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{audience}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {Number.parseInt(service.price).toLocaleString()}đ
                    </span>
                    {service.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {Number.parseInt(service.originalPrice).toLocaleString()}đ
                      </span>
                    )}
                  </div>
                  {service.originalPrice && (
                    <div className="text-sm text-green-600 font-semibold">
                      Tiết kiệm{" "}
                      {(Number.parseInt(service.originalPrice) - Number.parseInt(service.price)).toLocaleString()}đ
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-semibold flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Danh mục:</span>
                    <span className="font-semibold">{service.category}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <AppointmentDialog>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt lịch ngay
                    </Button>
                  </AppointmentDialog>

                  <Button variant="outline" className="w-full py-3 bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi tư vấn: 1900 0000
                  </Button>

                  <Link to="/bang-gia-dich-vu">
                    <Button variant="ghost" className="w-full py-3">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Xem bảng giá chi tiết
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tại sao chọn chúng tôi?</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Award className="w-5 h-5 text-blue-600" />, text: "Đội ngũ chuyên gia giàu kinh nghiệm" },
                    { icon: <Shield className="w-5 h-5 text-green-600" />, text: "Trang thiết bị hiện đại" },
                    { icon: <Heart className="w-5 h-5 text-red-600" />, text: "Dịch vụ tận tâm, chu đáo" },
                    { icon: <Star className="w-5 h-5 text-yellow-600" />, text: "Chất lượng được đảm bảo" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {item.icon}
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin liên hệ</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold">Hotline:</span> 1900 0000
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> info@benhvien1a.com
                  </div>
                  <div>
                    <span className="font-semibold">Địa chỉ:</span> 123 Đường ABC, Q.1, TP.HCM
                  </div>
                  <div>
                    <span className="font-semibold">Giờ làm việc:</span> 7:00 - 20:00 (T2-CN)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage
