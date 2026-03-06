import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotifikasiService } from "../../services/notifikasi.service";
import { useEffect, useRef, useState } from "react";

const limit = 3;

const useNavbar = () => {
  // query client
  const queryClient = useQueryClient();

  // state modal notifikasi
  const [isModalNotifikasi, setIsModalNotifikasi] = useState<boolean>(false);

  // handle show modal
  const handleShowModalNotifikasi = () => {
    setIsModalNotifikasi((prev) => !prev);
  };

  // handle close modal
  const handleCloseModalNotifikasi = () => {
    setIsModalNotifikasi(false);
  };

  // modal notifikasi ref
  const modalNotifikasiRef = useRef<HTMLDivElement | null>(null);
  // modal button ref
  const modalButtonRef = useRef<HTMLButtonElement | null>(null);

  // handle click outside modal notifikasi
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalNotifikasiRef.current &&
        !modalNotifikasiRef.current.contains(event.target as Node) &&
        modalButtonRef.current &&
        !modalButtonRef.current.contains(event.target as Node)
      ) {
        handleCloseModalNotifikasi();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // use query
  const { data: dataNotifikasi, isLoading: isLoadingNotifikasi } = useQuery({
    queryKey: ["pemberitahuan", limit],
    queryFn: () =>
      NotifikasiService.readAll({ limit: limit.toString(), isRead: "true" }),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: handleIsRead, isPending: isPendingIsRead } = useMutation(
    {
      mutationFn: (id: number) => NotifikasiService.isRead(id),
      onSuccess: () => {
        // refresh
        return queryClient.invalidateQueries({ queryKey: ["pemberitahuan"] });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return {
    dataNotifikasi: dataNotifikasi?.data,
    isLoadingNotifikasi,
    handleIsRead,
    isPendingIsRead,
    modalNotifikasiRef,
    modalButtonRef,
    isModalNotifikasi,
    handleShowModalNotifikasi,
    handleCloseModalNotifikasi,
  };
};

export default useNavbar;
