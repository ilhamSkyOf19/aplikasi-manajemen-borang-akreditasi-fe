import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { KriteriaService } from "../../../services/kriteria.service";
import { UseSearch } from "../../../hooks/useSearch";
import { formatTanggalPanjang } from "../../../utils/formatDate";

const UseDaftarKriteria = () => {
  // call use search
  const { handleSearch, search } = UseSearch();

  // use query
  const { data: dataKriteria, isLoading } = useQuery({
    queryKey: ["daftar-kriteria", search],
    queryFn: async () =>
      KriteriaService.readAll({
        search,
      }),
    refetchOnWindowFocus: false,
  });

  // state modal show
  const [isShowModal, setIsShowModal] = useState<{
    data: {
      id: number;
      namaKriteria: string;
      tanggalBuat: string;
      tanggalUbah: string;
      status: string;
    };
    active: boolean;
  }>({
    data: {
      id: 0,
      namaKriteria: "",
      tanggalBuat: "",
      tanggalUbah: "",
      status: "",
    },
    active: false,
  });

  //   modal ref
  const modalRef = useRef<HTMLDialogElement>(null);

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
          data: {
            id: findData.id,
            namaKriteria: findData.namaKriteria,
            tanggalBuat: formatTanggalPanjang(new Date(findData.createdAt)),
            tanggalUbah: formatTanggalPanjang(new Date(findData.updatedAt)),
            status:
              findData.revisi > 0 ? `Revisi ke-${findData.revisi}` : "Baru",
          },
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

    setIsShowModal({
      data: {
        id: 0,
        namaKriteria: "",
        tanggalBuat: "",
        tanggalUbah: "",
        status: "",
      },
      active: false,
    });
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
  };
};

export default UseDaftarKriteria;
