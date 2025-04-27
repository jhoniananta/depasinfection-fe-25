// hooks/useUDSRCRegisterMutation.ts
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { removeSessionFile } from "@/lib/utils";
import { ApiError, ApiResponse } from "@/types/api";
import {
  UDSRCRegisterRequest,
  UDSRCRegisterResponse,
} from "@/types/event-register";

export const useUDSRCUpdateMutation = () => {
  return useMutation<
    ApiResponse<UDSRCRegisterResponse>,
    AxiosError<ApiError>,
    UDSRCRegisterRequest
  >({
    mutationFn: async (data) => {
      const response = await api.put<ApiResponse<UDSRCRegisterResponse>>(
        "/user/event/update/udsrc",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Revision successful",
        description: "Your revision has been send!",
        variant: "default",
      });

      removeSessionFile([
        "statementLetter",
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
        title: "Revision failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};
