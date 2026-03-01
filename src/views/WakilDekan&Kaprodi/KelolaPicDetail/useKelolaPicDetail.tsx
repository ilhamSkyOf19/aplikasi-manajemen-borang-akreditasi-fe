import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useModalDelete from "../../../hooks/useModalDelete";
import { PicService } from "../../../services/pic.service";
import { useAuthStore } from "../../../stores/authStore";
import { useRef } from "react";
import type { UpdateStatusType } from "../../../types/constanst.type";
import { RiwayatService } from "../../../services/riwayat.service";

const useKelolaPicDetail = () => {
  // query client
  const queryClient = useQueryClient();

  // user from store
  const user = useAuthStore((state) => state.user);
  // use modal delete
  const {
    handleCloseModalDelete,
    handleShowModalDelete,
    idDelete,
    modalDeleteRef,
  } = useModalDelete();

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

  // modal update sucess
  const modalUpdateRef = useRef<HTMLDialogElement | null>(null);

  // handle modal delete show
  const handleShowModalUpdate = () => {
    // show modal
    if (modalUpdateRef.current) {
      modalUpdateRef.current.showModal();
    }
  };

  // handle modal delete close
  const handleCloseModalUpdate = () => {
    if (modalUpdateRef.current) {
      modalUpdateRef.current.close();
    }
  };

  // handle update status
  const { mutateAsync: mutateUpdateStatus, isPending: isPendingUpdateStatus } =
    useMutation({
      mutationFn: (data: UpdateStatusType) =>
        RiwayatService.updateStatus(+id, data),
      onSuccess: (data) => {
        console.log(data);

        // close modal update
        handleCloseModalUpdate();

        // query client
        queryClient.invalidateQueries({ queryKey: ["kelola-pic-detail"] });
      },
      onError: (error) => console.log(error),
    });

  // handle mutate update
  const handleUpdateStatus = async (data: UpdateStatusType) => {
    try {
      return await mutateUpdateStatus(data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle riwayat
  const handleRiwayat = () => {
    return navigate(
      `/dashboard/${user?.role === "kaprodi" ? "kelola-kebutuhan-dokumentasi-pic" : "verifikasi-kebutuhan-dokumentasi-pic"}/detail/riwayat/${dataPic?.data?.id}`,
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
  };
};

export default useKelolaPicDetail;
