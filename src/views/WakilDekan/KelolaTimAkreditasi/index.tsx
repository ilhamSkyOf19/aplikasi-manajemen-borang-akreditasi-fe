import { type FC } from "react";
import useKelolaTimAkreditasi from "./useKelolaTimAkreditasi";
import Toast from "../../../components/Toast";
import TitlePage from "../../../components/TitlePage";
import InputFieldSearch from "../../../components/inputComponents/InputFieldSearch";
import SkeletonTable from "../../../components/SkeletonTable";
import TableData from "../../../components/TableData";
import Pagination from "../../../components/Pagination";
import ModalDataDetail from "../../../components/modalComponents/ModalDataDetail";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import ModalDaftarAnggota from "../../../components/modalComponents/ModalDaftarAnggota";
import ModalDelete from "../../../components/modalComponents/ModalDelete";

const KelolaTimAkreditasi: FC = () => {
  // call use
  const {
    dataTimAkreditasi,
    handleCloseModalDaftarAnggota,
    handleCloseModalDelete,
    handleShowModalDaftarAnggota,
    handleDelete,
    handleSearch,
    handleShowModalDelete,
    isAnimationOut,
    isLoading,
    isLoadingDelete,
    isToast,
    modalDaftarAnggotaRef,
    modalDeleteRef,
    handleCloseModalDataDetail,
    handleShowModalDataDetail,
    isShowModalDataDetail,
    modalDataDetailRef,
    setPage,
  } = useKelolaTimAkreditasi();
  return (
    <div className="w-full flex flex-col justify-between items-start pb-20 lg:pb-32">
      {/* toast create */}
      <Toast
        toast={isToast === "created"}
        isAnimationOut={isAnimationOut}
        label={"Data Tim Akreditasi berhasil ditambahkan"}
        color="success"
      />
      {/* toast update */}
      <Toast
        toast={isToast === "updated"}
        isAnimationOut={isAnimationOut}
        label={"Data Tim Akreditasi berhasil diubah"}
        color="info"
      />

      {/* toast not updated */}
      <Toast
        toast={isToast === "notUpdated"}
        isAnimationOut={isAnimationOut}
        label={"Data Tim Akreditasi tidak ada perubahan"}
        color="warning"
      />

      {/* toast delete */}
      <Toast
        toast={isToast === "deleted"}
        isAnimationOut={isAnimationOut}
        label={"Data Tim Akreditasi berhasil dihapus"}
        color="error"
      />

      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <TitlePage
          bigTitle="Kelola Daftar Tim Akreditasi"
          smallTitle="Halaman untuk mengelola daftar tim akreditasi pada aplikasi."
          labelAdd="Tambah Tim Akreditasi"
          linkAdd="/dashboard/kelola-tim-akreditasi/tambah-tim-akreditasi"
        />

        <div className="w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-lg">
          {/* input field  search */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-end lg:items-center gap-2">
            <div className="w-full lg:w-1/2">
              {/* input search */}
              <InputFieldSearch
                handleSearch={handleSearch}
                placeholder="Cari berdasarkan nama"
              />
            </div>

            {/* filter role */}
            {/* <div className="w-35 lg:w-50">
              <div className="w-full flex flex-row justify-end items-center">
                <DropDown
                  handleChange={(e) => setFilterRole(e.target.value)}
                  listChoose={[
                    { value: "wakil_dekan_1", label: "Wakil Dekan 1" },
                    { value: "kaprodi", label: "kaprodi" },
                    { value: "tim_akreditasi", label: "Tim Akreditasi" },
                    { value: "semua", label: "Semua" },
                  ]}
                  placeholder="Pilih status"
                />
              </div>
            </div> */}
          </div>

          {/* table data */}
          {isLoading ? (
            <SkeletonTable />
          ) : (
            dataTimAkreditasi?.data && (
              <>
                {/* table data for sm */}
                <div className="w-full lg:hidden">
                  <TableData
                    currentPage={
                      dataTimAkreditasi?.data?.meta?.currentPage || 1
                    }
                    header={[
                      { label: "nama tim", size: 80, key: "namaTimAkreditasi" },
                    ]}
                    datas={
                      dataTimAkreditasi?.data?.data.map((item) => ({
                        fields: { id: item.id, nama: item.namaTimAkreditasi },
                      })) || []
                    }
                    aksiModal={true}
                    handleModal={handleShowModalDataDetail}
                    isDataModalActive={0}
                  />
                </div>

                {/* table for lg  */}
                <div className="w-full hidden lg:flex">
                  <TableData
                    currentPage={
                      dataTimAkreditasi?.data?.meta?.currentPage || 1
                    }
                    header={[
                      {
                        key: "namaTimAkreditasi",
                        label: "Nama Tim",
                        size: 20.5,
                      },
                      {
                        key: "createdAt",
                        label: "Tanggal Dibuat",
                        size: 20.5,
                      },
                    ]}
                    datas={dataTimAkreditasi?.data?.data.map((item) => ({
                      fields: {
                        id: item.id,
                        namaTimAkreditasi: item.namaTimAkreditasi,
                        email: item.createdAt,
                        createdAt: formatTanggalPanjang(item.createdAt),
                      },
                    }))}
                    aksi={true}
                    handleShowModalDelete={handleShowModalDelete}
                    linkUpdate={"kelola-tim-akreditasi/ubah-tim-akreditasi"}
                    fieldAksi={[
                      {
                        header: "Anggota",
                        label: "Lihat anggota",
                        size: 20.5,
                        handleAksiWithParams: handleShowModalDaftarAnggota,
                      },
                    ]}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* pagination */}
      <Pagination
        currentPage={dataTimAkreditasi?.data?.meta.currentPage || 1}
        totalPage={dataTimAkreditasi?.data?.meta.totalPage || 0}
        setPage={setPage}
      />

      {/* modal data detail for sm */}
      <ModalDataDetail
        modalRef={modalDataDetailRef}
        title="Data Detail Tim Akreditasi"
        handleCloseModal={handleCloseModalDataDetail}
        isShowModal={{
          active: isShowModalDataDetail.active,
          data: {
            nama: isShowModalDataDetail?.data?.namaTimAkreditasi || "",
            tanggalDiBuat: formatTanggalPanjang(
              isShowModalDataDetail?.data?.createdAt || "",
            ),
            users:
              isShowModalDataDetail?.data?.user.map((item) => item.nama) || [],
          },
          id: isShowModalDataDetail?.data?.id || 0,
          label: [
            { key: "nama", label: "Nama" },
            { key: "tanggalDiBuat", label: "Tanggal Dibuat" },
            { key: "users", label: "Daftar Anggota", list: true },
          ],
        }}
        linkUpdate={`/dashboard/kelola-tim-akreditasi/ubah-tim-akreditasi/${isShowModalDataDetail?.data?.id || 0}`}
        handleShowModalDelete={handleShowModalDelete}
      />

      {/* modal daftar anggota */}
      <ModalDaftarAnggota
        modalRef={modalDaftarAnggotaRef}
        handleCloseModal={handleCloseModalDaftarAnggota}
        datas={isShowModalDataDetail?.data?.user || []}
        namaTim={isShowModalDataDetail?.data?.namaTimAkreditasi || ""}
      />

      {/* modal delete */}
      <ModalDelete
        handleDelete={handleDelete}
        isLoadingDelete={isLoadingDelete}
        handleCloseModal={handleCloseModalDelete}
        modalRef={modalDeleteRef}
      />
    </div>
  );
};

export default KelolaTimAkreditasi;
