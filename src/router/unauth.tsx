import Loaders from "@/components/loading/loaders";
import React, { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";

const SignInPages = React.lazy(() => import("../feature/auth/pages/signin"));
const SignUpPages = React.lazy(() => import("../feature/auth/pages/signup"));

export const route_unauth: RouteObject[] = [
  {
    path: "",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/signin",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <SignInPages />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <SignUpPages />
          </Suspense>
        ),
      },
    ],
  },
];
