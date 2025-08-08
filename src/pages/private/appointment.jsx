"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { appointmentApi } from "@/apis/appointment-api";
import { handleFetch } from "@/utils/fetch-helper";
import PageHeader from "@/components/private/page-header";
import TableSkeleton from "@/components/private/table/table-skeleton";
import AppointmentTable from "@/components/private/table/appointment-table";
import Pagination from "@/components/common/pagination";
import { motion, AnimatePresence } from "framer-motion";
const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const fetchAppointments = useCallback(async (page = 1) => {
    setIsTableLoading(true);
    await handleFetch({
      apiCall: () => appointmentApi.getAll({ page: page - 1, size: 5 }),
      setData: (data) => {
        setAppointments(data.content || []);
        setTotalPages(Number.isInteger(data.totalPages) ? data.totalPages : 1);
      },
      setLoading: setIsTableLoading,
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
          await fetchAppointments(currentPage);
        } else {
          toast.error(response.message);
        }
        setLoading(false);
      }
    },
    [fetchAppointments, currentPage]
  );

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-8xl">
        <PageHeader
          title="Quản lý đơn đăng ký khám bệnh"
          description="Quản lý tất cả các lịch hẹn của bệnh nhân."
          icon={ClipboardList}
          onAdd={() => {}}
        />
        <CardContent>
          <div>
            <AnimatePresence mode="wait">
              {isTableLoading && appointments.length === 0 ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableSkeleton headers={["", "", "", ""]} rows={5} />
                </motion.div>
              ) : (
                <motion.div
                  key={`page-${currentPage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AppointmentTable
                    appointments={appointments}
                    onDelete={handleDelete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
