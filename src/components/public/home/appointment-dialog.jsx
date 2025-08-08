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
import { Calendar, Stethoscope, AlertCircle } from "lucide-react";

import { handleFetch } from "@/utils/fetch-helper";
import { appointmentApi } from "@/apis/appointment-api";


const MAX_NOTE_LENGTH = 255;

const AppointmentDialog = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    date: "",
    timeSlot: "",
    note: "",
    recaptchaToken: "",
  });
  const [loading, setLoading] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, phone: numericValue.slice(0, 11) }));
      return;
    }

    if (id === "fullName") {
      const nameValue = value.replace(/[^a-zA-ZÀ-ỹ\s]/g, "");
      setForm((prev) => ({ ...prev, fullName: nameValue }));
      return;
    }

    if (id === "note") {
      setForm((prev) => ({ ...prev, note: value.slice(0, MAX_NOTE_LENGTH) }));
      return;
    }

    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!form.fullName.trim()) {
      toast.error("Vui lòng nhập họ tên");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      toast.error("Số điện thoại phải gồm 10 chữ số");
      return false;
    }
    if (!form.date) {
      toast.error("Vui lòng chọn ngày khám");
      return false;
    }
    // so sánh ngày (so với ngày hiện tại)
    const today = new Date(new Date().toISOString().split("T")[0]);
    const chosen = new Date(form.date);
    if (chosen < today) {
      toast.error("Ngày khám phải là hôm nay hoặc sau");
      return false;
    }
    if (!form.timeSlot) {
      toast.error("Vui lòng chọn khung giờ");
      return false;
    }
    if (!form.recaptchaToken) {
      toast.error("Vui lòng xác thực reCAPTCHA");
      return false;
    }
    return true;
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) setConfirmOpen(true);
  };

  const handleSubmit = async () => {
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
          date: "",
          timeSlot: "",
          note: "",
          recaptchaToken: "",
        });
        setOpen(false);
        setConfirmOpen(false);
      } else {
        toast.error(data.message || "Đặt lịch thất bại.");
      }
    } catch {
      toast.error("Lỗi kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[99vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl font-bold text-blue-600">
              <Stethoscope className="w-6 h-6 mr-2" />
              Đặt lịch khám bệnh
            </DialogTitle>
            <DialogDescription>
              Vui lòng điền đầy đủ thông tin để đặt lịch khám.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePreSubmit} className="space-y-6 mt-4">
            {/* Họ tên & SĐT */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Họ và tên *</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại (Zalo) *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="0912345678"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Ngày khám & Khung giờ */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Ngày khám *</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <Label htmlFor="timeSlot">Khung giờ *</Label>
                <select
                  id="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 border rounded-md"
                >
                  <option value="">Chọn khung giờ</option>
                  {[
                    "07:00-08:00",
                    "08:00-09:00",
                    "09:00-10:00",
                    "10:00-11:00",
                    "11:00-12:00",
                    "14:00-15:00",
                    "15:00-16:00",
                    "16:00-17:00",
                    "17:00-18:00",
                    "18:00-19:00",
                  ].map((slot) => (
                    <option key={slot} value={slot}>
                      {slot.replace("-", " - ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ghi chú */}
            <div>
              <Label htmlFor="note">Ghi chú</Label>
              <Textarea
                id="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Ghi chú thêm nếu có..."
                rows={3}
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              />
              <p className="text-sm text-gray-500">
                {form.note.length}/{MAX_NOTE_LENGTH} ký tự
              </p>
            </div>

            {/* Captcha + Skeleton */}
            <div className="flex justify-center">
              {!captchaReady ? (
                // Skeleton placeholder while recaptcha script/component chưa load
                <div className="w-full max-w-[320px] h-[78px] rounded-md bg-gray-200 animate-pulse" />
              ) : (
                <ReCAPTCHA
                  sitekey="6LeTYIMrAAAAABwzPa3z7iuGZ058AbPzOAzWyYjI"
                  onChange={(token) =>
                    setForm((prev) => ({ ...prev, recaptchaToken: token }))
                  }
                  onErrored={() =>
                    setForm((prev) => ({ ...prev, recaptchaToken: "" }))
                  }
                  onExpired={() =>
                    setForm((prev) => ({ ...prev, recaptchaToken: "" }))
                  }
                />
              )}

              {/* ReCAPTCHA script load hook (invisible element trigger) */}
              <div style={{ display: "none" }}>
                {/* This hidden ReCAPTCHA loader sets captchaReady when script finishes */}
                <ReCAPTCHA
                  sitekey="6LeTYIMrAAAAABwzPa3z7iuGZ058AbPzOAzWyYjI"
                  size="invisible"
                  asyncScriptOnLoad={() => setCaptchaReady(true)}
                />
              </div>
            </div>

            {/* Buttons */}
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
                disabled={loading || !form.recaptchaToken || !captchaReady}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {loading ? "Đang xử lý..." : "Đặt lịch ngay"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal xác nhận */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              Xác nhận thông tin
            </DialogTitle>
            <DialogDescription>
              Bạn đã chắc chắn số điện thoại Zalo <strong>{form.phone}</strong>{" "}
              là chính xác chưa?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setConfirmOpen(false)}
            >
              Kiểm tra lại
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Xác nhận đặt lịch"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentDialog;
