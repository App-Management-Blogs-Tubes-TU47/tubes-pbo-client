import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const LandingPage = React.lazy(() => import("../feature/landing/pages"));

export const route_global: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LandingPage />
      </Suspense>
    ),
  },
  // {
  //   path: "/",
  //   element: <></>,
  //   children: [

  //   ],
  // },
];
