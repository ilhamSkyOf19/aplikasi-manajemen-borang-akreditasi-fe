import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { KriteriaService } from "../../../services/kriteria.service";
import { useSearch } from "../../../hooks/useSearch";
import type { ResponseKriteriaType } from "../../../models/kriteria.model";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";
import { useFilter } from "../../../hooks/useFilter";
import { useHandleModalDataDetail } from "../../../hooks/useHandleModalDataDetail";
import useModalDelete from "../../../hooks/useModalDelete";

const UseDaftarKriteria = () => {
  // query client
  const queryClient = useQueryClient();

  // use modal delete
  const {
    handleCloseModalDelete,
    handleShowModalDelete,
    idDelete,
    modalDeleteRef,
  } = useModalDelete();

  // use filter
  const { filter: filterStatus, setFilter: setFilterStatus } = useFilter(
    "status",
    ["baru", "revisi", "semua"],
  );

  // call use animation toast
  const { isAnimationOut, isToast, handleSetToast } = useToastAnimation();

  // call use search
  const { handleSearch, search } = useSearch();

  // use query
  const { data: dataKriteria, isLoading } = useQuery({
    queryKey: ["daftar-kriteria", search, filterStatus],
    queryFn: async () =>
      KriteriaService.readAll({
        search,
        status: filterStatus as "baru" | "revisi",
      }),
    refetchOnWindowFocus: false,
  });

  // state modal show
  const [isShowModal, setIsShowModal] = useState<{
    data: ResponseKriteriaType | null;
    active: boolean;
  }>({
    data: {
      id: 0,
      kriteria: 0,
      namaKriteria: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      revisi: 0,
    },
    active: false,
  });

  // use handle modal data detail
  const { handleCloseModalDetail, handleShowModalDetail, modalRef } =
    useHandleModalDataDetail<ResponseKriteriaType>({
      dataList: dataKriteria?.data?.data,
      setIsShowModal,
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

        // close modal ref
        handleCloseModalDetail();

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
    { label: "Kriteria", key: "kriteria", size: 18 },
    { label: "Nama Kriteria", key: "namaKriteria", size: 18 },
    { label: "Tanggal Buat", key: "tanggalBuat", size: 18 },
    { label: "Tanggal Ubah", key: "tanggalUbah", size: 18 },
    { label: "Status", key: "status", size: 18 },
  ];

  return {
    isShowModal,
    handleCloseModalDetail,
    handleShowModalDetail,
    header,
    modalRef,
    handleSearch,
    dataKriteria,
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
  };
};

export default UseDaftarKriteria;
