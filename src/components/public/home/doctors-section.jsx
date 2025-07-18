"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { doctorApi } from "@/apis/doctor-api";
import { handleFetch } from "@/utils/fetch-helper";
import { Link } from "react-router-dom";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    fetchDoctors();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchDoctors = () => {
    handleFetch({
      apiCall: doctorApi.getAllActive,
      setData: setDoctors,
    });
  };

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setItemsPerView(1);
    } else if (window.innerWidth < 768) {
      setItemsPerView(2);
    } else if (window.innerWidth < 1024) {
      setItemsPerView(3);
    } else {
      setItemsPerView(4);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= doctors.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, doctors.length - itemsPerView) : prev - 1
    );
  };

  const visibleDoctors = doctors.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đội ngũ chuyên gia
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ bác sĩ giàu kinh nghiệm, tận tâm với nghề
          </p>
        </div>

        <div className="relative">
          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {doctor.avatarUrl ? (
                      <img
                        src={doctor.avatarUrl || "/placeholder.svg"}
                        alt={doctor.fullName}
                        className="w-24 h-24 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {doctor.fullName}
                  </h3>

                  <p className="text-blue-600 text-sm mb-2">
                    {doctor.department?.name || "Chuyên khoa"}
                  </p>

                  <p className="text-gray-600 text-sm mb-4">
                    {doctor.position || "Bác sĩ"}
                  </p>

                  <Link to={`/doi-ngu-chuyen-gia/${doctor.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
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
              {Array.from({
                length: Math.ceil(doctors.length / itemsPerView),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= doctors.length}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          {/* View All Button */}
          <div className="text-center mt-8">
            <Link to="/doi-ngu-chuyen-gia">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Xem tất cả bác sĩ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
