import React from "react";
import {
  Navigate,
  useRoutes,
  // Navigate
} from "react-router-dom";
import { route_auth } from "./auth";
import { route_unauth } from "./unauth";
import { route_global } from "./global";
import { useAuthStore } from "@/hooks/useAuthStore";

const Routes: React.FC = () => {
  const token = useAuthStore((state) => state.users.token);

  const routes = token ? route_auth : route_unauth;

  return useRoutes([
    ...route_global,
    ...routes,
    {
      path: "*",
      element: <Navigate to={token ? "/dashboard" : "/signin"} replace />,
    },
  ]);
};

export default Routes;
