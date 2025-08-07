// dashboard-navigation-context.js

import {
  LayoutDashboard,
  ClipboardList,
  User,
  Building2,
  FileText,
  BarChart,
} from "lucide-react"

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
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
  },
  {
    title: "Posts",
    icon: FileText,
    children: [
      {
        title: "Introduce Post",
        url: "/dashboard/posts/single",
      },
      {
        title: "Other Post",
        url: "/dashboard/posts",
      },
    ],
  },
  {
    title: "Statistics",
    url: "/dashboard/statistics",
    icon: BarChart,
  },
]
