import { type FC } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../../utils/cn";
import type { ResponseRiwayatType } from "../../../../models/riwayat.model";
import { formatTanggalPanjang } from "../../../../utils/formatDate";
import type { ResponseUserType } from "../../../../models/user.model";

type Props = {
  dataRiwayat: ResponseRiwayatType[];
  type: "menunggu" | "revisi";
  user: ResponseUserType | null;
};

const ComponentData: FC<Props> = ({ dataRiwayat, type, user }) => {
  return (
    <>
      {dataRiwayat
        .filter(
          (item) =>
            item.status === (type === "menunggu" ? "menunggu" : "revisi"),
        )
        .map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-start items-center ml-6 lg:ml-10"
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
                  <FieldData label="Penanggung Jawab (PJ)" semibold sizeBase />

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
                    <FieldData
                      label={item.keterangan ?? "-"}
                      sizeSmall
                      normal
                    />
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
                index ===
                  (dataRiwayat.length ?? 0) -
                    (dataRiwayat?.find((item) => item.status === "disetujui")
                      ? 2
                      : 1) &&
                !dataRiwayat?.find((item) => item.status === "disetujui") && (
                  <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                    <div className="flex flex-col justify-start items-start">
                      <FieldData label="Aksi" semibold sizeBase />

                      <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                        {/* revisi dokumen */}
                        <Link
                          to={`/dashboard/kelola-kebutuhan-dokumentasi/ubah-kebutuhan-dokumentasi/${item.pic?.kebutuhanDokumen.id}`}
                          className="btn btn-info btn-sm lg:btn-md text-primary-white font-medium"
                        >
                          Revisi Dokumen
                        </Link>

                        {/* revisi pic */}
                        <button
                          type="button"
                          className="btn btn-info btn-sm lg:btn-md text-primary-white font-medium"
                        >
                          Revisi Pic
                        </button>
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
