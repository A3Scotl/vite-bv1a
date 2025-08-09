"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Plus, RefreshCw, Save, Settings, Loader2 } from "lucide-react";
import { siteConfigApi } from "@/apis/site-config-api";

export default function SiteConfig() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changed, setChanged] = useState(false);
  const [formState, setFormState] = useState({
    address: "",
    phoneNumber: "",
    email: "",
    workingHours: "",
    logoFile: null,
    logoUrl: "",
    bannerFiles: [],
    bannerImages: [],
  });
  const [bannerIndex, setBannerIndex] = useState(0);

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const addBannerInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await siteConfigApi.get();
      if (res?.success) {
        setFormState({
          address: res.data.address || "",
          phoneNumber: res.data.phoneNumber || "",
          email: res.data.email || "",
          workingHours: res.data.workingHours || "",
          logoFile: null,
          logoUrl: res.data.logoUrl || "",
          bannerFiles: new Array(res.data.bannerImages?.length || 0).fill(null),
          bannerImages: res.data.bannerImages || [],
        });
      }
    } catch {
      toast.error("Không thể tải cấu hình website");
    } finally {
      setLoading(false);
    }
  };

  // Logo
  const handleLogoClick = () => logoInputRef.current?.click();
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState((prev) => ({
        ...prev,
        logoFile: file,
        logoUrl: URL.createObjectURL(file),
      }));
      setChanged(true);
    }
  };

  // Banner
  const handleBannerReplaceClick = () => bannerInputRef.current?.click();
  const handleBannerFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState((prev) => {
        const newFiles = [...prev.bannerFiles];
        const newImages = [...prev.bannerImages];
        newFiles[bannerIndex] = file;
        newImages[bannerIndex] = URL.createObjectURL(file);
        return { ...prev, bannerFiles: newFiles, bannerImages: newImages };
      });
      setChanged(true);
    }
  };

  // Thêm banner mới
  const handleAddBannerClick = () => addBannerInputRef.current?.click();
  const handleAddBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState((prev) => ({
        ...prev,
        bannerFiles: [...prev.bannerFiles, file],
        bannerImages: [...prev.bannerImages, URL.createObjectURL(file)],
      }));
      setChanged(true);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
    setChanged(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("address", formState.address);
      formData.append("phoneNumber", formState.phoneNumber);
      formData.append("email", formState.email);
      formData.append("workingHours", formState.workingHours);

      if (formState.logoFile) {
        formData.append("logoFile", formState.logoFile);
      } else if (formState.logoUrl) {
        formData.append("logoUrl", formState.logoUrl);
      }

      formState.bannerFiles.forEach((file) => {
        if (file) formData.append("bannerFiles", file);
      });

      formState.bannerImages.forEach((url) => {
        if (typeof url === "string" && !url.startsWith("blob:")) {
          formData.append("bannerUrls", url);
        }
      });

      const res = await siteConfigApi.update(formData);
      if (res.success) {
        toast.success("Cập nhật thành công");
        setChanged(false);
      
        await fetchData();
        setLoading(false);
      } else {
        toast.error(res.message || "Cập nhật thất bại");
        setLoading(false);
      }
    } catch {
      toast.error("Cập nhật thất bại");
      setLoading(false);
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  const navigateBanner = (direction) => {
    setBannerIndex((prev) => {
      const length = formState.bannerImages.length;
      return (prev + direction + length) % length;
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <Skeleton className="h-10 w-40" />
        <div className="grid grid-cols-4 gap-6">
          <Skeleton className="h-40 w-full col-span-1" />
          <Skeleton className="h-40 w-full col-span-3" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Cài đặt
          </CardTitle>
          <CardDescription>Chỉnh sửa thông tin trang web</CardDescription>
        </div>
        {changed && (
          <Button onClick={handleSubmit} size="sm" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Đang lưu..." : "Lưu"}
          </Button>
        )}
      </CardHeader>

      <div className="grid grid-cols-4 gap-6">
        {/* Logo */}
        <Card className="p-4 flex flex-col  items-center">
          <p className="font-semibold mb-2">Logo</p>
          {formState.logoUrl && (
            <img
              src={formState.logoUrl}
              alt="Logo preview"
              className="h-32 object-contain border mb-2 cursor-pointer hover:opacity-80 rounded-lg"
              onClick={handleLogoClick}
            />
          )}
          <input
            type="file"
            ref={logoInputRef}
            className="hidden"
            onChange={handleLogoChange}
            accept="image/*"
          />
        </Card>

        {/* Banner */}
        <Card className="p-4 col-span-3">
          <p className="font-semibold mb-2">Banner</p>
          {formState.bannerImages.length > 0 && (
            <div className="relative w-full h-48 mb-4">
              <img
                src={formState.bannerImages[bannerIndex]}
                alt={`Banner ${bannerIndex + 1}`}
                className="w-full h-full object-cover rounded-lg border"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={handleBannerReplaceClick}
                disabled={saving}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <input
                type="file"
                ref={bannerInputRef}
                className="hidden"
                onChange={handleBannerFileChange}
                accept="image/*"
              />
            </div>
          )}

          {formState.bannerImages.length > 1 && (
            <div className="flex justify-between mb-4">
              <Button size="icon" variant="outline" onClick={() => navigateBanner(-1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => navigateBanner(1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Thêm banner */}
          <Button onClick={handleAddBannerClick} disabled={saving} variant="outline" className="w-full 
           ">
            <Plus className="mr-2 h-4 w-4" /> 
          </Button>
          <input
            type="file"
            ref={addBannerInputRef}
            className="hidden"
            onChange={handleAddBannerChange}
            accept="image/*"
          />
        </Card>
      </div>

      {/* Info */}
      <Card className="p-4 space-y-4">
        {[
          { id: "address", label: "Địa chỉ" },
          { id: "phoneNumber", label: "Số điện thoại" },
          { id: "email", label: "Email" },
          { id: "workingHours", label: "Giờ làm việc" },
        ].map(({ id, label }) => (
          <div key={id}>
            <label className="block font-medium mb-1">{label}</label>
            <Input id={id} value={formState[id]} onChange={handleInputChange} disabled={saving} />
          </div>
        ))}
      </Card>
    </div>
  );
}
