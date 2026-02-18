import { type FC } from "react";
import InputFieldSearch from "../../../components/inputComponents/InputFieldSearch";
import TableData from "../../../components/TableData";
import Pagination from "../../../components/Pagination";
import TitlePage from "../../../components/TitlePage";
import Toast from "../../../components/Toast";
import ModalDelete from "../../../components/modalComponents/ModalDelete";
import SkeletonTable from "../../../components/SkeletonTable";
import DropDown from "../../../components/DropDown";
import { cn } from "../../../utils/cn";
import useKelolaKebutuhanDokumentasi from "./useKelolaKebutuhanDokumentasi";

const KelolaKebutuhanDokumentasi: FC = () => {
  // call use
  const {
    header,
    dataKebutuhanDokumentasi,
    handleSearch,
    isLoading,
    isToast,
    isAnimationOut,
    modalDeleteRef,
    handleDelete,
    isLoadingDelete,
    handleShowModalDelete,
    handleCloseModalDelete,
    setStatus,
    setPage,
    user,
  } = useKelolaKebutuhanDokumentasi();

  return (
    <div className="w-full flex flex-col justify-between items-start pb-20">
      {user?.role === "kaprodi" && (
        <>
          {/* toast create */}
          <Toast
            toast={isToast === "created"}
            isAnimationOut={isAnimationOut}
            label={"Data Kebutuhan Dokumentasi berhasil ditambahkan"}
            color="success"
          />
          {/* toast update */}
          <Toast
            toast={isToast === "updated"}
            isAnimationOut={isAnimationOut}
            label={"Data Kebutuhan Dokumentasi berhasil diubah"}
            color="info"
          />

          {/* toast not updated */}
          <Toast
            toast={isToast === "notUpdated"}
            isAnimationOut={isAnimationOut}
            label={"Data Kebutuhan Dokumentasi tidak ada perubahan"}
            color="warning"
          />

          {/* toast delete */}
          <Toast
            toast={isToast === "deleted"}
            isAnimationOut={isAnimationOut}
            label={"Data Kebutuhan Dokumentasi berhasil dihapus"}
            color="error"
          />
        </>
      )}

      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <TitlePage
          bigTitle="Kelola Kebutuhan Dokumentasi"
          smallTitle="Halaman untuk mengelola kebutuhan dokumentasi"
          {...(user?.role === "kaprodi" && {
            labelAdd: "Tambah Kebutuhan Dokumentasi",
            linkAdd:
              "/dashboard/kelola-kebutuhan-dokumentasi/tambah-kebutuhan-dokumentasi",
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

            <div
              className={cn(
                "w-30 lg:w-40",
                user?.role !== "wakil_dekan_1" && "hidden",
              )}
            >
              <div className="w-full flex flex-row justify-end items-center">
                <DropDown
                  handleChange={(e) => setStatus(e.target.value)}
                  listChoose={[
                    { value: "baru", label: "Baru" },
                    { value: "revisi", label: "Revisi" },
                    { value: "semua", label: "Semua" },
                  ]}
                  placeholder="Pilih status"
                />
              </div>
            </div>
          </div>

          {/* check data */}
          {isLoading ? (
            <SkeletonTable />
          ) : (
            dataKebutuhanDokumentasi?.data && (
              <>
                {/* table data */}
                <div className="w-full lg:hidden">
                  {/* table data for sm */}
                  <TableData
                    currentPage={
                      dataKebutuhanDokumentasi.data.meta.currentPage || 1
                    }
                    header={[
                      {
                        label: "nama dokumentasi",
                        size: 80,
                        key: "namaDokumen",
                      },
                    ]}
                    datas={dataKebutuhanDokumentasi?.data.data.map((item) => ({
                      fields: {
                        id: item.id,
                        namaDokumen: item.namaDokumen,
                      },
                    }))}
                    aksiModal={true}
                    handleModal={() => {}}
                    // isDataModalActive={isShowModal && isShowModal?.data?.id}
                  />
                </div>

                {/* table data for lg */}
                <div className="w-full hidden lg:flex">
                  <TableData
                    currentPage={
                      dataKebutuhanDokumentasi.data.meta.currentPage || 1
                    }
                    header={header.filter((item) => item.key !== "status")}
                    datas={dataKebutuhanDokumentasi?.data.data
                      .filter((item) => item.status)
                      .map((item) => ({
                        fields: {
                          ...item,
                          pendekatan: `${item.pendekatan.tahap} - ${item.pendekatan.keterangan}`,
                          kriteria: `C${item.kriteria.kriteria} - ${item.kriteria.namaKriteria}`,
                        },
                      }))}
                    aksi={true}
                    handleShowModalDelete={handleShowModalDelete}
                    linkUpdate="kelola-kebutuhan-dokumentasi/ubah-kebutuhan-dokumentasi"
                    fieldAksi={[
                      {
                        header: "Riwayat",
                        label: "Lihat riwayat",
                        size: 13,
                        handleAksiWithParams: () => {},
                      },
                      {
                        header: "Detail",
                        label: "Lihat detail",
                        size: 13,
                        handleAksiWithParams: () => {},
                      },
                    ]}
                    fieldColor={[
                      {
                        header: "Status",
                        key: "status",
                        size: 13,
                        colorFn: (status: string) =>
                          status === "menunggu"
                            ? "bg-warning"
                            : status === "disetujui"
                              ? "bg-success"
                              : "bg-error",
                      },
                    ]}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* paginaton */}
      <Pagination
        currentPage={dataKebutuhanDokumentasi?.data?.meta.currentPage || 1}
        totalPage={dataKebutuhanDokumentasi?.data?.meta.totalPage || 0}
        setPage={setPage}
      />

      {/* modal delete  */}
      <ModalDelete
        handleDelete={handleDelete}
        isLoadingDelete={isLoadingDelete}
        handleCloseModal={handleCloseModalDelete}
        modalRef={modalDeleteRef}
      />
    </div>
  );
};

export default KelolaKebutuhanDokumentasi;
