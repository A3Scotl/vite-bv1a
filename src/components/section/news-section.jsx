import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper, BellRing, Stethoscope } from "lucide-react";
export function NewsSection({titleSection}) {
  return (
    <section className="py-8 px-4 md:px-8 bg-white" aria-label="Tin tức">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-800">
          <Newspaper className="w-6 h-6" />
          {titleSection}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              className="hover:shadow-md transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Tin tức số {item}
                </CardTitle>
                <time
                  dateTime="2025-07-18"
                  className="text-sm text-muted-foreground">
                  18/07/2025
                </time>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  Đây là bản tin sức khỏe số {item}, cập nhật những thông tin y tế mới nhất dành cho cộng đồng.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}