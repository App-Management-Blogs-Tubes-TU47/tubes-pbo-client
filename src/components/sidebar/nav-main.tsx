import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import React from "react";
import clsx from "clsx";
import { NavMainTypes, NavMenuTypes } from "./types";
import { Link } from "react-router-dom";

export function NavMain({ items }: NavMainTypes) {
  const { isMobile, open } = useSidebar();

  return (
    <SidebarGroup>
      {items.map((dt) =>
        dt.items ? (
          <>
            {dt.isLabel && open && (
              <SidebarGroupLabel>{dt.title}</SidebarGroupLabel>
            )}
            <SidebarMenu className={clsx(open ? "mb-5" : "mb-2")}>
              {dt.items &&
                dt.items.map((item) =>
                  !item.items ? (
                    <SideMenuBtn {...item} />
                  ) : !open ? (
                    <SideMenuDropdown isMobile={isMobile} {...item} />
                  ) : (
                    <SideMenuCollapsed {...item} />
                  )
                )}
              {!open && <SidebarSeparator className="mx-0" />}
            </SidebarMenu>
          </>
        ) : (
          <SidebarMenu>
            <SideMenuBtn {...dt} />
          </SidebarMenu>
        )
      )}
    </SidebarGroup>
  );
}

const SideMenuBtn: React.FC<NavMenuTypes> = (item) => {
  return (
    <Link to={item.url || ''}>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={item.title}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  );
};

export interface SideMenuDropdown extends NavMenuTypes {
  isMobile: boolean;
}

const SideMenuDropdown: React.FC<SideMenuDropdown> = (item) => {
  return (
    <DropdownMenu>
      <SidebarMenuItem>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          side={item.isMobile ? "bottom" : "right"}
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            {item.title}
          </DropdownMenuLabel>
          {item.items &&
            item.items.map((team, ix) => (
              <DropdownMenuItem
                key={ix}
                onClick={() => {}}
                className="gap-2 p-2"
              >
                {team.title}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </SidebarMenuItem>
    </DropdownMenu>
  );
};

const SideMenuCollapsed: React.FC<NavMenuTypes> = (item) => {
  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <a href={subItem.url}>
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </>
    </Collapsible>
  );
};
