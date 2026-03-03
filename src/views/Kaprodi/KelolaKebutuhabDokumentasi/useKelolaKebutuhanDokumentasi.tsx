import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";
import { useFilter } from "../../../hooks/useFilter";
import { useAuthStore } from "../../../stores/authStore";
import { KebutuhanDokumentasiService } from "../../../services/kebutuhanDokumentasi.service";
import type { Status } from "../../../types/constanst.type";
import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/useModal";

const useKelolaKebutuhanDokumentasi = () => {
  const navigate = useNavigate();
  // user
  const user = useAuthStore((state) => state.user);

  // query client
  const queryClient = useQueryClient();

  // use modal delete
  const {
    handleShowModal: handleCloseModalDelete,
    handleCloseModal: handleShowModalDelete,
    idModal: idDelete,
    modalRef: modalDeleteRef,
  } = useModal();

  // use filter status
  const { filter: status, setFilter: setStatus } = useFilter("status", [
    "menunggu",
    "revisi",
    "disetujui",
    "semua",
  ]);

  // use filter page
  const { filter: page, setFilter: setPage } = useFilter("page");

  // use search
  const { filter: search, setFilter: handleSearch } = useFilter("search");

  // call use animation toast
  const { isAnimationOut, isToast, handleSetToast } = useToastAnimation();

  // use query
  const { data: dataKebutuhanDokumentasi, isLoading } = useQuery({
    queryKey: ["kelola-kebutuhan-dokumentasi", search, status, page],
    queryFn: async () =>
      KebutuhanDokumentasiService.readAll({
        search,
        status: status as Status,
        page,
      }),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const { mutateAsync: mutateDelete, isPending: isLoadingDelete } = useMutation(
    {
      mutationFn: async (id: number) => {
        return KebutuhanDokumentasiService.delete(id);
      },
      onSuccess: () => {
        // show toast
        handleSetToast("deleted");

        // close modal delete
        handleCloseModalDelete();

        // refetch
        queryClient.invalidateQueries({
          queryKey: ["kelola-kebutuhan-dokumentasi"],
        });
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
      size: 25,
    },
    {
      label: "Kriteria",
      key: "kriteria",
      size: 15,
    },
    {
      label: "Pendekatan",
      key: "pendekatan",
      size: 15,
    },
    { label: "Status", key: "status", size: 17 },
    { label: "Tanggal dibuat", key: "tanggalDibuat", size: 17 },
  ];

  //   header loading
  const headerLoading = [
    {
      label: "nama dokumentasi",
      size: 25,
    },
    {
      label: "kriteria",
      size: 15,
    },
    { label: "pendekatan", size: 15 },
    { label: "Tanggal dibuat", size: 17 },
    { label: "Status", size: 17 },
  ];

  // handle detail
  const handleDetailPage = (id: number) => {
    return navigate(`/dashboard/kelola-kebutuhan-dokumentasi/detail/${id}`);
  };

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
    status,
    setStatus,
    setPage,
    user,
    handleDetailPage,
    navigate,
    headerLoading,
  };
};

export default useKelolaKebutuhanDokumentasi;
