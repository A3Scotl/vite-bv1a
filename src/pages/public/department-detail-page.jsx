"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { departmentApi } from "@/apis/department-api"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { handleFetch } from "@/utils/fetch-helper"
import {
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  Users,
  Stethoscope,
  Clock,
  Award,
  Building2,
  Heart,
  Shield,
} from "lucide-react"
import AppointmentDialog from "@/components/public/home/appointment-dialog"
import ImageReveal from "@/components/common/image-reveal"
import PageTransition from "@/components/common/page-transition"

export default function DepartmentDetailPage() {
  const { slug } = useParams()
  const [department, setDepartment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDepartment = async () => {
      handleFetch({
        apiCall: () => departmentApi.getBySlug(slug),
        setData: setDepartment,
        setLoading,
      })
    }

    if (slug) fetchDepartment()
  }, [slug])

  // Mock data for additional information
  const mockDepartmentData = {
    services: [
      "Khám và điều trị nội khoa tổng quát",
      "Siêu âm tim mạch",
      "Điện tim và Holter",
      "Thông tim chẩn đoán",
      "Phẫu thuật tim mạch",
      "Tư vấn dinh dưỡng tim mạch",
    ],
    equipment: [
      "Máy siêu âm tim 4D hiện đại",
      "Máy điện tim 12 chuyển đạo",
      "Hệ thống Holter 24h",
      "Máy thông tim kỹ thuật số",
      "Phòng mổ tim mạch chuẩn quốc tế",
    ],
    doctors: [
      { name: "BS. Nguyễn Văn A", position: "Trưởng khoa", specialty: "Tim mạch can thiệp" },
      { name: "BS. Trần Thị B", position: "Phó trưởng khoa", specialty: "Siêu âm tim" },
      { name: "BS. Lê Văn C", position: "Bác sĩ", specialty: "Điện tim học" },
    ],
    workingHours: {
      morning: "7:30 - 11:30",
      afternoon: "13:30 - 17:00",
      emergency: "24/7",
    },
    location: "Tầng 3, Tòa nhà A",
    achievements: [
      "Chứng nhận ISO 9001:2015",
      "Giải thưởng chất lượng dịch vụ 2023",
      "Hơn 10.000 ca điều trị thành công",
      "Đội ngũ bác sĩ giàu kinh nghiệm",
    ],
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Skeleton */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16" />
              <span>/</span>
              <Skeleton className="h-4 w-32" />
              <span>/</span>
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-6 w-48 mb-6" />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-0">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>

              {/* Content Skeletons */}
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!department) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy khoa phòng</h1>
          <Link to="/he-thong-khoa-phong">
            <Button>Quay lại danh sách khoa phòng</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link to="/he-thong-khoa-phong" className="hover:text-blue-600 transition-colors">
                Hệ thống khoa phòng
              </Link>
              <span>/</span>
              <span className="text-gray-900">{department.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            to="/he-thong-khoa-phong"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách khoa phòng
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Department Header */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageReveal
                      src={department.thumbnail || "/placeholder.svg?height=300&width=800"}
                      alt={department.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <Badge className="bg-blue-600 text-white mb-2">Chuyên khoa</Badge>
                      <h1 className="text-3xl font-bold mb-2">{department.name}</h1>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {mockDepartmentData.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Building2 className="w-6 h-6 mr-2 text-blue-600" />
                    Giới thiệu khoa
                  </h2>
                  <div
                    className="prose max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: department.description }}
                  />
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Services */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Stethoscope className="w-6 h-6 mr-2 text-blue-600" />
                    Dịch vụ chính
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockDepartmentData.services.map((service, index) => (
                      <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-800">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Equipment */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-blue-600" />
                    Trang thiết bị
                  </h2>
                  <div className="grid gap-3">
                    {mockDepartmentData.equipment.map((equipment, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Award className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-gray-800">{equipment}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Doctors */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-blue-600" />
                    Đội ngũ bác sĩ
                  </h2>
                  <div className="grid gap-4">
                    {mockDepartmentData.doctors.map((doctor, index) => (
                      <div key={index} className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-blue-600">{doctor.position}</p>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link to="/doi-ngu-chuyen-gia">
                      <Button variant="outline" className="w-full bg-transparent">
                        Xem tất cả bác sĩ
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Working Hours */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-blue-600" />
                    Giờ làm việc
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <h3 className="font-semibold text-gray-900 mb-2">Buổi sáng</h3>
                      <p className="text-blue-600 font-medium">{mockDepartmentData.workingHours.morning}</p>
                      <p className="text-sm text-gray-600 mt-1">Thứ 2 - Thứ 6</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <h3 className="font-semibold text-gray-900 mb-2">Buổi chiều</h3>
                      <p className="text-green-600 font-medium">{mockDepartmentData.workingHours.afternoon}</p>
                      <p className="text-sm text-gray-600 mt-1">Thứ 2 - Thứ 6</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg text-center">
                      <h3 className="font-semibold text-gray-900 mb-2">Cấp cứu</h3>
                      <p className="text-red-600 font-medium">{mockDepartmentData.workingHours.emergency}</p>
                      <p className="text-sm text-gray-600 mt-1">Tất cả các ngày</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Achievements */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-blue-600" />
                    Thành tích nổi bật
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockDepartmentData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                        <Heart className="w-5 h-5 text-yellow-600 mr-3" />
                        <span className="text-gray-800">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Đặt lịch khám</h3>
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
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Vị trí: {mockDepartmentData.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Giờ làm việc: 7:30 - 17:00</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">{mockDepartmentData.doctors.length} bác sĩ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Thống kê</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bác sĩ</span>
                      <span className="font-semibold text-blue-600">{mockDepartmentData.doctors.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Dịch vụ</span>
                      <span className="font-semibold text-green-600">{mockDepartmentData.services.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Thiết bị</span>
                      <span className="font-semibold text-purple-600">{mockDepartmentData.equipment.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Thành tích</span>
                      <span className="font-semibold text-yellow-600">{mockDepartmentData.achievements.length}</span>
                    </div>
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
                      <span className="font-semibold">Cấp cứu:</span> 24/7
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
