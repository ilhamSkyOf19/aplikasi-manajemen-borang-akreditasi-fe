import { useRef, useState } from "react";

// data dumy
const dataDummy = [
  {
    data: {
      id: 1,
      kriteria: "C1",
      namaKriteria: "Budaya Mutu",
      tanggalBuat: "2026-02-08T14:30:45.123Z",
      tanggalUbah: "2026-02-08T14:30:45.123Z",
      status: "Baru",
    },
  },
  {
    data: {
      id: 2,
      kriteria: "C2",
      namaKriteria: "Relevansi Pendidikan",
      tanggalBuat: "2026-02-08T14:30:45.123Z",
      tanggalUbah: "2026-02-08T14:30:45.123Z",
      status: "Baru",
    },
  },
];

const useDaftarKriteria = () => {
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
    const findData = dataDummy.find((_item, idx) => idx === index);

    if (findData) {
      setIsShowModal({
        data: findData.data,
        active: true,
      });
    }

    if (modalRef.current) {
      modalRef.current.showModal();
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
    dataDummy,
    header,
    modalRef,
  };
};

export default useDaftarKriteria;
