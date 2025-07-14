"use client"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarDashboard } from "@/components/private/sidebar-dashboard"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

const PrivateLayout = () => {
  const { user, loading, logout } = useAuth()

  if (loading) return <div className="flex justify-center py-10">Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarDashboard />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <div className="flex-1 text-lg font-semibold">Dashboard</div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={logout}>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default PrivateLayout
