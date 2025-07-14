"use client"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarDashboard } from "@/components/private/sidebar-dashboard"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Bell, Search, Settings, LogOut, UserCircle } from "lucide-react"
import {
  Skeleton
} from "@/components/ui/skeleton";

const PrivateLayout = () => {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarDashboard />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
          <SidebarTrigger className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors" />
          
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
            </div>
            
            {/* Desktop Search - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 text-sm border border-border/90 rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative p-2 hover:bg-accent rounded-lg">
                <Bell className="w-4 h-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs p-0"
                >
                  3
                </Badge>
              </Button>
              {/* User Menu - Visible on all screens */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                    <Avatar className="w-8 h-8 border-2 border-border/40">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium truncate max-w-24">
                      {user?.name || "User"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2" sideOffset={8}>
                  <div className="flex items-center gap-3 p-2 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <div className="border-t border-border/40 pt-2">
                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer">
                      <UserCircle className="w-4 h-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={logout}
                      className="flex items-center gap-2 p-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-background/50">
          <div className="container mx-auto p-4 lg:p-6 space-y-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default PrivateLayout