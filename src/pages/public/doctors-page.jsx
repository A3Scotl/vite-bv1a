"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
import TextHeaderSection from "../../components/common/text-header-section";

const specialties = [
  "CHUYÊN NGÀNH",
  "Khoa Ngoại",
  "Khoa Tim mạch",
  "Khoa Nhi",
  "Khoa Thần kinh",
  "Khoa Chấn thương chỉnh hình",
  "Khoa Sản phụ khoa",
];
const positions = ["CHỨC VỤ", "Giám đốc", "Trưởng khoa", "Phó trưởng khoa", "Bác sĩ"];

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("CHUYÊN NGÀNH");
  const [selectedPosition, setSelectedPosition] = useState("CHỨC VỤ");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = useCallback(async () => {
    await handleFetch({
      apiCall: doctorApi.getAllActive,
      setData: (data) => setDoctors(data.content || []),
      setLoading,
      errorMessage: "Không thể tải danh sách bác sĩ",
    });
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor.department?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor.description || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "CHUYÊN NGÀNH" || doctor.department?.name === selectedSpecialty;
      const matchesPosition = selectedPosition === "CHỨC VỤ" || doctor.position === selectedPosition;
      return matchesSearch && matchesSpecialty && matchesPosition;
    });
  }, [doctors, searchTerm, selectedSpecialty, selectedPosition]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TextHeaderSection 
      title={'ĐỘI NGŨ CHUYÊN GIA'}
      description={' Đa dạng các chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, sẵn sàng phục vụ mọi nhu cầu chăm sóc sức khỏe của bạn'}
      />
      <header className="bg-white shadow-sm">
        <div className="px-4 py-6 md:py-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl uppercase font-bold text-blue-600 mb-2">
             
            </h1>
            <div className="w-16 h-1 bg-gray-800 mx-auto" aria-hidden="true" />
          </div>


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

      <main className="max-w-5xl mx-auto px-4">
        <div className="space-y-4 md:space-y-6">
          {loading && !filteredDoctors.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse p-4 border rounded-lg">
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredDoctors.length ? (
            filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
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
      </main>
      {/* <NewsSection titleSection="Bài viết liên quan" /> */}
    </div>
  );
};

export default DoctorsPage;