"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"
import { handleFetch } from "@/utils/fetch-helper";
import { appointmentApi } from "@/apis/appointment-api";


const Appointment = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      fetchAppointment();
    }, []);
  const fetchAppointment = async () => {
    handleFetch({
        apiCall: appointmentApi.getAll,
        setData: setAppointment,
        setLoading,
        errorMessage: "Failed to fetch appointment",
      });
  };
  return (
    
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Quản lý đơn đăng kí khám bệnh
          </CardTitle>
          <CardDescription>Manage all patient appointment registrations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nội dung quản lý đơn đăng kí khám bệnh sẽ ở đây. Bạn có thể thêm bảng, form, hoặc các công cụ lọc tại đây.
          </p>
          {/* Example: <Table>...</Table> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default Appointment
