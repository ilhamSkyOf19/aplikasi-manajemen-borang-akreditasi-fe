import { type FC } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import useKebutuhanDokumentasiDetail from "./useKebutuhanDokumentasiDetail";
import { Link } from "react-router-dom";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import ModalDelete from "../../../components/modalComponents/ModalDelete";
import FieldDataStatus from "../../../components/FieldStatus";
import FieldDataAction from "../../../components/FieldDataAction";
import FieldDataBasic from "../../../components/FieldDataBasic";
import ButtonUpdateText from "../../../components/buttonComponents/ButtonUpdateText";
import ButtonDeleteTextNonLoading from "../../../components/buttonComponents/ButtonDeleteTextNonLoading";
import ButtonBackBox from "../../../components/buttonComponents/ButtonBackBox";

const KebutuhanDokumentasiDetail: FC = () => {
  // call use
  const {
    pathname,
    dataKebutuhanDokumentasi,
    isLoading,
    handleDeleteDataKebutuhanDokumentasi,
    handleShowModalDelete,
    isPendingDelete,
    modalDeleteRef,
    handleCloseModalDelete,
    navigate,
  } = useKebutuhanDokumentasiDetail();

  return (
    <div className="w-full flex flex-col justify-start items-start pb-40">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={pathname}
          link={[pathname.split("/").slice(0, -1).join("/")]}
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
              {dataKebutuhanDokumentasi?.data?.namaDokumen}
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
                typeData="Kriteria Akreditasi"
                value={`C${dataKebutuhanDokumentasi?.data?.kriteria.kriteria} - ${dataKebutuhanDokumentasi?.data?.kriteria?.namaKriteria}`}
              />

              {/* pendekatan */}
              <FieldDataBasic
                typeData="Pendekatan"
                value={`${dataKebutuhanDokumentasi?.data?.pendekatan?.tahap} - ${dataKebutuhanDokumentasi?.data?.pendekatan?.keterangan}`}
              />

              {/* tanggal buat */}
              <FieldDataBasic
                typeData="Tanggal dibuat"
                value={formatTanggalPanjang(
                  dataKebutuhanDokumentasi?.data?.createdAt ?? new Date(),
                )}
              />

              {/* status */}
              <FieldDataStatus
                typeData="Status Terkini"
                value={dataKebutuhanDokumentasi?.data?.status ?? "menunggu"}
              />

              {/* aksi */}
              <div className="w-full mt-4 flex flex-row justify-end items-center gap-3">
                {/* button kembali */}
                <ButtonBackBox label="Kembali" />

                {dataKebutuhanDokumentasi?.data?.status === "menunggu" && (
                  <>
                    {/* button ubah */}
                    <ButtonUpdateText
                      link={`/dashboard/kelola-kebutuhan-dokumentasi/detail/ubah-kebutuhan-dokumentasi/${dataKebutuhanDokumentasi?.data?.id ?? 0}`}
                    />

                    {/* button delete */}
                    <ButtonDeleteTextNonLoading
                      handleDelete={() =>
                        handleShowModalDelete(
                          dataKebutuhanDokumentasi?.data?.id ?? 0,
                        )
                      }
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* modal delete  */}
      <ModalDelete
        handleDelete={handleDeleteDataKebutuhanDokumentasi}
        isLoadingDelete={isPendingDelete}
        handleCloseModal={handleCloseModalDelete}
        modalRef={modalDeleteRef}
      />
    </div>
  );
};

export default KebutuhanDokumentasiDetail;
