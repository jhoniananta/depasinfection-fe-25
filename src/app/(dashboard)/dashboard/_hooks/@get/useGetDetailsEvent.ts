import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import { EventDetails } from "@/types/dashboard-user";

export const useGetDetailsEventQuery = () => {
  return useQuery<EventDetails, AxiosError<ApiError>>({
    queryKey: ["/user/event/me"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<EventDetails>>("/user/event/me");

      return res.data.data;
    },
  });
};
