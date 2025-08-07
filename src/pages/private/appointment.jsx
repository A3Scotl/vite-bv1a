"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { appointmentApi } from "@/apis/appointment-api";
import { handleFetch } from "@/utils/fetch-helper";
import LoadingPage from "@/pages/common/loading-page";
import AppointmentTable from "@/components/private/table/appointment-table";
import Pagination from "@/components/common/pagination";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAppointments = useCallback(async (page = 1) => {
    await handleFetch({
      apiCall: () => appointmentApi.getAll({ page: page - 1, size: 5 }),
      setData: (data) => {
        setAppointments(data.content || []);
        setTotalPages(Number.isInteger(data.totalPages) ? data.totalPages : 1);
      },
      setLoading,
      errorMessage: "Không thể tải danh sách lịch hẹn",
    });
  }, []);

  useEffect(() => {
    fetchAppointments(currentPage);
  }, [fetchAppointments, currentPage]);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Bạn có chắc muốn xóa lịch hẹn này?")) {
        setLoading(true);
        const response = await appointmentApi.delete(id);
        if (response.success) {
          toast.success(response.message);
          fetchAppointments(currentPage);
        } else {
          toast.error(response.message);
        }
        setLoading(false);
      }
    },
    [fetchAppointments, currentPage]
  );

  if (loading && !appointments.length) return <LoadingPage />;

  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Quản lý đơn đăng ký khám bệnh
          </CardTitle>
          <CardDescription>Quản lý tất cả các lịch hẹn của bệnh nhân.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <AppointmentTable appointments={appointments} onDelete={handleDelete} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;