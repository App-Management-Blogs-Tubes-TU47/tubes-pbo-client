
import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useDashboardRouter } from "@/hooks/useDashboardRouter";

const DashboardLayouts: React.FC = () => {
  const { breadcrumbs: bc } = useDashboardRouter();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {bc.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        asChild
                        className={clsx(
                          "text-sm font-medium"
                          // item.isActive && "text-foreground"
                        )}
                      >
                        {bc.length === index + 1 ? (
                          <BreadcrumbPage>
                            {item[0].toUpperCase() +
                              item.slice(1).replace(/-/g, " ")}
                          </BreadcrumbPage>
                        ) : (
                          <Link to={item}>
                            {item[0].toUpperCase() +
                              item.slice(1).replace(/-/g, " ")}
                          </Link>
                        )}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index !== bc.length - 1 && (
                      <BreadcrumbSeparator>
                        <Icon
                          path={mdiChevronRight}
                          size={0.5}
                          className="text-muted-foreground"
                        />
                      </BreadcrumbSeparator>
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayouts;
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import ThemeToggleButton from "@/feature/theme/components/theme-toggle";
// import { useAuthStore } from "@/hooks/useAuthStore";

// import React from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// const DashboardLayouts: React.FC = () => {
//   const { users, clearUsers } = useAuthStore();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const sidebarItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Articles", path: "/articles" },
//     users.user.role === "admin" && {
//       name: "Categories",
//       path: "/categories",
//     },
//     users.user.role === "admin" && { name: "Users", path: "/users" },
//     { name: "Profile", path: "/profile" },
//   ];

//   return (
//     <div className="w-screen h-screen flex flex-row gap-0 overflow-hidden">
//       <div className="w-[22vw] h-screen flex flex-col bg-background border-r">
//         <div className="flex items-center justify-center h-16 border-b">
//           <h1 className="text-2xl font-bold" onClick={() => navigate("/")}>
//             NulisAja
//           </h1>
//         </div>
//         <nav className="flex flex-col gap-4 p-4">
//           {sidebarItems.map((item, index) =>
//             item ? (
//               <a
//                 key={index}
//                 href={item.path}
//                 className="p-2 hover:bg-foreground/10 rounded-md"
//               >
//                 {item.name}
//               </a>
//             ) : null
//           )}
//         </nav>
//       </div>
//       <div className="p-4 w-[78vw] overflow-auto">
//         <div className="flex flex-row justify-between items-center pb-4">
//           <div>
//             {location.pathname?.split("/")?.map((item, index) => {
//               if (index === 0) return null;
//               return (
//                 <span key={index} className="font-semibold text-xl">
//                   {item.charAt(0).toUpperCase() + item.slice(1)}
//                   {index !== location.pathname.split("/").length - 1 && (
//                     <span> / </span>
//                   )}
//                 </span>
//               );
//             })}
//           </div>
//           <div className="space-x-4 flex items-center">
//             <ThemeToggleButton />
//             {users.token ? (
//               <div className="flex items-center space-x-4">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger>
//                     <Button variant={"outline"}>Hi {users.user.name}</Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-56">
//                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuGroup>
//                       <DropdownMenuItem onClick={() => navigate("/dashboard")}>
//                         Dashboard
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => {
//                           clearUsers();
//                           navigate("/signin");
//                         }}
//                       >
//                         Logout
//                       </DropdownMenuItem>
//                     </DropdownMenuGroup>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Button color="primary" onClick={() => navigate("signin")}>
//                   Sign In
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="min-h-[80vh]">
//           <Outlet />
//         </div>
//         <div className="flex-grow"></div>
//         <div className="p-4 border-t">
//           <p className="text-sm text-gray-500 text-center">
//             &copy; {new Date().getFullYear()} NulisAja. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayouts;
