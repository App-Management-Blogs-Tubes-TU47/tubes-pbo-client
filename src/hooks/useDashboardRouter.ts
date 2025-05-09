import { mdiFileTreeOutline } from "@mdi/js";
import { useLocation } from "react-router-dom";

export interface RouteTypes {
  path: string;
  icon: string;
  name: string;
}

/**
 * for replace uuid
 */
const UUID_REGEX =
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

export const useDashboardRouter = () => {
  const location = useLocation();
  const currentPath = location.pathname.replace(UUID_REGEX, ":id");
  const route: RouteTypes[] = [
    {
      path: "/task-management",
      icon: mdiFileTreeOutline,
      name: "Task Management",
    },
  ];

  const generateBreadcrumbs = () => {
    const breadcrumbs: RouteTypes[] = [];
    route.forEach((item) => {
      if (currentPath.includes(item.path)) {
        breadcrumbs.push(item);
      }
    });
    return breadcrumbs;
  };

  const breadcrumbs = currentPath.split("/").filter((item) => item !== "");

  return {
    route,
    generateBreadcrumbs,
    breadcrumbs,
  };
};