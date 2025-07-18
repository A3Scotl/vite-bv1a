"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { doctorApi } from "@/apis/doctor-api"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { handleFetch } from "@/utils/fetch-helper"
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Award, GraduationCap, Stethoscope, Clock } from 'lucide-react'
import AppointmentDialog from "@/components/public/home/appointment-dialog"
import ImageReveal from "@/components/common/image-reveal"
import PageTransition from "@/components/common/page-transition"

export default function DoctorDetailPage() {
  const { slug } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
      handleFetch({
        apiCall: () => doctorApi.getBySlug(slug),
        setData: setDoctor,
        setLoading,
      })
    }

    if (slug) fetchDoctor()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Skeleton */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16" />
              <span>/</span>
              <Skeleton className="h-4 w-24" />
              <span>/</span>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-6 w-48 mb-6" />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Skeleton className="w-40 h-40 rounded-full" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Skeletons */}
              {[1, 2, 3].map((i) => (
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

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bác sĩ</h1>
          <Link to="/doi-ngu-chuyen-gia">
            <Button>Quay lại danh sách bác sĩ</Button>
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
              <Link to="/doi-ngu-chuyen-gia" className="hover:text-blue-600 transition-colors">
                Đội ngũ chuyên gia
              </Link>
              <span>/</span>
              <span className="text-gray-900">{doctor.fullName}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link 
            to="/doi-ngu-chuyen-gia" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách bác sĩ
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Doctor Profile */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <ImageReveal
                        src={doctor.avatarUrl || "/placeholder.svg?height=160&width=160"}
                        alt={doctor.fullName}
                        className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">{doctor.fullName}</h1>
                        <p className="text-blue-100 text-lg mb-3">{doctor.department?.name}</p>
                        {doctor.position && (
                          <Badge className="bg-yellow-500 text-yellow-900 mb-4">
                            {doctor.position}
                          </Badge>
                        )}
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                          {doctor.email && (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2" />
                              {doctor.email}
                            </div>
                          )}
                          {doctor.phoneNumber && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              {doctor.phoneNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Stethoscope className="w-6 h-6 mr-2 text-blue-600" />
                    Giới thiệu
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {doctor.description || "Chưa có thông tin giới thiệu"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-8" />

              {/* Specialties */}
              {doctor.specialties?.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Award className="w-6 h-6 mr-2 text-blue-600" />
                      Chuyên môn
                    </h2>
                    <div className="grid gap-3">
                      {doctor.specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          <span className="text-gray-800">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Separator className="my-8" />

              {/* Experience */}
              {doctor.experience && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                      Kinh nghiệm
                    </h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {doctor.experience}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Separator className="my-8" />

              {/* Working Schedule */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-blue-600" />
                    Lịch làm việc
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Buổi sáng</h3>
                      <p className="text-gray-600">7:30 - 11:30 (Thứ 2 - Thứ 6)</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Buổi chiều</h3>
                      <p className="text-gray-600">13:30 - 17:00 (Thứ 2 - Thứ 6)</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Lưu ý:</strong> Lịch khám có thể thay đổi. Vui lòng liên hệ trước khi đến khám.
                    </p>
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

                    <Button variant="outline" className="w-full py-3">
                      <Phone className="w-4 h-4 mr-2" />
                      Gọi tư vấn: 1900 0000
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Phòng khám: {doctor.department?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-600">Giờ làm việc: 7:30 - 17:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Info */}
              {doctor.department && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Khoa phòng</h3>
                    <div className="text-center">
                      <h4 className="font-semibold text-blue-600 mb-2">{doctor.department.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Chuyên khoa hàng đầu với đội ngũ bác sĩ giàu kinh nghiệm
                      </p>
                      <Link to={`/he-thong-khoa-phong/${doctor.department.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Xem thông tin khoa
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

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
