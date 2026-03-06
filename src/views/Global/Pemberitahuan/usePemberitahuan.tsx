import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFilter } from "../../../hooks/useFilter";
import { NotifikasiService } from "../../../services/notifikasi.service";

const usePemberitahuan = () => {
  // query client
  const queryClient = useQueryClient();
  // filter search
  const { filter: search, setFilter: handleSearch } = useFilter("search");

  // filter is read
  const { filter: isRead, setFilter: setIsRead } = useFilter("isRead", [
    "true",
    "false",
    "semua",
  ]);

  // filte page
  // use page
  const { filter: page, setFilter: setPage } = useFilter("page");

  // use query
  const { data: dataPemberitahuan, isLoading: isLoadingPemberitahuan } =
    useQuery({
      queryKey: ["pemberitahuan", search, isRead, page],
      queryFn: () => NotifikasiService.readAll({ search, isRead, page }),
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
    handleIsRead,
    isPendingIsRead,
    setPage,
  };
};

export default usePemberitahuan;
