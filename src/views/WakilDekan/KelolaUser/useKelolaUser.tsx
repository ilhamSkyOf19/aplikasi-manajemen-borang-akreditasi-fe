import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import { useState } from "react";
import type { PayloadUserType } from "../../../models/user.model";
import { useHandleModalDataDetail } from "../../../hooks/useHandleModalDataDetail";
import useModalDelete from "../../../hooks/useModalDelete";
import { useFilter } from "../../../hooks/useFilter";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";
import { useSearch } from "../../../hooks/useSearch";

const useKelolaUser = () => {
  // call use search
  const { handleSearch, search } = useSearch();

  // use modal delete
  const {
    handleCloseModalDelete,
    handleShowModalDelete,
    modalDeleteRef,
    idDelete,
  } = useModalDelete();

  // call use animation toast
  const { isAnimationOut, isToast, handleSetToast } = useToastAnimation();

  // query client
  const queryClient = useQueryClient();

  // use filter
  const { filter: filterRole, setFilter: setFilterRole } = useFilter("role", [
    "tim_akreditasi",
    "wakil_dekan_1",
    "kaprodi",
    "semua",
  ]);

  // use query
  const { data: dataKelolaUser, isLoading } = useQuery({
    queryKey: ["kelola-user", filterRole, search],
    queryFn: () => UserService.read({ search: search, role: filterRole }),
    refetchOnWindowFocus: false,
  });

  // state modal show
  const [isShowModal, setIsShowModal] = useState<{
    data: PayloadUserType | null;
    active: boolean;
  }>({
    data: {
      id: 0,
      email: "",
      nama: "",
      role: "tim_akreditasi",
    },
    active: false,
  });

  // use handle modal data detail
  const { handleCloseModalDetail, handleShowModalDetail, modalRef } =
    useHandleModalDataDetail<PayloadUserType>({
      dataList: dataKelolaUser?.data?.data,
      setIsShowModal,
    });

  // handle delete
  const { mutateAsync: mutateDelete, isPending: isLoadingDelete } = useMutation(
    {
      mutationFn: async (id: number) => {
        return UserService.delete(id);
      },
      onSuccess: () => {
        // show toast
        handleSetToast("deleted");

        // close modal delete
        handleCloseModalDelete();

        // close modal ref
        handleCloseModalDetail();

        // refetch
        queryClient.invalidateQueries({ queryKey: ["kelola-user"] });
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

  return {
    dataKelolaUser,
    isLoading,
    isShowModal,
    handleShowModalDetail,
    handleCloseModalDetail,
    modalRef,
    modalDeleteRef,
    handleShowModalDelete,
    handleCloseModalDelete,
    setFilterRole,
    isLoadingDelete,
    isToast,
    isAnimationOut,
    handleDelete,
    handleSearch,
  };
};

export default useKelolaUser;
