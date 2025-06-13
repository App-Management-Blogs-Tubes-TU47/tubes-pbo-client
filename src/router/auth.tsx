import Loaders from "@/components/loading/loaders";
import DashboardLayouts from "@/layouts/dashboard";
import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const DashboardPages = React.lazy(() => import("../feature/dashboard/pages"));
const UserPages = React.lazy(() => import("../feature/users/pages/list"));
const ActionUserPages = React.lazy(
  () => import("../feature/users/pages/action")
);

// Blog Pages
const BlogPages = React.lazy(() => import("../feature/blogs/pages/list"));
const ActionBlogPages = React.lazy(
  () => import("../feature/blogs/pages/action")
);

// Blog Category Pages
const BlogCategoryPages = React.lazy(
  () => import("../feature/blogs-category/pages/list")
);

const ActionBlogCategoryPages = React.lazy(
  () => import("../feature/blogs-category/pages/action")
);

// Profile Pages
const ProfilePages = React.lazy(() => import("../feature/profile/pages/index"));

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
      {
        path: "/users/create",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionUserPages />
          </Suspense>
        ),
      },
      {
        path: "/users/update/:username",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionUserPages is_update />
          </Suspense>
        ),
      },
      {
        path: "/blogs/articles",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <BlogPages />
          </Suspense>
        ),
      },
      {
        path: "/blogs/articles/create",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionBlogPages />
          </Suspense>
        ),
      },
      {
        path: "/blogs/articles/update/:slug",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionBlogPages is_update />
          </Suspense>
        ),
      },

      // Blog Category
      {
        path: "/blogs/categories",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <BlogCategoryPages />
          </Suspense>
        ),
      },
      {
        path: "/blogs/categories/create",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionBlogCategoryPages />
          </Suspense>
        ),
      },
      {
        path: "/blogs/categories/update/:slug",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ActionBlogCategoryPages is_update />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loaders isFullScreen />}>
            <ProfilePages />
          </Suspense>
        )
      }
    ],
  },
];
