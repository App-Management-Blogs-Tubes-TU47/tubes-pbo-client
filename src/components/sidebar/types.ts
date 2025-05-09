import { LucideIcon } from "lucide-react";

export interface NavMainTypes {
    items: NavMenuTypes[];
  }
  
  export interface NavMenuTypes {
    title: string;
    url?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: NavMenuTypes[];
    isLabel?: boolean;
  }
  