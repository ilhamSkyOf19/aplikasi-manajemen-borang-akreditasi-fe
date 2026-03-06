import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFilter } from "../../../hooks/useFilter";
import { NotifikasiService } from "../../../services/notifikasi.service";
import { useAuthStore } from "../../../stores/authStore";

const usePemberitahuan = () => {
  // query client
  const queryClient = useQueryClient();
  // get user from store
  const user = useAuthStore((state) => state.user);
  // filter search
  const { filter: search, setFilter: handleSearch } = useFilter("search");

  // filter is read
  const { filter: isRead, setFilter: setIsRead } = useFilter("isRead", [
    "true",
    "false",
    "semua",
  ]);

  // use query
  const { data: dataPemberitahuan, isLoading: isLoadingPemberitahuan } =
    useQuery({
      queryKey: ["pemberitahuan", search, isRead],
      queryFn: () => NotifikasiService.readAll({ search, isRead }),
      refetchOnWindowFocus: false,
    });

  // use mutation
  const { mutateAsync: handleIsRead, isPending: isPendingIsRead } = useMutation(
    {
      mutationFn: (id: number) => NotifikasiService.isRead(id),
      onSuccess: () => {
        // refresh
        return queryClient.invalidateQueries({ queryKey: ["pemberitahuan"] });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return {
    dataPemberitahuan: dataPemberitahuan?.data,
    isLoadingPemberitahuan,
    handleSearch,
    isRead,
    setIsRead,
    user,
    handleIsRead,
    isPendingIsRead,
  };
};

export default usePemberitahuan;
