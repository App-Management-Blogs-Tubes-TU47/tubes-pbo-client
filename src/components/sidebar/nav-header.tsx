import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NavHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:text-sidebar-accent-foreground"
          onClick={() => navigate("/")}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent-foreground/20">
            <PenTool className="h-5 w-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">NulisAja</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
