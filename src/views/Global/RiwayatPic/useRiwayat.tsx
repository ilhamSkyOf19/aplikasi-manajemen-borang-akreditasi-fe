import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { RiwayatService } from "../../../services/riwayat.service";
import { useAuthStore } from "../../../stores/authStore";

const useRiwayat = () => {
  // get user from store
  const user = useAuthStore((state) => state.user);

  // get id from params
  const { id } = useParams() as { id: string };

  // query
  const { data: dataRiwayat, isLoading: isLoadingRiwayat } = useQuery({
    queryKey: ["riwayat", id],
    queryFn: () => RiwayatService.readAllByPicId(+id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  // pathname
  const pathname = useLocation().pathname.split("/").slice(0, -1).join("/");

  return { pathname, dataRiwayat, isLoadingRiwayat, user };
};

export default useRiwayat;
