import auth from "@/api/auth";
import {
  DashboardResponse,
  DashboardResponseData,
} from "../types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const fetchDashboardApi = async (): Promise<DashboardResponseData> => {
  const { data } = await auth.get<DashboardResponse>("/dashboard");
  return data.data;
};

export const useDashboard = () => {
  const {
    data: dashboard,
    isLoading: isLoadingDashboard,
    isError: isErrorDashboard,
    error: errorDashboard,
    refetch: refetchDashboard,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardApi,
  });

  return {
    dashboard,
    isLoadingDashboard,
    isErrorDashboard,
    errorDashboard,
    refetchDashboard,
  };
};
