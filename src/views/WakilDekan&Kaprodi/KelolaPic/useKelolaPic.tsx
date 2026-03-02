import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFilter } from "../../../hooks/useFilter";
import { PicService } from "../../../services/pic.service";
import type { Status } from "../../../types/constanst.type";
import { useNavigate } from "react-router-dom";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";
import useModalDelete from "../../../hooks/useModalDelete";
import { useAuthStore } from "../../../stores/authStore";
import type { ResponsePicType } from "../../../models/pic.model";
import { useState } from "react";
import { useHandleModalDataDetail } from "../../../hooks/useHandleModalDataDetail";

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
      size: 26,
    },
  ];

  //   header loading
  const headerLoading = [
    {
      label: "jenis dokumentasi",
      size: 16,
    },
    { label: "Keterangan Dokumen", size: 20 },
    { label: "PIC", size: 14 },
    { label: "Riwayat", size: 14 },
    { label: "Status", size: 14 },
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
      `/dashboard/${user?.role === "kaprodi" ? "kelola-pic" : "verifikasi-kebutuhan-dokumentasi-pic"}/riwayat/${id}`,
    );
  };

  const [isDataPicDetail, setIsDataPicDetail] = useState<{
    data: ResponsePicType | null;
    active: boolean;
  }>({
    data: null,
    active: false,
  });

  // use modal daftar pj
  const {
    handleCloseModalDetail: handleCloseModalDaftarPj,
    handleShowModalDetail: handleShowModalDaftarPj,
    modalRef: modalDaftarPjRef,
  } = useHandleModalDataDetail<ResponsePicType>({
    dataList: dataPic?.data?.data,
    setIsShowModal: setIsDataPicDetail,
  });

  // use modal data detail
  const {
    handleCloseModalDetail: handleCloseModalKeterangan,
    handleShowModalDetail: handleShowModalKeterangan,
    modalRef: modalKeteranganRef,
  } = useHandleModalDataDetail<ResponsePicType>({
    dataList: dataPic?.data?.data,
    setIsShowModal: setIsDataPicDetail,
  });

  // handle aksi detail
  const handleAksiDetail = (id: number) => {
    navigate(`/dashboard/verifikasi-kebutuhan-dokumentasi-pic/detail/${id}`);
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
    modalDaftarPjRef,
    handleShowModalDaftarPj,
    handleCloseModalDaftarPj,
    isDataPicDetail,
    handleShowModalKeterangan,
    handleCloseModalKeterangan,
    modalKeteranganRef,
    handleAksiDetail,
  };
};

export default useKelolaPic;
