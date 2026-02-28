import type { FC } from "react";
import TitlePage from "../../../components/TitlePage";
import InputFieldSearch from "../../../components/inputComponents/InputFieldSearch";
import useKelolaPic from "./useKelolaPic";
import DropDown from "../../../components/DropDown";
import SkeletonTable from "../../../components/SkeletonTable";
import TableData from "../../../components/TableData";
import Toast from "../../../components/Toast";
import ModalDelete from "../../../components/modalComponents/ModalDelete";
import ModalDaftarAnggota from "../../../components/modalComponents/ModalDaftarAnggota";
import ModalKeteranganDokumen from "../../../components/modalComponents/ModalKeteranganDokumen";

const index: FC = () => {
  // call use kelola pic
  const {
    handleSearch,
    setStatus,
    dataPic,
    header,
    isLoadingPic,
    handleDetailPage,
    handleRiwayat,
    headerLoading,
    isAnimationOut,
    isToast,
    handleCloseModalDelete,
    handleShowModalDelete,
    modalDeleteRef,
    handleDelete,
    isLoadingDelete,
    user,
    isDataPicDetail,
    handleCloseModalDaftarPj,
    handleShowModalDaftarPj,
    modalDaftarPjRef,
    handleCloseModalKeterangan,
    handleShowModalKeterangan,
    modalKeteranganRef,
    handleAksiDetail,
  } = useKelolaPic();
  return (
    <div className="w-full flex flex-col justify-between items-start pb-20 lg:pb-32">
      {/* toast create */}
      <Toast
        toast={isToast === "created"}
        isAnimationOut={isAnimationOut}
        label={"Data User berhasil ditambahkan"}
        color="success"
      />
      {/* toast update */}
      <Toast
        toast={isToast === "updated"}
        isAnimationOut={isAnimationOut}
        label={"Data User berhasil diubah"}
        color="info"
      />

      {/* toast not updated */}
      <Toast
        toast={isToast === "notUpdated"}
        isAnimationOut={isAnimationOut}
        label={"Data User tidak ada perubahan"}
        color="warning"
      />

      {/* toast delete */}
      <Toast
        toast={isToast === "deleted"}
        isAnimationOut={isAnimationOut}
        label={"Data User berhasil dihapus"}
        color="error"
      />
      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <TitlePage
          bigTitle={
            user?.role === "kaprodi"
              ? "Kelola Daftar PIC"
              : user?.role === "wakil_dekan_1"
                ? "Verifikasi Kebutuhan Dokumentasi & PIC"
                : ""
          }
          smallTitle={
            user?.role === "kaprodi"
              ? "Halaman untuk mengelola daftar penanggung jawab kebutuhan dokumentasi."
              : user?.role === "wakil_dekan_1"
                ? "Halaman untuk verifikasi daftar kebutuhan dokumentasi dan penanggung jawab (PIC)"
                : ""
          }
          {...(user?.role === "kaprodi" && {
            labelAdd: "Tambah PIC",
            linkAdd: "/dashboard/kelola-pic/tambah-pic",
          })}
        />

        <div className="w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-lg">
          {/* input field  search */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-end lg:items-center gap-2">
            <div className="w-full lg:w-1/2">
              {/* input search */}
              <InputFieldSearch handleSearch={handleSearch} />
            </div>

            {/* filter status */}
            <div className="w-35 lg:w-50">
              <div className="w-full flex flex-row justify-end items-center">
                <DropDown
                  handleChange={(e) => setStatus(e.target.value)}
                  listChoose={[
                    { value: "menunggu", label: "Menunggu" },
                    { value: "revisi", label: "Revisi" },
                    { value: "disetujui", label: "Disetujui" },
                    { value: "semua", label: "Semua" },
                  ]}
                  placeholder="Pilih status"
                />
              </div>
            </div>
          </div>

          {isLoadingPic ? (
            <SkeletonTable
              headerLg={headerLoading}
              headerSm={[
                {
                  label: "jenis dokumentasi",
                  size: 80,
                },
              ]}
              aksi
            />
          ) : (
            dataPic?.data && (
              <>
                {/* table data */}
                <div className="w-full lg:hidden">
                  {/* table data for sm */}
                  <TableData
                    currentPage={dataPic.data.meta.currentPage || 1}
                    header={[
                      {
                        label: "jenis dokumentasi",
                        size: 80,
                        key: "namaDokumen",
                      },
                    ]}
                    datas={dataPic?.data.data.map((item) => ({
                      fields: {
                        id: item.id,
                        namaDokumen: item.kebutuhanDokumen.namaDokumen,
                      },
                    }))}
                    aksiLink={true}
                    handleAksiLink={handleDetailPage}
                  />
                </div>

                {/* table data for lg */}
                <div className="w-full hidden lg:flex">
                  <TableData
                    currentPage={dataPic.data.meta.currentPage || 1}
                    header={header.filter((item) => item.key !== "status")}
                    datas={dataPic?.data.data
                      .filter((item) => item.status)
                      .map((item) => ({
                        fields: {
                          id: item.id,
                          namaDokumen: item.kebutuhanDokumen.namaDokumen,
                          status: item.status,
                          disableAksi:
                            user?.role === "kaprodi" &&
                            item.status === "disetujui"
                              ? {
                                  update: true,
                                  delete: true,
                                }
                              : {},
                        },
                      }))}
                    {...(user?.role === "kaprodi" && {
                      aksi: true,
                      handleShowModalDelete: handleShowModalDelete,
                      linkUpdate: "kelola-pic/ubah-pic",
                    })}
                    {...(user?.role === "wakil_dekan_1" && {
                      aksiDetail: true,
                      handleAksiDetail: handleAksiDetail,
                    })}
                    fieldAksi={[
                      {
                        header: "Keterangan Dokumen",
                        label: "Lihat keterangan",
                        size: 17,

                        handleAksiWithParams: (id: number) =>
                          handleShowModalKeterangan(id),
                      },
                      {
                        header: "PIC",
                        label: "Lihat PIC",
                        size: 17,

                        handleAksiWithParams: (id: number) =>
                          handleShowModalDaftarPj(id),
                      },
                      {
                        header: "Riwayat",
                        label: "Lihat riwayat",
                        size: 17,
                        handleAksiWithParams: (id: number) => handleRiwayat(id),
                      },
                    ]}
                    fieldColor={[
                      {
                        header: "Status",
                        key: "status",
                        size: 17,

                        colorFn: (status: string) =>
                          status === "menunggu"
                            ? "bg-warning"
                            : status === "disetujui"
                              ? "bg-success"
                              : "bg-error",
                      },
                    ]}
                    {...(user?.role === "wakil_dekan_1" && {
                      labelButtonUpdate: "verifikasi",
                    })}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* modal delete */}
      <ModalDelete
        handleDelete={handleDelete}
        isLoadingDelete={isLoadingDelete}
        handleCloseModal={handleCloseModalDelete}
        modalRef={modalDeleteRef}
      />

      {/* modal daftar anggota */}
      <ModalDaftarAnggota
        label="Nama Tim"
        disableAksi={user?.role === "kaprodi"}
        modalRef={modalDaftarPjRef}
        handleCloseModal={handleCloseModalDaftarPj}
        datas={isDataPicDetail?.data?.pj || []}
        title={isDataPicDetail?.data?.timAkreditasi.namaTimAkreditasi || ""}
      />

      {/* modal keterangan dokumen */}
      <ModalKeteranganDokumen
        modalRef={modalKeteranganRef}
        handleCloseModal={handleCloseModalKeterangan}
        datas={{
          id: isDataPicDetail?.data?.kebutuhanDokumen?.id ?? 0,
          namaDokumen:
            isDataPicDetail?.data?.kebutuhanDokumen?.namaDokumen ?? "",
          keterangan: isDataPicDetail?.data?.kebutuhanDokumen?.keterangan ?? "",
          kriteriaDokumen: `C${isDataPicDetail?.data?.kebutuhanDokumen?.kriteria?.kriteria} - ${isDataPicDetail?.data?.kebutuhanDokumen?.kriteria?.namaKriteria}`,
          pendekatanDokumen: `${isDataPicDetail?.data?.kebutuhanDokumen?.pendekatan?.tahap} - ${isDataPicDetail?.data?.kebutuhanDokumen?.pendekatan?.keterangan}`,
        }}
      />
    </div>
  );
};

export default index;
