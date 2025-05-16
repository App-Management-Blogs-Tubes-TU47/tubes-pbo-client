import * as React from "react";
import {
  ChartPie,
  // MessageSquareText,
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
import { useAuthStore } from "@/hooks/useAuthStore";

const baseNavigationItems: NavMenuTypes[] = [
  {
    title: "Dashboard",
    isLabel: true,
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartPie,
      },
    ],
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
      // {
      //   title: "Comments",
      //   url: "/blogs/comments",
      //   icon: MessageSquareText,
      // },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { users } = useAuthStore();
  const [navigationItems, setNavigationItems] =
    React.useState<NavMenuTypes[]>(baseNavigationItems);

  React.useEffect(() => {
    if (users?.user?.role === "ADMIN") {
      setNavigationItems((prev) => {
        // Remove existing "Administration" menu if present
        const filtered = prev.filter((item) => item.title !== "Administration");
        return [
          ...filtered,
          {
            title: "Administration",
            isLabel: true,
            items: [
              {
                title: "Users",
                url: "/users",
                icon: Users,
              },
            ],
          },
        ];
      });
    } else {
      // Remove "Administration" menu if not admin
      setNavigationItems((prev) =>
        prev.filter((item) => item.title !== "Administration")
      );
    }
  }, [users?.user?.role]);

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
