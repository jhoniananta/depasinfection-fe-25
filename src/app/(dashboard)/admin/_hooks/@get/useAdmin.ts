import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";
import { ApiResponse } from "@/types/api";

import { OKGDData, UDSRCData } from "@/types/dashboard-admin";
import { EventDetails } from "@/types/dashboard-admin";
import { useParams } from "next/navigation";

export const useAdminOKGDDataQuery = (
  page: number,
  limit: number,
  search: string,
) => {
  return useQuery<OKGDData, Error>({
    queryKey: ["getAllAdminOKGDData", page, limit, search],
    queryFn: async () => {
      const res = await api.get<ApiResponse<OKGDData>>(
        `/admin/event/okgd-participants?page=${page}&limit=${limit}&search=${search}`,
      );
      return res.data.data;
    },
  });
};

export const useAdminUDSRCDataQuery = (
  page: number,
  limit: number,
  search: string,
) => {
  return useQuery<UDSRCData, Error>({
    queryKey: ["getAllAdminUDSRCData", page, limit, search],
    queryFn: async () => {
      const res = await api.get<ApiResponse<UDSRCData>>(
        `/admin/event/udsrc-participants?page=${page}&limit=${limit}&search=${search}`,
      );
      return res.data.data;
    },
  });
};

export const useGetDetailParticipantQuery = () => {
  const params = useParams<{ participant_id: string }>();

  const result = useQuery<EventDetails, Error>({
    queryKey: ["getDetailParticipant", params.participant_id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<EventDetails>>(
        `/admin/event/details/${params.participant_id}`,
      );
      return res.data.data;
    },
    // enabled: !!params.participant_id // hanya jalankan query jika participant_id tersedia
  });

  return result;
};
