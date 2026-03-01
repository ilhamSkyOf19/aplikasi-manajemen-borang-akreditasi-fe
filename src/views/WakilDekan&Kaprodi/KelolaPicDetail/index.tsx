import { type FC } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { Link } from "react-router-dom";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import ModalDelete from "../../../components/modalComponents/ModalDelete";
import useKelolaPicDetail from "./useKelolaPicDetail";
import FieldDataBasic from "../../../components/FieldDataBasic";
import FieldDataAction from "../../../components/FieldDataAction";
import FieldDataStatus from "../../../components/FieldStatus";
import { cn } from "../../../utils/cn";
import ModalStatusDiSetujui from "../../../components/modalComponents/ModalStatusDisetujui";

const KelolaPicDetail: FC = () => {
  // call use
  const {
    pathname,
    dataPic,
    isLoading,
    handlePicDelete,
    handleShowModalDelete,
    isPendingDelete,
    modalDeleteRef,
    handleCloseModalDelete,
    navigate,
    handleRiwayat,
    user,
    handleUpdateStatus,
    isPendingUpdateStatus,
    handleCloseModalUpdate,
    handleShowModalUpdate,
    modalUpdateRef,
  } = useKelolaPicDetail();

  return (
    <div className="w-full flex flex-col justify-start items-start pb-40">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={pathname}
          link={[
            `/dashboard/${user?.role === "kaprodi" ? "kelola-pic" : "verifikasi-kebutuhan-dokumentasi-pic"}`,
          ]}
        />
      </div>

      {/* content detail */}
      <div className="card w-full flex flex-col justify-start items-start lg:w-4/5 bg-white p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
        {/* nama dokumen */}
        <div className="w-full flex flex-col justify-start items-start pb-4 border-b border-primary-black/50">
          {isLoading ? (
            <div className="w-1/2 h-6 rounded-full skeleton" />
          ) : (
            <h1 className="text-base lg:text-lg font-semibold">
              Data Kebutuhan Dokumentasi Dan PIC
            </h1>
          )}
        </div>

        {/* data other */}
        <div className="w-full mt-4 flex flex-col justify-start items-start gap-4">
          {isLoading ? (
            <>
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="w-full flex flex-row justify-start items-start"
                >
                  <div className="flex-2 skeleton h-3.5" />
                  <span className="mx-1.5 text-xs lg:text-sm">:</span>
                  <div className="flex-3 skeleton h-3.5" />
                </div>
              ))}

              {/* skeleton aksi */}
              <div className="w-full flex flex-row justify-end items-center gap-3">
                <div className="w-18 h-9 skeleton" />
                <div className="w-18 h-9 skeleton" />
                <div className="w-18 h-9 skeleton" />
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col justify-start items-start mt-4 gap-5 lg:gap-4">
              {/* nama dokumen */}
              <FieldDataBasic
                typeData="Nama Dokumen"
                value={dataPic?.data?.kebutuhanDokumen.namaDokumen ?? "-"}
              />

              {/* kriteria dokumen */}
              <FieldDataBasic
                typeData="Kriteria Dokumen"
                value={`C${dataPic?.data?.kebutuhanDokumen?.kriteria?.kriteria ?? "-"} - ${dataPic?.data?.kebutuhanDokumen?.kriteria?.namaKriteria ?? "-"}`}
              />

              {/* pendekatan kriteria  */}
              <FieldDataBasic
                typeData="Pendekatan Kriteria Dokumen"
                value={`${dataPic?.data?.kebutuhanDokumen?.pendekatan?.tahap ?? "-"} - ${dataPic?.data?.kebutuhanDokumen?.pendekatan?.keterangan ?? "-"}`}
              />

              {/* keterangan  dokumen  */}
              <FieldDataBasic
                typeData="Keterangan Dokumen"
                value={dataPic?.data?.kebutuhanDokumen?.keterangan ?? "-"}
              />

              {/* nama tim */}
              <FieldDataBasic
                typeData="Nama Tim"
                value={dataPic?.data?.timAkreditasi.namaTimAkreditasi ?? "-"}
              />

              {/* penanggung jawab */}
              <div className="w-full flex flex-row justify-start items-start">
                {/* type */}
                <span className="text-xs flex-2 lg:text-sm">
                  Penanggung Jawab
                </span>
                <span className="mx-1.5 text-xs lg:text-sm">:</span>

                <div className="flex-3">
                  <ol className="pl-4 space-y-3 lg:space-y-2 list-decimal w-full marker:text-xs lg:marker:text-sm">
                    {dataPic?.data?.pj.map((pj) => (
                      <li key={pj.id} className="w-full">
                        <div
                          className={cn(
                            "w-full flex flex-row justify-start items-center ml-1",
                          )}
                        >
                          {/* nama */}
                          <div className="flex flex-row justify-start items-start gap-3">
                            <span className="text-xs lg:text-sm">
                              {pj.nama}
                              {/* aksi */}
                              {user?.role === "wakil_dekan_1" && (
                                <>
                                  <span className="text-xs font-semibold mx-2">
                                    -
                                  </span>

                                  <Link
                                    to={`/dashboard/kelola-user?search=${pj.email}`}
                                    className="text-xs text-primary-purple hover:underline lg:text-sm"
                                  >
                                    Lihat
                                  </Link>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              {/* Riwayat */}
              <FieldDataAction
                typeData="Riwayat"
                label="Lihat riwayat"
                action={handleRiwayat}
              />

              {/* tanggal buat */}
              <FieldDataBasic
                typeData="Tanggal dibuat"
                value={formatTanggalPanjang(
                  dataPic?.data?.createdAt ?? new Date(),
                )}
              />

              {/* status */}
              <FieldDataStatus
                typeData="Status Terkini"
                value={dataPic?.data?.status ?? "menunggu"}
              />

              {/* aksi */}
              <div className="w-full mt-4 flex flex-row justify-end items-center gap-3">
                {/* button kembali */}
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-sm lg:btn-md"
                >
                  kembali
                </button>

                {user?.role === "wakil_dekan_1" && (
                  <>
                    {dataPic?.data?.status !== "disetujui" && (
                      <>
                        {/* setujui */}
                        <button
                          type="button"
                          className="btn btn-success btn-sm lg:btn-md"
                          onClick={() => handleShowModalUpdate()}
                        >
                          setujui
                        </button>
                      </>
                    )}

                    {/* revisi */}
                    <Link
                      to={`/dashboard/verifikasi-kebutuhan-dokumentasi-pic/detail/formulir-verifikasi-kebutuhan-dokumentasi-pic/${dataPic?.data?.id ?? 0}`}
                      type="button"
                      className="btn btn-info btn-sm lg:btn-md"
                    >
                      revisi
                    </Link>
                  </>
                )}

                {user?.role === "kaprodi" &&
                  dataPic?.data?.status !== "disetujui" && (
                    <>
                      {/* button ubah */}
                      <Link
                        to={`/dashboard/kelola-pic/ubah-pic/${dataPic?.data?.id ?? 0}`}
                        type="button"
                        className="btn btn-info btn-sm lg:btn-md"
                      >
                        ubah
                      </Link>

                      {/* button delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleShowModalDelete(dataPic?.data?.id ?? 0)
                        }
                        className="btn btn-error btn-sm lg:btn-md"
                      >
                        delete
                      </button>
                    </>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* modal delete  */}
      <ModalDelete
        handleDelete={handlePicDelete}
        isLoadingDelete={isPendingDelete}
        handleCloseModal={handleCloseModalDelete}
        modalRef={modalDeleteRef}
      />

      {/* modal status */}
      <ModalStatusDiSetujui
        modalRef={modalUpdateRef}
        jenisRiwayat="pic"
        handleAksi={handleUpdateStatus}
        handleCloseModal={handleCloseModalUpdate}
        isLoading={isPendingUpdateStatus}
      />
    </div>
  );
};

export default KelolaPicDetail;
