import Loaders from "@/components/loading/loaders";
import React, { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";

const DashboardPages = React.lazy(
  () => import("../feature/author/pages/dashboard")
);

export const route_auth: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <DashboardPages />
          </Suspense>
        ),
      },
    ],
  },
];
