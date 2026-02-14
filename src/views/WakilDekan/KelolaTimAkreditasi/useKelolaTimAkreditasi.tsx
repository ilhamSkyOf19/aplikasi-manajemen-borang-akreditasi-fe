import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TimAkreditasiService } from "../../../services/timAkreditasi.service";
import { useFilter } from "../../../hooks/useFilter";
import useModalDelete from "../../../hooks/useModalDelete";
import { useHandleModalDataDetail } from "../../../hooks/useHandleModalDataDetail";
import { useState } from "react";
import type { ResponseTimAkreditasiType } from "../../../models/timAkreditasi.model";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";

const useKelolaTimAkreditasi = () => {
  // call use animation toast
  const { isAnimationOut, isToast, handleSetToast } = useToastAnimation();

  // use modal delete
  const {
    handleCloseModalDelete,
    handleShowModalDelete,
    idDelete,
    modalDeleteRef,
  } = useModalDelete();

  // query client
  const queryClient = useQueryClient();

  // search filter
  const { filter: search, setFilter: handleSearch } = useFilter("search");

  // search filter
  const { filter: page, setFilter: setPage } = useFilter("page");

  // query data
  const { data: dataTimAkreditasi, isLoading } = useQuery({
    queryKey: ["kelola-tim-akreditasi", search, page],
    queryFn: () => TimAkreditasiService.readAll({ search, page }),
  });

  // state modal daftar anggota
  const [isShowModalDataDetail, setIsShowModalDataDetail] = useState<{
    data: ResponseTimAkreditasiType | null;
    active: boolean;
  }>({
    data: null,
    active: false,
  });

  // use modal data detail
  const {
    handleCloseModalDetail: handleCloseModalDataDetail,
    handleShowModalDetail: handleShowModalDataDetail,
    modalRef: modalDataDetailRef,
  } = useHandleModalDataDetail<ResponseTimAkreditasiType>({
    dataList: dataTimAkreditasi?.data?.data,
    setIsShowModal: setIsShowModalDataDetail,
  });

  // use modal daftar anggota
  const {
    handleCloseModalDetail: handleCloseModalDaftarAnggota,
    handleShowModalDetail: handleShowModalDaftarAnggota,
    modalRef: modalDaftarAnggotaRef,
  } = useHandleModalDataDetail<ResponseTimAkreditasiType>({
    dataList: dataTimAkreditasi?.data?.data,
    setIsShowModal: setIsShowModalDataDetail,
  });

  // handle delete
  const { mutateAsync: mutateDelete, isPending: isLoadingDelete } = useMutation(
    {
      mutationFn: async (id: number) => {
        return TimAkreditasiService.delete(id);
      },
      onSuccess: () => {
        // show toast
        handleSetToast("deleted");

        // close modal delete
        handleCloseModalDelete();

        // close modal ref
        handleCloseModalDataDetail();

        // refetch
        queryClient.invalidateQueries({ queryKey: ["kelola-tim-akreditasi"] });
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

  // return
  return {
    handleSearch,
    isLoading,
    dataTimAkreditasi,
    handleDelete,
    isLoadingDelete,
    handleCloseModalDelete,
    handleShowModalDelete,
    idDelete,
    modalDeleteRef,
    isShowModalDataDetail,
    handleShowModalDataDetail,
    handleShowModalDaftarAnggota,
    handleCloseModalDaftarAnggota,
    modalDaftarAnggotaRef,
    isAnimationOut,
    isToast,
    handleSetToast,
    handleCloseModalDataDetail,
    modalDataDetailRef,
    setPage,
  };
};

export default useKelolaTimAkreditasi;
