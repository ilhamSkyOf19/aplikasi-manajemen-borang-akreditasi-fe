import { type FC } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import useKebutuhanDokumentasiDetail from "./useKebutuhanDokumentasiDetail";
import { Link } from "react-router-dom";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import type { Status } from "../../../types/constanst.type";
import { cn } from "../../../utils/cn";
import ModalDelete from "../../../components/modalComponents/ModalDelete";

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
          link={["/dashboard/kelola-kebutuhan-dokumentasi"]}
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
              <FieldData
                typeData="Kriteria Akreditasi"
                value={`C-${dataKebutuhanDokumentasi?.data?.kriteria.kriteria} (${dataKebutuhanDokumentasi?.data?.kriteria?.namaKriteria})`}
              />

              {/* pendekatan */}
              <FieldData
                typeData="Pendekatan"
                value={`${dataKebutuhanDokumentasi?.data?.pendekatan?.tahap} - ${dataKebutuhanDokumentasi?.data?.pendekatan?.keterangan}`}
              />

              {/* Riwayat */}
              <FieldDataLink
                typeData="Riwayat"
                label="Lihat riwayat"
                link="/"
              />

              {/* tanggal buat */}
              <FieldData
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
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-sm btn-soft"
                >
                  kembali
                </button>

                {/* button ubah */}
                <Link
                  to={`/dashboard/kelola-kebutuhan-dokumentasi/ubah-kebutuhan-dokumentasi/${dataKebutuhanDokumentasi?.data?.id ?? 0}`}
                  type="button"
                  className="btn btn-info btn-sm btn-soft"
                >
                  ubah
                </Link>

                {/* button delete */}
                <button
                  type="button"
                  onClick={() =>
                    handleShowModalDelete(
                      dataKebutuhanDokumentasi?.data?.id ?? 0,
                    )
                  }
                  className="btn btn-soft btn-error btn-sm"
                >
                  delete
                </button>
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

// field data modal
type FieldDataProps = {
  typeData: string;
  value: string;
};

const FieldData: FC<FieldDataProps> = ({ typeData, value }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <span className="text-xs flex-3 lg:text-sm">{value}</span>
    </div>
  );
};

// field data link
type FieldDataLinkProps = {
  typeData: string;
  label: string;
  link: string;
};

const FieldDataLink: FC<FieldDataLinkProps> = ({ typeData, label, link }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <Link to={link} className="text-xs flex-3 lg:text-sm text-primary-purple">
        {label}
      </Link>
    </div>
  );
};

// field status
type FieldDataStatus = {
  typeData: string;
  value: Status;
};

const FieldDataStatus: FC<FieldDataStatus> = ({ typeData, value }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <div className={"flex-3 justify-start items-start"}>
        <span
          className={cn(
            "text-xs  lg:text-sm py-0.5 px-3 rounded-full",
            value === "menunggu"
              ? "bg-warning"
              : value === "revisi"
                ? "bg-error"
                : value === "disetujui" && "bg-success",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default KebutuhanDokumentasiDetail;
