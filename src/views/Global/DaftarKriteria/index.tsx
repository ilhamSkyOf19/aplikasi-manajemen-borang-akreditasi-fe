import { type FC } from "react";
import InputFieldSearch from "../../../components/InputFieldSearch";
import TableData from "../../../components/TableData";
import useDaftarKriteria from "./useDaftarKriteria";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import Pagination from "../../../components/Pagination";
import TitlePage from "../../../components/TitlePage";
import ModalDaftarKriteria from "./ModalDaftarKriteria";

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
        {/* title page */}
        <TitlePage
          bigTitle="Kelola Daftar Kriteria"
          smallTitle="Halaman untuk mengelola daftar kriteria"
          linkAdd="/dashboard/daftar-kriteria/tambah-kriteria"
          labelAdd="Tambah Kriteria"
        />

        <div className="w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-lg">
          {/* input field  search */}
          <div className="w-full flex flex-row justify-start items-center">
            <div className="w-full lg:flex-1">
              <InputFieldSearch />
            </div>

            <div className="flex-1 hidden lg:flex flex-row justify-end items-center" />
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
