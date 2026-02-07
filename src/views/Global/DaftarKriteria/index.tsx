import { Plus } from "lucide-react";
import { type FC } from "react";
import InputFieldSearch from "../../../components/InputFieldSearch";
import TableData from "../../../components/TableData";
import useDaftarKriteria from "./useDaftarKriteria";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import ModalDaftarKriteria from "./ModalDaftarKriteria";
import Pagination from "../../../components/Pagination";

const DaftarKriteria: FC = () => {
  // call use
  const {
    dataDummy,
    handleCloseModal,
    handleShowModal,
    isShowModal,
    header,
    modalRef,
  } = useDaftarKriteria();

  return (
    <div className="w-full flex flex-col justify-between items-start pb-20">
      <div className="w-full flex flex-col justify-start items-start">
        {/* header */}
        <div className="w-full flex flex-row justify-between items-start">
          <div className="flex flex-col justify-start items-start">
            {/* title */}
            <h2 className="text-lg font-medium">Kelola Daftar Kriteria</h2>

            {/* deskripsi */}
            <p className="text-xs text-primary-black/80">
              Halaman untuk mengelola daftar kriteria
            </p>
          </div>

          {/* btn */}
          <button
            type="button"
            className="bg-primary-purple rounded-full w-10 h-10 flex justify-center items-center hover-overlay lg:w-auto lg:rounded-md lg:px-3 lg:gap-2"
          >
            <Plus className="size-5 text-primary-white lg" />

            <span className="text-sm text-primary-white hidden lg:block">
              Tambah Kriteria
            </span>
          </button>
        </div>

        <div className="w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-lg min-h-[65vh]">
          {/* input field  search */}
          <div className="w-full flex flex-row justify-start items-center">
            <div className="flex-1">
              <InputFieldSearch />
            </div>

            <div className="flex-1 flex flex-row justify-end items-center" />
          </div>

          {/* table data */}
          <div className="w-full lg:hidden">
            {/* table data for sm */}
            <TableData
              header={[
                { label: "nama kriteria", size: 80, key: "namaKriteria" },
              ]}
              datas={dataDummy.map((item) => ({
                fields: {
                  id: item.data.id,
                  namaKriteria: item.data.namaKriteria,
                },
              }))}
              aksiModal={true}
              handleModal={handleShowModal}
              isDataModalActive={isShowModal.data.id}
            />
          </div>

          {/* table data for lg */}
          <div className="w-full hidden lg:flex">
            <TableData
              header={header}
              datas={dataDummy.map((item, _index) => ({
                fields: {
                  ...item.data,
                  tanggalBuat: formatTanggalPanjang(item.data.tanggalBuat),
                  tanggalUbah: formatTanggalPanjang(item.data.tanggalUbah),
                },
              }))}
              aksiModal={true}
              handleModal={handleShowModal}
              isDataModalActive={isShowModal.data.id}
              aksi={true}
            />
          </div>
        </div>
      </div>

      {/* paginaton */}
      <Pagination />

      {/* modal */}
      <ModalDaftarKriteria
        modalRef={modalRef}
        handleCloseModal={handleCloseModal}
        isShowModal={isShowModal}
      />
    </div>
  );
};

export default DaftarKriteria;
