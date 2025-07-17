import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { Calendar, Stethoscope } from "lucide-react";
const AppointmentDialog = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    timeSlot: "",
    note: "",
    recaptchaToken: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.recaptchaToken) {
      toast.error("Vui lòng xác thực reCAPTCHA");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/v1/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Đặt lịch thành công!");
        setForm({
          fullName: "",
          phone: "",
          email: "",
          date: "",
          timeSlot: "",
          note: "",
          recaptchaToken: "",
        });
        setOpen(false);
      } else {
        toast.error(data.message || "Đặt lịch thất bại.");
      }
    } catch (err) {
      toast.error("Lỗi kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[99vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-blue-600">
            <Stethoscope className="w-6 h-6 mr-2" />
            Đặt lịch khám bệnh
          </DialogTitle>
          <DialogDescription>
            Vui lòng điền đầy đủ thông tin để đặt lịch khám. Chúng tôi sẽ liên
            hệ xác nhận trong thời gian sớm nhất.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">
                Họ và tên *
              </Label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Nguyễn Văn A"
                className="mt-2"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Số điện thoại *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="0912345678"
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="mt-2"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="date" className="text-gray-700 font-medium">
                Ngày khám *
              </Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="mt-2"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="timeSlot" className="text-gray-700 font-medium">
              Khung giờ *
            </Label>
            <select
              id="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn khung giờ</option>
              <option value="07:00-08:00">07:00 - 08:00</option>
              <option value="08:00-09:00">08:00 - 09:00</option>
              <option value="09:00-10:00">09:00 - 10:00</option>
              <option value="10:00-11:00">10:00 - 11:00</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
              <option value="14:00-15:00">14:00 - 15:00</option>
              <option value="15:00-16:00">15:00 - 16:00</option>
              <option value="16:00-17:00">16:00 - 17:00</option>
              <option value="17:00-18:00">17:00 - 18:00</option>
              <option value="18:00-19:00">18:00 - 19:00</option>
            </select>
          </div>

          <div className="form-group">
            <Label htmlFor="note" className="text-gray-700 font-medium">
              Ghi chú
            </Label>
            <Textarea
              id="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Ghi chú thêm nếu có (triệu chứng, yêu cầu đặc biệt...)"
              className="mt-2"
              rows={3}
            />
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LeTYIMrAAAAABwzPa3z7iuGZ058AbPzOAzWyYjI"
              onChange={(token) =>
                setForm((prev) => ({ ...prev, recaptchaToken: token }))
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {loading ? "Đang xử lý..." : "Đặt lịch ngay"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
