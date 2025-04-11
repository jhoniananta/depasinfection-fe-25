// hooks/useOKGDRegisterMutation.ts
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { removeSessionFile } from "@/lib/utils";
import { ApiError, ApiResponse } from "@/types/api";
import {
  OKGDRegisterRequest,
  OKGDRegisterResponse,
} from "@/types/event-register";

export const useOKGDRegisterMutation = () => {
  return useMutation<
    ApiResponse<OKGDRegisterResponse>,
    AxiosError<ApiError>,
    OKGDRegisterRequest
  >({
    mutationFn: async (data) => {
      const response = await api.post<ApiResponse<OKGDRegisterResponse>>(
        "/user/event/register/okgd",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Registration successful",
        description: "Your submission has been send!",
        variant: "default",
      });

      removeSessionFile([
        "integrityPact",
        "leaderStudentCard",
        "leaderTwibbonProof",
        "member1StudentCard",
        "member1TwibbonProof",
        "member2StudentCard",
        "member2TwibbonProof",
        "proofOfTransfer",
      ]);
    },

    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};
