import { useQuery } from "@tanstack/react-query";
import { NotifikasiService } from "../../services/notifikasi.service";

const limit = 3;

const useNavbar = () => {
  // use query
  const { data: dataNotifikasi, isLoading: isLoadingNotifikasi } = useQuery({
    queryKey: ["notifikasi", limit],
    queryFn: () => NotifikasiService.readAll({ limit: limit.toString() }),
    refetchOnWindowFocus: false,
  });

  return { dataNotifikasi: dataNotifikasi?.data, isLoadingNotifikasi };
};

export default useNavbar;
