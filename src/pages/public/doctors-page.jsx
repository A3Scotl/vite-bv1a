import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DoctorCard from "@/components/public/doctor/doctor-card";
import { doctorApi } from "@/apis/doctor-api";
import { handleFetch } from "@/utils/fetch-helper";
import { NewsSection } from "@/components/section/news-section";
// Mock data dựa trên hình ảnh

const specialties = [
  "CHUYÊN NGÀNH",
  "Khoa Ngoại",
  "Khoa Tim mạch",
  "Khoa Nhi",
  "Khoa Thần kinh",
  "Khoa Chấn thương chỉnh hình",
  "Khoa Sản phụ khoa",
];
const positions = [
  "CHỨC VỤ",
  "Giám đốc",
  "Trưởng khoa",
  "Phó trưởng khoa",
  "Bác sĩ",
];

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("CHUYÊN NGÀNH");
  const [selectedPosition, setSelectedPosition] = useState("CHỨC VỤ");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);
  const fetchDoctors = () => {
    handleFetch({
      apiCall: doctorApi.getAllActive,
      setData: setDoctors,
    });
  };
  // const filteredDoctors = useMemo(() => {
  //   return doctors.filter(doctor => {
  //     const matchesSearch = doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                          doctor.department?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                          doctor.description.toLowerCase().includes(searchTerm.toLowerCase())

  //     const matchesSpecialty = selectedSpecialty === "CHUYÊN NGÀNH" || doctor.department?.name === selectedSpecialty
  //     const matchesPosition = selectedPosition === "CHỨC VỤ" || doctor.position === selectedPosition

  //     return matchesSearch && matchesSpecialty && matchesPosition
  //   })
  // }, [searchTerm, selectedSpecialty, selectedPosition,])

  return (
    <div className="lg:px-30 container mx-auto">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-6 md:py-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl uppercase font-bold text-blue-600 mb-2">
              Đội ngũ chuyên gia
            </h1>
            <div className="w-16 h-1 bg-gray-800 mx-auto" aria-hidden="true" />
          </div>

          {/* Filter Dropdowns */}
          <section className="flex flex-wrap items-center justify-center gap-2 py-4">
            <Select
              value={selectedSpecialty}
              onValueChange={setSelectedSpecialty}
            >
              <SelectTrigger
                className="bg-white text-sm md:text-base"
                aria-label="Lọc theo chuyên ngành"
              >
                <SelectValue placeholder="CHUYÊN NGÀNH" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPosition}
              onValueChange={setSelectedPosition}
            >
              <SelectTrigger
                className="bg-white text-sm md:text-base"
                aria-label="Lọc theo chức vụ"
              >
                <SelectValue placeholder="CHỨC VỤ" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Tìm kiếm theo tên bác sĩ, chuyên khoa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-2 md:py-3 text-base md:text-lg bg-white"
                aria-label="Tìm kiếm bác sĩ"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Doctor Cards */}
      <main className="px-4 py-6 md:py-8">
        <div className="space-y-4 md:space-y-6">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center py-12 md:py-16">
              <p className="text-gray-500 text-base md:text-lg">
                Không tìm thấy bác sĩ phù hợp với tiêu chí tìm kiếm
              </p>
              <Button
                variant="outline"
                className="mt-4 text-sm md:text-base"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("CHUYÊN NGÀNH");
                  setSelectedPosition("CHỨC VỤ");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center mt-6 md:mt-8 text-gray-600 text-sm md:text-base">
          {/* Hiển thị {filteredDoctors.length} kết quả */}
        </div>
      </main>
      <NewsSection titleSection={"Bài viết liên quan"}/>
    </div>
  );
};

export default DoctorsPage;
