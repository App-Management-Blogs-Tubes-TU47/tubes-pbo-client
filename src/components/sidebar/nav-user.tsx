import { ChevronsUpDown, LogOut, SunMoon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useThemeStore } from "@/feature/theme/hooks/useTheme";
import { callAlert } from "../custom-alert";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { users, clearUsers } = useAuthStore();
  const { toggleTheme } = useThemeStore();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={users.user.profileUrl || ""}
                  alt={users.user.name}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  {users.user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {users.user.name}
                </span>
                <span className="truncate text-xs">{users.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={users.user?.profileUrl || ""}
                    alt={users.user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">
                    {users.user.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {users.user.name}
                  </span>
                  <span className="truncate text-xs">{users.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={toggleTheme}>
                <SunMoon />
                Change Theme
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                callAlert({
                  title: "Log out",
                  message: "Are you sure you want to log out?",
                  type: "question",
                  onConfirm: (result) => {
                    if (result.isConfirmed) {
                      clearUsers();
                    }
                  },
                });
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
