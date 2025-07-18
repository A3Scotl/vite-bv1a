// src/pages/DoctorDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doctorApi } from "@/apis/doctor-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { handleFetch } from "@/utils/fetch-helper";
export default function DoctorDetailPage() {
  const { slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      handleFetch({
           apiCall: ()=>doctorApi.getBySlug(slug),
           setData: setDoctor,
           setLoading,
         });
    };

    if (slug) fetchDoctor();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!doctor) {
    return <div className="p-6 text-red-500">Bác sĩ không tồn tại.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={doctor.avatar || "/placeholder.jpg"}
          alt={doctor.fullName}
          className="w-40 h-40 rounded-full object-cover shadow"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold">{doctor.fullName}</h1>
          <p className="text-muted-foreground text-sm">{doctor.department?.name}</p>
          {doctor.position && <Badge>{doctor.position}</Badge>}
          <p className="text-sm text-muted-foreground">{doctor.email}</p>
          <p className="text-sm text-muted-foreground">{doctor.phoneNumber}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Giới thiệu</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {doctor.description || "Chưa có thông tin giới thiệu"}
            </p>
          </div>

          {doctor.specialties?.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Chuyên môn</h2>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {doctor.specialties.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {doctor.experience && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Kinh nghiệm</h2>
              <p className="text-muted-foreground whitespace-pre-line">{doctor.experience}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
