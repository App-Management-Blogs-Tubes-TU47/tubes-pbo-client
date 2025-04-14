import Loaders from "@/components/loading/loaders";
import DashboardLayouts from "@/layouts/dashboard";
import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const DashboardPages = React.lazy(
  () => import("../feature/dashboard/pages")
);
const UserPages = React.lazy(
  () => import("../feature/users/pages")
); 

export const route_auth: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayouts />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <DashboardPages />
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <UserPages />
          </Suspense>
        ),
      },
    ],
  },
];
