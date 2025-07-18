import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper, BellRing, Stethoscope } from "lucide-react";
export function NotificationSection() {
  return (
    <section
      className="py-8 px-4 md:px-8 bg-white"
      aria-label="Thông báo quan trọng">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-800">
          <BellRing className="w-6 h-6" />
          Thông báo
        </h2>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              className="bg-gray-50 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Thông báo số {item}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Nội dung thông báo số {item}, liên quan đến lịch khám, hệ thống, hoặc thông tin cần lưu ý.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
