import { type FC } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../../utils/cn";
import type { ResponseRiwayatType } from "../../../../models/riwayat.model";
import { formatTanggalPanjang } from "../../../../utils/formatDate";
import type { PayloadUserType } from "../../../../models/user.model";
import RiwayatPic from "..";

type Props = {
  dataRiwayat: ResponseRiwayatType[];
  type: "menunggu" | "revisi";
  user: PayloadUserType | null;
};

const ComponentData: FC<Props> = ({ dataRiwayat, type, user }) => {
  // filter data
  const filteredData = dataRiwayat.filter(
    (item) => item.status === (type === "menunggu" ? "menunggu" : "revisi"),
  );

  //  find menunggu flag kebutuhan dokumen
  const flagMenungguKebutuhanDokumentasi =
    dataRiwayat.filter(
      (item) =>
        item.status === "menunggu" &&
        item.flagRevisi?.includes("kebutuhan_dokumen"),
    ).length > 0
      ? true
      : false;

  //  find menunggu flag pic
  const flagMenungguPic =
    dataRiwayat.filter(
      (item) => item.status === "menunggu" && item.flagRevisi?.includes("pic"),
    ).length > 0
      ? true
      : false;

  // ambil revisi terbaru (index 0 karena sudah order desc)
  const latestRevisi = dataRiwayat
    .filter((item) => item.status === "revisi")
    .at(-1);

  const flagRevisiKebutuhanDokumentasi =
    latestRevisi?.flagRevisi?.some((flag) => flag === "kebutuhan_dokumen") ??
    false;

  const flagRevisiPic =
    latestRevisi?.flagRevisi?.some((flag) => flag === "pic") ?? false;

  return (
    <>
      {filteredData.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col justify-start items-center ml-6 lg:ml-10",
            type === "menunggu" && "lg:card lg:shadow-sm  lg:p-10",
          )}
        >
          {/* label */}
          <div className="w-full flex flex-row justify-start items-start gap-2">
            <span className="text-xs lg:text-base font-semibold">-</span>
            <span className="text-xs lg:text-base font-semibold text-error">
              {type === "menunggu" ? "Menunggu" : "Revisi"} {index + 1}
            </span>
          </div>

          {/* revisi detail */}
          <div className="w-full flex flex-col justify-start items-start mt-2 gap-8">
            {type === "menunggu" && (
              <>
                {/* nama dokumentasi */}
                <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                  <div className="flex flex-col justify-start items-start">
                    {/* nama dokumentasi */}
                    <FieldData label="Nama Dokumentasi" semibold sizeBase />
                    <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                      <FieldData
                        label={item.pic?.kebutuhanDokumen?.namaDokumen ?? "-"}
                        sizeSmall
                        normal
                      />
                    </div>
                  </div>
                </div>

                {/* tim akreditasi */}
                <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                  <div className="flex flex-col justify-start items-start">
                    <FieldData label="Tim Akreditasi" semibold sizeBase />

                    <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                      <FieldData
                        label={item.pic?.timAkreditasi.namaTimAkreditasi ?? "-"}
                        sizeSmall
                        normal
                      />
                    </div>
                  </div>
                </div>

                {/* penanggung jawab pj */}
                <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                  <div className="flex flex-col justify-start items-start">
                    <FieldData
                      label="Penanggung Jawab (PJ)"
                      semibold
                      sizeBase
                    />

                    <div className="flex flex-col justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                      {item.pic?.pj.map((item, index) => (
                        <FieldData
                          key={index}
                          label={item.nama}
                          sizeSmall
                          normal
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* keterangan */}
            <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
              <div className="flex flex-col justify-start items-start">
                <FieldData
                  label={
                    type === "menunggu"
                      ? "Keterangan Perubahan"
                      : "Keterangan Revisi"
                  }
                  semibold
                  sizeBase
                />

                <div className="flex flex-col justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                  <FieldData label={item.keterangan ?? "-"} sizeSmall normal />
                </div>
              </div>
            </div>

            {/* tanggal revisi */}
            <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
              <div className="flex flex-col justify-start items-start">
                <FieldData label="Tanggal Revisi" semibold sizeBase />

                <div className="flex flex-col justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                  <FieldData
                    label={formatTanggalPanjang(item.createdAt) ?? "-"}
                    sizeSmall
                    normal
                  />
                </div>
              </div>
            </div>

            {/* aksi */}
            {user?.role === "kaprodi" &&
              type !== "menunggu" &&
              index === filteredData.length - 1 &&
              !dataRiwayat.some((item) => item.status === "disetujui") &&
              ((!flagMenungguKebutuhanDokumentasi &&
                flagRevisiKebutuhanDokumentasi) ||
                (!flagMenungguPic && flagRevisiPic)) && (
                <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                  <div className="flex flex-col justify-start items-start">
                    <FieldData label="Aksi" semibold sizeBase />

                    <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                      {flagRevisiKebutuhanDokumentasi &&
                        !flagMenungguKebutuhanDokumentasi && (
                          <>
                            {/* revisi dokumen */}
                            <Link
                              to={`/dashboard/kelola-kebutuhan-dokumentasi/ubah-kebutuhan-dokumentasi/${item.pic?.kebutuhanDokumen.id}`}
                              className="btn btn-info btn-sm lg:btn-md text-primary-white font-medium"
                            >
                              Revisi Dokumen
                            </Link>
                          </>
                        )}

                      {flagRevisiPic && !flagMenungguPic && (
                        <>
                          {/* revisi pic */}
                          <Link
                            to={`/dashboard/kelola-pic/ubah-pic/${item.pic?.id}`}
                            type="button"
                            className="btn btn-info btn-sm lg:btn-md text-primary-white font-medium"
                          >
                            Revisi Pic
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      ))}
    </>
  );
};

// field data
type FieldDataProps = {
  label: string;
  sizeSmall?: boolean;
  sizeBase?: boolean;
  sizeLarge?: boolean;
  semibold?: boolean;
  medium?: boolean;
  normal?: boolean;
};

const FieldData: FC<FieldDataProps> = ({
  label,
  medium,
  normal,
  semibold,
  sizeBase,
  sizeLarge,
  sizeSmall,
}) => {
  return (
    <div className="flex flex-row justify-start items-start gap-2">
      <span
        className={cn(
          sizeBase && "text-xs lg:text-base",
          sizeSmall && "text-xs lg:text-sm",
          sizeLarge && "text-xs lg:text-lg",
          semibold && "font-semibold",
          medium && "font-medium",
          normal && "font-normal",
        )}
      >
        -
      </span>
      <span
        className={cn(
          sizeBase && "text-xs lg:text-base",
          sizeSmall && "text-xs lg:text-sm",
          sizeLarge && "text-xs lg:text-lg",
          semibold && "font-semibold",
          medium && "font-medium",
          normal && "font-normal",
        )}
      >
        {label}
      </span>
    </div>
  );
};
export default ComponentData;
