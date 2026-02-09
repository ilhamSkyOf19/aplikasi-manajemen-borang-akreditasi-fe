import { type FC } from "react";
import InputFieldSearch from "../../../components/InputFieldSearch";
import TableData from "../../../components/TableData";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import Pagination from "../../../components/Pagination";
import TitlePage from "../../../components/TitlePage";
import ModalDaftarKriteria from "./ModalDaftarKriteria";
import UseDaftarKriteria from "./useDaftarKriteria";

const DaftarKriteria: FC = () => {
  // call use
  const {
    handleCloseModal,
    handleShowModal,
    isShowModal,
    header,
    modalRef,
    dataKriteria,
    handleSearch,
    isLoading,
  } = UseDaftarKriteria();

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
              <InputFieldSearch handleSearch={handleSearch} />
            </div>

            <div className="flex-1 hidden lg:flex flex-row justify-end items-center" />
          </div>

          {/* check data */}
          {isLoading ? (
            <div className="w-full flex flex-col justify-start items-start gap-2 mt-4">
              <div className="w-full h-11 skeleton" />
              <div className="w-full h-11 skeleton" />
              <div className="w-full h-11 skeleton" />
              <div className="w-full h-11 skeleton" />
              <div className="w-full h-11 skeleton" />
            </div>
          ) : dataKriteria?.data && dataKriteria.data.data.length > 0 ? (
            <>
              {/* table data */}
              <div className="w-full lg:hidden">
                {/* table data for sm */}
                <TableData
                  header={[
                    { label: "nama kriteria", size: 80, key: "namaKriteria" },
                  ]}
                  datas={dataKriteria?.data.data.map((item) => ({
                    fields: {
                      id: item.id,
                      namaKriteria: item.namaKriteria,
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
                  datas={dataKriteria?.data.data.map((item, _index) => ({
                    fields: {
                      ...item,
                      kriteria: `C${item.kriteria}`,
                      tanggalBuat: formatTanggalPanjang(item.createdAt),
                      tanggalUbah: formatTanggalPanjang(item.updatedAt),
                      status:
                        item.revisi > 1 ? `Revisi ke-${item.revisi}` : "Baru",
                    },
                  }))}
                  aksi={true}
                  linkUpdate={"daftar-kriteria/update-kriteria"}
                />
              </div>
            </>
          ) : (
            <div className="w-full flex flex-row justify-center items-center">
              <p className="text-sm text-primary-black/80">
                Data kriteria tidak ditemukan
              </p>
            </div>
          )}
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
