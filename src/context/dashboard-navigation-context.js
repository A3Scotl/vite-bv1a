// dashboard-navigation-context.js

import {
  LayoutDashboard,
  ClipboardList,
  User,
  Building2,
  FileText,
  BarChart,
  Settings,
} from "lucide-react"

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    url: "/dashboard/posts",
    icon: FileText,

  },

  {
    title: "Appointments",
    url: "/dashboard/appointment",
    icon: ClipboardList,
  },
  {
    title: "Doctors",
    url: "/dashboard/doctors",
    icon: User,
  },
  {
    title: "Departments",
    url: "/dashboard/departments",
    icon: Building2,
  },

  {
    title: "Statistics",
    url: "/dashboard/statistics",
    icon: BarChart,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]
