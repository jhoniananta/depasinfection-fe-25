import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import { UserProfile } from "@/types/dashboard-user";

export const useGetProfileQuery = () => {
  return useQuery<UserProfile, AxiosError<ApiError>>({
    queryKey: ["/user/auth/me"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<UserProfile>>("/user/auth/me");

      return res.data.data;
    },
  });
};
