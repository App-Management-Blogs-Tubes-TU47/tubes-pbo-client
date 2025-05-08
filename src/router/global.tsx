import Loaders from "@/components/loading/loaders";
import LandingLayouts from "@/layouts/landing";
import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const LandingPage = React.lazy(() => import("../feature/landing/pages/blog-list"));
const BlogDetailsPage = React.lazy(() => import("../feature/landing/pages/blog-details"));
const AuthorDetailsPage = React.lazy(() => import("../feature/landing/pages/author-details"));

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
      },
      {
        path: "/author/:username",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <AuthorDetailsPage />
          </Suspense>
        ),
      }
    ],
  },
];
