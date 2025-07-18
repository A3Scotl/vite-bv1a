"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { departmentApi } from "@/apis/department-api"
import { handleFetch } from "@/utils/fetch-helper"
import { Link } from "react-router-dom"

const DepartmentsSection = () => {
  const [departments, setDepartments] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    fetchDepartments()
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const fetchDepartments = () => {
    handleFetch({
      apiCall: departmentApi.getAllActive,
      setData: setDepartments,
    })
  }

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setItemsPerView(1)
    } else if (window.innerWidth < 1024) {
      setItemsPerView(2)
    } else {
      setItemsPerView(3)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= departments.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, departments.length - itemsPerView) : prev - 1))
  }

  const visibleDepartments = departments.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hệ thống khoa phòng</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đa dạng các chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm
          </p>
        </div>

        <div className="relative">
        

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleDepartments.map((department) => (
              <Card key={department.id} className="group hover:shadow-lg transition-shadow">
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
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {department.name}
                      </h3>
                    </div>
                  </div>

                  <div
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: department.description }}
                  />

                  <Link to={`/he-thong-khoa-phong/${department.slug}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Xem chi tiết
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
  {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="rounded-full bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(departments.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsPerView) === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= departments.length}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          {/* View All Button */}
          <div className="text-center mt-8">
            <Link to="/he-thong-khoa-phong">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Xem tất cả khoa phòng
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DepartmentsSection
