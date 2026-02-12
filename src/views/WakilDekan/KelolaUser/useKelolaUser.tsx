import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import { useState } from "react";
import type { PayloadUserType } from "../../../models/user.model";
import { useHandleModalDataDetail } from "../../../hooks/useHandleModalDataDetail";
import useModalDelete from "../../../hooks/useModalDelete";
import { useFilter } from "../../../hooks/useFilter";

const useKelolaUser = () => {
  // use modal delete
  const { handleCloseModalDelete, handleShowModalDelete, modalDeleteRef } =
    useModalDelete();

  // use filter
  const { filter: filterRole, setFilter: setFilterRole } = useFilter("role", [
    "tim_akreditasi",
    "wakil_dekan_1",
    "kaprodi",
    "semua",
  ]);

  // use query
  const { data: dataKelolaUser, isLoading } = useQuery({
    queryKey: ["kelola-user", filterRole],
    queryFn: () => UserService.read({}),
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
  };
};

export default useKelolaUser;
