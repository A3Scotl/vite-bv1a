import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TextHeaderSection from "@/components/common/text-header-section";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TextHeaderSection title={'LIÊN HỆ VỚI CHÚNG TÔI'}/>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-8 items-start p-10 ">
        {/* Bản đồ */}
        <section
          aria-label="Bản đồ Google Maps"
          className="w-full h-full aspect-[4/3] md:aspect-auto"
        >
          <div className="rounded-xl overflow-hidden shadow-md h-full w-full">
            <iframe
              title="Địa chỉ bệnh viện"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4118753675466!2d106.65153691062065!3d10.779732989324893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe960d12c7b%3A0xde5d38bbbe3c8c55!2zQuG7h25oIFZp4buHbiBQaOG7pWMgSOG7k2kgQ2jhu6ljIE7Eg25n!5e0!3m2!1svi!2s!4v1752802725103!5m2!1svi!2s"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* Form bên phải */}
        <section aria-label="Form liên hệ" className="py-8 px-6 bg-white">
          <form className="space-y-6 w-full">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="09xxxxxxxxx"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Nội dung</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Nhập nội dung liên hệ của bạn..."
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full  md:w-fit">
              Gửi liên hệ
            </Button>
          </form>
        </section>
      </div>
      </div>
    </main>
  );
}
