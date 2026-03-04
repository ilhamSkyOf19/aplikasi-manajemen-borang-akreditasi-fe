import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PicService } from "../../../services/pic.service";
import { useAuthStore } from "../../../stores/authStore";
import type {
  ModalUpdateStatusHandle,
  UpdateStatusType,
} from "../../../types/constanst.type";
import { RiwayatService } from "../../../services/riwayat.service";
import { useRef, useState } from "react";
import useModal from "../../../hooks/useModal";

const useKelolaPicDetail = () => {
  // state pending update
  const [isDataPendingUpdate, setIsDataPendingUpdate] =
    useState<UpdateStatusType | null>(null);
  // query client
  const queryClient = useQueryClient();

  // user from store
  const user = useAuthStore((state) => state.user);
  // use modal delete
  const {
    handleCloseModal: handleCloseModalDelete,
    handleShowModal: handleShowModalDelete,
    idModal: idDelete,
    modalRef: modalDeleteRef,
  } = useModal();

  // use modal component
  const modalUpdateStatusComponent = useRef<ModalUpdateStatusHandle>(null);

  // navigate
  const navigate = useNavigate();

  // get id from params
  const { id } = useParams() as { id: string };

  // pathname
  const { pathname: currentPathName } = useLocation();

  // pathname slicing
  const pathname = currentPathName.split("/").slice(0, 4).join("/");

  // query
  const { data: dataPic, isLoading } = useQuery({
    queryKey: ["kelola-pic-detail", id],
    queryFn: () => PicService.readById(+id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  // handle delete
  const { mutateAsync: mutateDelete, isPending: isPendingDelete } = useMutation(
    {
      mutationFn: (data: number) => PicService.delete(data),
      onSuccess: () => {
        // close modal delete
        handleCloseModalDelete();

        // navigate
        return navigate("/dashboard/kelola-pic", {
          state: {
            status: "deleted",
          },
        });
      },
      onError: (error) => console.log(error),
    },
  );

  // handle delete
  const handlePicDelete = async () => {
    try {
      if (idDelete >= 1) {
        return await mutateDelete(idDelete);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // modal ref update
  const {
    modalRef: modalUpdateRef,
    handleShowModal: handleShowModalUpdate,
    handleCloseModal: handleCloseModalUpdate,
  } = useModal();

  // modal konfirmasi
  const {
    modalRef: modalKonfirmasiRevisiRef,
    handleShowModal: handleShowModalKonfirmasiRevisi,
    handleCloseModal: handleCloseModalKonfirmasiRevisi,
  } = useModal();

  // handle update status
  const { mutateAsync: mutateUpdateStatus, isPending: isPendingUpdateStatus } =
    useMutation({
      mutationFn: (data: UpdateStatusType) =>
        RiwayatService.updateStatus(+id, data),
      onSuccess: () => {
        // close modal update
        modalUpdateStatusComponent.current?.handleCloseModal();

        // query client
        queryClient.invalidateQueries({ queryKey: ["kelola-pic-detail"] });
      },
      onError: (error) => {
        console.log(error);
      },
    });

  // handle mutate update
  const handleUpdateStatus = async (data: UpdateStatusType) => {
    try {
      // check status
      if (
        (data.status === "revisi" && dataPic?.data?.status === "revisi") ||
        (data.status === "revisi" && dataPic?.data?.status === "disetujui")
      ) {
        // simpan data ke state pending update
        setIsDataPendingUpdate(data);

        // open modal konfirmasi revisi
        handleShowModalKonfirmasiRevisi();
        return;
      }

      const payload =
        data.status === "disetujui" ? { ...data, flagRevisi: undefined } : data;

      return await mutateUpdateStatus(payload);
    } catch (error) {
      console.log(error);
    }
  };

  // handle modal konfirmasi revisi
  const handleKonfirmasiRevisi = async (isConfirm: boolean) => {
    if (!isConfirm) {
      handleCloseModalKonfirmasiRevisi();
      return;
    }

    if (isDataPendingUpdate) {
      await mutateUpdateStatus(isDataPendingUpdate);
    }

    setIsDataPendingUpdate(null);

    // close modal update status
    modalUpdateStatusComponent.current?.handleCloseModal();

    handleCloseModalKonfirmasiRevisi();
  };

  // handle riwayat
  const handleRiwayat = () => {
    return navigate(
      `/dashboard/${user?.role === "kaprodi" ? "kelola-pic" : "verifikasi-kebutuhan-dokumentasi-pic"}/detail/riwayat/${dataPic?.data?.id}`,
    );
  };

  return {
    pathname,
    dataPic,
    isLoading,
    handlePicDelete,
    isPendingDelete,
    handleShowModalDelete,
    handleCloseModalDelete,
    modalDeleteRef,
    navigate,
    handleRiwayat,
    user,
    handleUpdateStatus,
    isPendingUpdateStatus,
    modalUpdateRef,
    handleShowModalUpdate,
    handleCloseModalUpdate,
    modalKonfirmasiRevisiRef,
    handleShowModalKonfirmasiRevisi,
    handleCloseModalKonfirmasiRevisi,
    handleKonfirmasiRevisi,
    modalUpdateStatusComponent,
  };
};

export default useKelolaPicDetail;
