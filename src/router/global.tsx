import Loaders from "@/components/loading/loaders";
import LandingLayouts from "@/layouts/landing";
import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const LandingPage = React.lazy(() => import("../feature/landing/pages"));
const BlogDetailsPage = React.lazy(() => import("../feature/landing/pages/details"));

export const route_global: RouteObject[] = [
  {
    path: "/",
    element: <LandingLayouts />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/blog/:slug",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <BlogDetailsPage />
          </Suspense>
        ),
      }
    ],
  },
];
