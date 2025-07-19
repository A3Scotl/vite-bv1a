"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  User,
  Users,
  BarChart,
  Search,
  Building2,
  ClipboardList,
  LogOut,
  UserCircle,
  Bell,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { Link, useLocation } from "react-router-dom"

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Appointments",
    url: "/dashboard/appointment",
    icon: ClipboardList,
    badge: "12",
  },
  {
    title: "Doctors",
    url: "/dashboard/doctors",
    icon: User,
    badge: "3",
  },
  {
    title: "Departments",
    url: "/dashboard/departments",
    icon: Building2,
    badge: null,
  },
  {
    title: "Articles",
    url: "/dashboard/articles",
    icon: FileText,
    badge: null,
  },
  {
    title: "Accounts",
    url: "/dashboard/account",
    icon: Users,
    badge: null,
  },
  {
    title: "Statistics",
    url: "/dashboard/statistics",
    icon: BarChart,
    badge: null,
  },
]

// const settingsMenuItems = [
//   {
//     title: "Settings",
//     url: "/dashboard/settings",
//     icon: Settings,
//     badge: null,
//   },
// ]

export function SidebarDashboard() {
  // const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (url) => location.pathname === url

  return (
    <Sidebar className="border-r border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <SidebarHeader className="px-4 py-0 pt-2 border-b border-border/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">HealthCare</h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs mb-4 font-medium text-muted-foreground/70 uppercase tracking-wider px-2 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-5">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url}
                      className={`
                        flex items-center gap-3 px-3 py-4 rounded-lg text-sm font-medium transition-all
                        ${isActive(item.url) 
                          ? 'bg-primary/20 text-primary border-primary shadow-sm' 
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0.5 h-5 min-w-5">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider px-2 py-2">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${isActive(item.url) 
                          ? 'bg-primary/10 text-primary border-primary shadow-sm' 
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      {/* <SidebarFooter className="border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-2 h-auto hover:bg-accent/50 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="w-8 h-8 border-2 border-border/40">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                side="top" 
                align="start" 
                className="w-64 p-2"
                sideOffset={8}
              >
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  )
}