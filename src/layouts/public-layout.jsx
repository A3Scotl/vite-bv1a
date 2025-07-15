import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

const PublicLayout = () => {
  const { user } = useAuth();

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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Bệnh viện 1A</h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6 space-y-10">
        <Outlet />

        {/* Form đặt lịch */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 border rounded-lg shadow max-w-2xl mx-auto bg-white"
        >
          <h2 className="text-xl font-semibold">🩺 Đặt lịch khám bệnh</h2>

          <div className="grid gap-2">
            <Label htmlFor="fullName">Họ tên</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="0912345678"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Ngày khám</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timeSlot">Khung giờ</Label>
            <Input
              id="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              required
              placeholder="VD: 9h00 - 10h00"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea
              id="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Ghi chú thêm nếu có..."
            />
          </div>

          <div className="w-full flex justify-center">
            <ReCAPTCHA
              sitekey="6LeTYIMrAAAAABwzPa3z7iuGZ058AbPzOAzWyYjI"
              onChange={(token) =>
                setForm((prev) => ({ ...prev, recaptchaToken: token }))
              }
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đặt lịch ngay"}
          </Button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bệnh viện 1A — Quản trị viên |{" "}
          {!user ? (
            <Link to="/login" className="hover:text-primary underline">
              Đăng nhập
            </Link>
          ) : (
            <Link to="/dashboard" className="hover:text-primary underline">
              Dashboard
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
