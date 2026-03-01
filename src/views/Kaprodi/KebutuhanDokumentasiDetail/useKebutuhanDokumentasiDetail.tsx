import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KebutuhanDokumentasiService } from "../../../services/kebutuhanDokumentasi.service";
import useModalDelete from "../../../hooks/useModalDelete";

const useKebutuhanDokumentasiDetail = () => {
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
  const { data: dataKebutuhanDokumentasi, isLoading } = useQuery({
    queryKey: ["kebutuhan-dokumentasi-detail", id],
    queryFn: () => KebutuhanDokumentasiService.readById(+id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  // handle delete
  const { mutateAsync: mutateDelete, isPending: isPendingDelete } = useMutation(
    {
      mutationFn: (data: number) => KebutuhanDokumentasiService.delete(data),
      onSuccess: () => {
        // close modal delete
        handleCloseModalDelete();

        // navigate
        return navigate("/dashboard/kelola-kebutuhan-dokumentasi", {
          state: {
            status: "deleted",
          },
        });
      },
      onError: (error) => console.log(error),
    },
  );

  // handle delete
  const handleDeleteDataKebutuhanDokumentasi = async () => {
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

  return {
    pathname,
    dataKebutuhanDokumentasi,
    isLoading,
    handleDeleteDataKebutuhanDokumentasi,
    isPendingDelete,
    handleShowModalDelete,
    handleCloseModalDelete,
    modalDeleteRef,
    navigate,
  };
};

export default useKebutuhanDokumentasiDetail;
