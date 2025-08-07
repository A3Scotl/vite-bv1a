"use client";

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
} from "@/components/ui/sidebar";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import { Link, useLocation } from "react-router-dom";
import { mainMenuItems } from "@/context/dashboard-navigation-context.js";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export function SidebarDashboard() {
  const location = useLocation();

  const isActive = (url) => location.pathname === url;

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
                  {item.children ? (
                    <Collapsible>
                      <SidebarMenuButton asChild>
                        <CollapsibleTrigger asChild>
                          <div
                            className={`
                  flex items-center gap-3 px-3 py-4 font-medium text-muted-foreground 
                  hover:bg-accent hover:text-accent-foreground cursor-pointer w-full
                `}
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="flex-1 truncate">
                              {item.title}
                            </span>
                            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </div>
                        </CollapsibleTrigger>
                      </SidebarMenuButton>

                      <CollapsibleContent>
                        <SidebarMenu className="ml-6 space-y-1 pt-2">
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton asChild>
                                <Link
                                  to={child.url}
                                  className={`block px-3 py-2 rounded-md text-sm transition-all ${
                                    isActive(child.url)
                                      ? "bg-primary/20 text-primary"
                                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                  }`}
                                >
                                  {child.title}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-4 rounded-lg text-sm font-medium transition-all ${
                          isActive(item.url)
                            ? "bg-primary/20 text-primary border-primary shadow-sm"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs px-1.5 py-0.5 h-5 min-w-5"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
