import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFilter } from "../../../hooks/useFilter";
import { PicService } from "../../../services/pic.service";
import type { Status } from "../../../types/constanst.type";
import { useNavigate } from "react-router-dom";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";
import useModalDelete from "../../../hooks/useModalDelete";
import { useAuthStore } from "../../../stores/authStore";

const useKelolaPic = () => {
  // get user from store
  const user = useAuthStore((state) => state.user);

  // use query client
  const queryClient = useQueryClient();
  // navigate
  const navigate = useNavigate();

  // use filter search
  const { filter: search, setFilter: handleSearch } = useFilter("search");

  //   use filter status
  const { filter: status, setFilter: setStatus } = useFilter("status", [
    "menunggu",
    "revisi",
    "disetujui",
    "semua",
  ]);

  //   call use animation toast
  const { isAnimationOut, isToast, handleSetToast } = useToastAnimation();

  //   query
  const { data: dataPic, isLoading: isLoadingPic } = useQuery({
    queryKey: ["kelola-pic", status, search],
    queryFn: () => PicService.readAll({ status: status as Status, search }),
  });

  //   header table
  const header = [
    {
      label: "jenis dokumentasi",
      key: "namaDokumen",
      size: 30,
    },
    {
      label: "PIC",
      key: "namaTimAkreditasi",
      size: 16.25,
    },
    { label: "Status", key: "status", size: 16.25 },
  ];

  //   header loading
  const headerLoading = [
    {
      label: "jenis dokumentasi",
      size: 30,
    },
    {
      label: "PIC",
      size: 16.25,
    },
    { label: "Riwayat", size: 16.25 },
    { label: "Status", size: 16.25 },
  ];

  // handle detail
  const handleDetailPage = (id: number) => {
    return navigate(
      `/dashboard/${user?.role === "kaprodi" ? "kelola-pic" : "verifikasi-kebutuhan-dokumentasi-pic"}/detail/${id}`,
    );
  };

  // use modal delete
  const {
    handleCloseModalDelete,
    handleShowModalDelete,
    modalDeleteRef,
    idDelete,
  } = useModalDelete();

  //   handle delete
  const { mutateAsync: mutateDelete, isPending: isLoadingDelete } = useMutation(
    {
      mutationFn: async (id: number) => {
        return PicService.delete(id);
      },
      onSuccess: () => {
        // show toast
        handleSetToast("deleted");

        // close modal delete
        handleCloseModalDelete();

        // refetch
        queryClient.invalidateQueries({ queryKey: ["kelola-pic"] });
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

  // handle riwayat
  const handleRiwayat = (id: number) => {
    return navigate(
      `/dashboard/${user?.role === "kaprodi" ? "kelola-kebutuhan-dokumentasi-pic" : "verifikasi-kebutuhan-dokumentasi-pic"}/riwayat/${id}`,
    );
  };

  return {
    handleSearch,
    setStatus,
    header,
    dataPic,
    isLoadingPic,
    handleDetailPage,
    handleRiwayat,
    headerLoading,
    isAnimationOut,
    isToast,
    handleShowModalDelete,
    handleCloseModalDelete,
    modalDeleteRef,
    isLoadingDelete,
    handleDelete,
    user,
  };
};

export default useKelolaPic;
