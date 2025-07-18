"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Users, Calendar, Phone, Mail, MapPin, Clock, User } from "lucide-react"
import { departmentApi } from "@/apis/department-api"
import { doctorApi } from "@/apis/doctor-api"
import { handleFetch } from "@/utils/fetch-helper"
import LoadingPage from "@/pages/common/loading-page"
import { toast } from "sonner"

const DepartmentDetailPage = () => {
  const { slug } = useParams()
  const [department, setDepartment] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [doctorsLoading, setDoctorsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchDepartmentDetail()
      fetchDepartmentDoctors()
    }
  }, [slug])

  const fetchDepartmentDetail = async () => {
    handleFetch({
      apiCall:()=> departmentApi.getBySlug(slug),
      setData: setDepartment,
      setLoading,
    })
  }

  const fetchDepartmentDoctors = async () => {
        handleFetch({
      apiCall:()=> doctorApi.getAllByDepartmentSlug(slug),
      setData: setDoctors,
      setLoading: setDoctorsLoading,
    })
  }

  if (loading) return <LoadingPage />

  if (!department) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy khoa</h1>
          <Link to="/departments">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách khoa
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/he-thong-khoa-phong">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>
                <p className="text-gray-600 mt-1">Thông tin chi tiết về khoa</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {doctors.length} bác sĩ
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Department Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Thông tin khoa
                </CardTitle>
              </CardHeader>
              <CardContent>
                {department.imageUrl && (
                  <img
                    src={department.imageUrl || "/placeholder.svg"}
                    alt={department.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: department.description || "Chưa có mô tả" }}
                />
              </CardContent>
            </Card>

            {/* Doctors List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Đội ngũ bác sĩ ({doctors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {doctorsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : doctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex-shrink-0">
                          {doctor.avatarUrl ? (
                            <img
                              src={doctor.avatarUrl || "/placeholder.svg"}
                              alt={doctor.fullName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{doctor.fullName}</h3>
                          {doctor.position && <p className="text-sm text-primary font-medium">{doctor.position}</p>}
                          {doctor.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                              {doctor.description.replace(/<[^>]*>/g, "")}
                            </p>
                          )}
                          <Link to={`/doi-ngu-chuyen-gia/${doctor.slug}`}>
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Xem chi tiết
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Chưa có bác sĩ nào trong khoa này</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thống kê nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-600">Số bác sĩ</span>
                  </div>
                  <span className="font-semibold">{doctors.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-gray-600">Hoạt động</span>
                  </div>
                  <Badge variant={department.active ? "default" : "secondary"}>
                    {department.active ? "Đang hoạt động" : "Tạm dừng"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Điện thoại</p>
                    <p className="font-medium">+84 123 456 789</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{department.slug}@hospital.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Địa chỉ</p>
                    <p className="font-medium">Tầng 2, Bệnh viện Đa khoa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Giờ làm việc</p>
                    <p className="font-medium">7:00 - 17:00 (T2-T6)</p>
                    <p className="font-medium">7:00 - 12:00 (T7)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt lịch khám
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Gọi tư vấn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentDetailPage
