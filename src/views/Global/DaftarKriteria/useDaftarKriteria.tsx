import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { KriteriaService } from "../../../services/kriteria.service";
import { useSearch } from "../../../hooks/useSearch";
import type { ResponseKriteriaType } from "../../../models/kriteria.model";
import { useToastAnimation } from "../../../hooks/useToastAnimationOut";
import { useFilter } from "../../../hooks/useFilter";

const UseDaftarKriteria = () => {
  // use filter
  const { filter: filterStatus, setFilter: setFilterStatus } =
    useFilter("status");
  // query client
  const queryClient = useQueryClient();
  //   modal ref
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalDeleteRef = useRef<HTMLDialogElement>(null);
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
    data: ResponseKriteriaType;
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

  // handle show modal
  const handleShowModal = (index: number) => {
    if (
      dataKriteria &&
      dataKriteria.data &&
      dataKriteria.data?.data.length > 0
    ) {
      const findData = dataKriteria.data.data.find(
        (_item, idx) => idx === index,
      );

      if (findData) {
        setIsShowModal({
          data: findData,
          active: true,
        });
      }

      if (modalRef.current) {
        modalRef.current.showModal();
      }
    }
  };

  // handle close modal
  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }

    // timer
    const timer = setTimeout(() => {
      setIsShowModal({
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
    }, 200);

    return () => clearTimeout(timer);
  };

  // state id delete
  const [idDelete, setIdDelete] = useState<number>(0);

  // handle delete
  const { mutateAsync: mutateDelete, isPending: isLoadingDelete } = useMutation(
    {
      mutationFn: async (id: number) => {
        return KriteriaService.delete(id);
      },
      onSuccess: () => {
        handleSetToast("deleted");

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

  // handle modal delete show
  const handleModalDeleteShow = (id: number) => {
    // set id delete
    setIdDelete(id);

    // show modal
    if (modalDeleteRef.current) {
      modalDeleteRef.current.showModal();
    }
  };

  // handle modal delete close
  const handleModalDeleteClose = () => {
    if (modalDeleteRef.current) {
      modalDeleteRef.current.close();
    }
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
    handleCloseModal,
    handleShowModal,
    header,
    modalRef,
    handleSearch,
    dataKriteria,
    isLoading,
    isToast,
    isAnimationOut,
    isLoadingDelete,
    handleDelete,
    handleModalDeleteShow,
    handleModalDeleteClose,
    modalDeleteRef,
    filterStatus,
    setFilterStatus,
  };
};

export default UseDaftarKriteria;
