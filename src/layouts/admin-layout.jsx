"use client"
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Outlet } from "react-router-dom" // Import Outlet

export function AdminLayout() {
  // Không cần prop children ở đây nữa
  return (
    <SidebarProvider defaultOpen={true}>
      {" "}
      {/* Sidebar mở mặc định */}
      <Sidebar collapsible="icon" side="left">
        {" "}
        {/* Sidebar thu gọn thành icon */}
        <AdminSidebar />
      </Sidebar>
      {/* SidebarInset là thẻ <main> chính, AdminHeader và nội dung trang sẽ nằm trong nó */}
      <SidebarInset className="bg-white rounded-lg shadow-sm">
        {" "}
        {/* Áp dụng style nền trực tiếp cho SidebarInset */}
        <AdminHeader />
        {/* Sử dụng <Outlet /> để render các route con */}
        <div className="flex-grow p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
