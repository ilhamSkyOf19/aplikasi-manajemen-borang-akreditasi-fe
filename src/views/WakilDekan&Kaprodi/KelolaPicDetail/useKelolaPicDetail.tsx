import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useModalDelete from "../../../hooks/useModalDelete";
import { PicService } from "../../../services/pic.service";
import { useAuthStore } from "../../../stores/authStore";

const useKelolaPicDetail = () => {
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

  // handle riwayat
  const handleRiwayat = () => {
    return navigate(
      `/dashboard/${user?.role === "kaprodi" ? "kelola-kebutuhan-dokumentasi-pic" : "verifikasi-kebutuhan-dokumentasi-pic"}/riwayat/${dataPic?.data?.id}`,
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
  };
};

export default useKelolaPicDetail;
