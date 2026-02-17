import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KriteriaService } from "../../../services/kriteria.service";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";
import { useFilter } from "../../../hooks/useFilter";
import useModalDelete from "../../../hooks/useModalDelete";
import { useAuthStore } from "../../../stores/authStore";
import { KebutuhanDokumentasiService } from "../../../services/kebutuhanDokumentasi.service";
import type { Status } from "../../../types/constanst.type";

const useKelolaKebutuhanDokumentasi = () => {
  // user
  const user = useAuthStore((state) => state.user);

  // query client
  const queryClient = useQueryClient();

  // use modal delete
  const {
    handleCloseModalDelete,
    handleShowModalDelete,
    idDelete,
    modalDeleteRef,
  } = useModalDelete();

  // use filter status
  const { filter: filterStatus, setFilter: setFilterStatus } = useFilter(
    "status",
    ["menunggu", "revisi", "disetujui"],
  );

  // use filter page
  const { filter: page, setFilter: setPage } = useFilter("page");

  // use search
  const { filter: search, setFilter: handleSearch } = useFilter("search");

  // call use animation toast
  const { isAnimationOut, isToast, handleSetToast } = useToastAnimation();

  // use query
  const { data: dataKebutuhanDokumentasi, isLoading } = useQuery({
    queryKey: ["kelola-kebutuhan-dokumentasi", search, filterStatus, page],
    queryFn: async () =>
      KebutuhanDokumentasiService.readAll({
        search,
        status: filterStatus as Status,
        page,
      }),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const { mutateAsync: mutateDelete, isPending: isLoadingDelete } = useMutation(
    {
      mutationFn: async (id: number) => {
        return KriteriaService.delete(id);
      },
      onSuccess: () => {
        // show toast
        handleSetToast("deleted");

        // close modal delete
        handleCloseModalDelete();

        // refetch
        queryClient.invalidateQueries({ queryKey: ["daftar-kriteria"] });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  // handle delete
  const handleDelete = async () => {
    await mutateDelete(idDelete);
  };

  //   header
  const header = [
    {
      label: "nama dokumentasi",
      key: "namaDokumen",
      size: 20,
    },
    {
      label: "Kriteria",
      key: "kriteria",
      size: 14,
    },
    {
      label: "Pendekatan",
      key: "pendekatan",
      size: 14,
    },
    { label: "Status", key: "status", size: 13 },
  ];

  return {
    header,
    handleSearch,
    dataKebutuhanDokumentasi,
    isLoading,
    isToast,
    isAnimationOut,
    isLoadingDelete,
    handleDelete,
    handleShowModalDelete,
    handleCloseModalDelete,
    modalDeleteRef,
    filterStatus,
    setFilterStatus,
    setPage,
    user,
  };
};

export default useKelolaKebutuhanDokumentasi;
