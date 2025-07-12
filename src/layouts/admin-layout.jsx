"use client"
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export function AdminLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      {" "}
      {/* Sidebar mở mặc định */}
      <Sidebar collapsible="icon" side="left">
        {" "}
        {/* Sidebar thu gọn thành icon */}
        <AdminSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-svh">
          <AdminHeader />
          <main className="flex-grow p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
