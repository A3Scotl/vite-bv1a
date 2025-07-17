import React from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image */}
        <div className="w-full md:w-48 h-48 md:h-64 bg-gray-100 flex items-center justify-center flex-shrink-0">
          {doctor.avatarUrl ? (
            <img
              src={doctor.avatarUrl}
              alt={doctor.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-16 h-16 md:w-20 md:h-20 text-gray-400" />
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">
                {doctor.fullName}
              </h3>
              <p className="text-gray-600 italic mb-1 text-sm md:text-base">
                {doctor.department?.name || "Không rõ chuyên khoa"}
              </p>
              <p className="text-gray-600 mb-3 text-sm md:text-base">
                {doctor.position || "Chức vụ chưa xác định"}
              </p>
            </div>
          </div>

          <p className="hidden md:block text-gray-700 text-sm leading-relaxed mb-4 line-clamp-none">
            {doctor.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <Link to={`/doi-ngu-chuyen-gia/${doctor.slug}`}>
            <Button
            //   variant="outline"
              className="px-4 py-2 cursor-pointer bg-blue-500 text-white md:px-6 text-sm md:text-base w-full sm:w-auto"
            > XEM CHI TIẾT
              
            </Button>
             
            </Link>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
