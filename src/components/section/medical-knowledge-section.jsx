import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper, BellRing, Stethoscope } from "lucide-react";
export function MedicalKnowledgeSection() {
  return (
    <section
      className="py-8 px-4 md:px-8 bg-white"
      aria-label="Kiến thức Y khoa">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-800">
          <Stethoscope className="w-6 h-6" />
          Kiến thức Y khoa
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card
              key={item}
              className="hover:shadow-md transition-shadow bg-gray-50">
              <CardHeader className="p-0">
                <img
                  src={`/images/medical-${item}.jpg`}
                  alt={`Bài viết y khoa ${item}`}
                  className="rounded-t-lg object-cover w-full h-40"
                  loading="lazy"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold mb-2">
                  Bài viết y khoa {item}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  Tóm tắt nội dung của bài viết số {item}, cung cấp kiến thức y học chính xác và hữu ích.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}