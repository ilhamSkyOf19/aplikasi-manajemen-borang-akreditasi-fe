import { type FC } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { Link } from "react-router-dom";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import ModalDelete from "../../../components/modalComponents/ModalDelete";
import useKelolaPicDetail from "./useKelolaPicDetail";
import FieldDataBasic from "../../../components/FieldDataBasic";
import FieldDataAction from "../../../components/FieldDataAction";
import FieldDataStatus from "../../../components/FieldStatus";

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
      <div className="card w-full flex flex-col justify-start items-start lg:w-1/2 bg-white p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
        {/* nama dokumen */}
        <div className="w-full flex flex-col justify-start items-start pb-4 border-b border-primary-black/50">
          {isLoading ? (
            <div className="w-1/2 h-6 rounded-full skeleton" />
          ) : (
            <h1 className="text-base">
              {dataPic?.data?.kebutuhanDokumen.namaDokumen}
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
            <>
              {/* kriteria */}
              <FieldDataBasic
                typeData="PIC"
                value={dataPic?.data?.timAkreditasi.namaTimAkreditasi ?? "-"}
              />

              {/* penanggung jawab */}
              <div className="w-full flex flex-row justify-start items-start">
                {/* type */}
                <span className="text-xs flex-2 lg:text-sm">
                  Penanggung Jawab
                </span>
                <span className="mx-1.5 text-xs lg:text-sm">:</span>
                <div className="flex-3 flex flex-col justify-start items-start gap-1.5">
                  {dataPic?.data?.pj.map((pj) => (
                    <div
                      key={pj.id}
                      className="w-full flex flex-row justify-start items-start gap-1.5"
                    >
                      <span className="text-xs lg:text-sm font-medium">-</span>
                      <span className="text-xs lg:text-sm">{pj.nama}</span>
                    </div>
                  ))}
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
                  className="btn btn-sm"
                >
                  kembali
                </button>

                {user?.role === "wakil_dekan_1" && (
                  <Link
                    to={`/dashboard/verifikasi-kebutuhan-dokumentasi-pic/formulir-verifikasi-kebutuhan-dokumentasi-pic/${dataPic?.data?.id ?? 0}`}
                    type="button"
                    className="btn btn-info btn-sm"
                  >
                    revisi
                  </Link>
                )}

                {user?.role === "kaprodi" &&
                  dataPic?.data?.status !== "disetujui" && (
                    <>
                      {/* button ubah */}
                      <Link
                        to={`/dashboard/kelola-pic/ubah-pic/${dataPic?.data?.id ?? 0}`}
                        type="button"
                        className="btn btn-info btn-sm"
                      >
                        ubah
                      </Link>

                      {/* button delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleShowModalDelete(dataPic?.data?.id ?? 0)
                        }
                        className="btn btn-error btn-sm"
                      >
                        delete
                      </button>
                    </>
                  )}
              </div>
            </>
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
    </div>
  );
};

export default KelolaPicDetail;
