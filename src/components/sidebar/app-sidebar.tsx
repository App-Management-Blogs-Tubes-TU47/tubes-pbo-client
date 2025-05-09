import * as React from "react";
import {
  ChartPie,
  MessageSquareText,
  Newspaper,
  PieChart,
  Users,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavHeader } from "./nav-header";
import { NavMenuTypes } from "./types";

const NavigationItems: NavMenuTypes[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartPie,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Blogs",
    isLabel: true,
    items: [
      {
        title: "Blog",
        url: "/blogs/articles",
        icon: Newspaper,
      },
      {
        title: "Blog Categories",
        url: "/blogs/categories",
        icon: PieChart,
      },
      {
        title: "Comments",
        url: "/blogs/comments",
        icon: MessageSquareText,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
