import { useMutation } from "@tanstack/react-query";

import api from "@/lib/api";

import { toast } from "@/hooks/use-toast";
import { ParticipantDetailsChangeRequest } from "@/types/dashboard-admin";
import { useParams, useRouter } from "next/navigation";

export const useChangeStatusOKGD = () => {
  const router = useRouter();
  const params = useParams<{ participant_id: string }>();

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ParticipantDetailsChangeRequest }) => {
      const response = await api.put<ParticipantDetailsChangeRequest>(
        `/admin/event/status/${params.participant_id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: "Status has been updated successfully",
        variant: "default",
      });
      router.push("/admin/okgd");
    },
    onError: (error) => {
      toast({
        title: "Status change has been failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export const useChangeStatusUDSRC = () => {
  const router = useRouter();
  const params = useParams<{ participant_id: string }>();

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: ParticipantDetailsChangeRequest }) => {
      const response = await api.put<ParticipantDetailsChangeRequest>(
        `/admin/event/status/${params.participant_id}`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Status updated",
        description: "Status has been updated successfully",
        variant: "default",
      });
      router.push("/admin/udsrc");
    },
    onError: (error) => {
      toast({
        title: "Status change has been failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
