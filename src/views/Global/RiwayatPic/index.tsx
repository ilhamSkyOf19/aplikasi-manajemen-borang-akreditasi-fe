import { type FC } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import useRiwayat from "./useRiwayat";
import {
  CalendarCheck,
  CalendarDays,
  History,
  PencilLineIcon,
} from "lucide-react";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import ButtonBackBox from "../../../components/buttonComponents/ButtonBackBox";
import { cn } from "../../../utils/cn";

type Props = {
  bigTitle: string;
  smallTitle: string;
};
const RiwayatPic: FC<Props> = () => {
  // call use
  const { pathname, dataRiwayat, isLoadingRiwayat, user } = useRiwayat();
  return (
    <div className="w-full flex flex-col justify-between items-start pb-20 lg:pb-32">
      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <BreadCrumbs
          pathname={pathname}
          link={[pathname.split("/").slice(0, -1).join("/")]}
        />

        <div className="w-full bg-primary-white flex flex-col justify-start items-start mt-4 p-4 rounded-lg">
          {isLoadingRiwayat ? (
            <div className="w-full flex flex-col justify-start items-start">
              {/* title skeleton */}
              <div className="w-full flex flex-row justify-start items-start gap-2 pb-3 border-b border-primary-black/50">
                <div className="w-3/4 lg:w-1/2 h-6 skeleton rounded-full" />
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-4 mt-6">
                <div className="w-1/2 lg:w-1/4 h-4 lg:h-5 skeleton rounded-full" />
                <div className="w-1/2 lg:w-1/4 h-4 lg:h-5 skeleton rounded-full ml-6 lg:ml-10" />
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-4 mt-6">
                <div className="w-1/4 h-4 lg:h-5 skeleton rounded-full" />
                {Array.from({ length: 1 }, (_, i) => (
                  <div
                    key={i}
                    className="w-full flex flex-col justify-start items-start gap-2"
                  >
                    <div className="w-1/2 lg:w-1/4 h-4 lg:h-5 skeleton rounded-full ml-6 lg:ml-10 " />

                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        className="w-full flex flex-col justify-start gap-2 mt-2"
                      >
                        <div className="w-1/2 lg:w-1/4 h-4 lg:h-5 skeleton rounded-full ml-20 lg:ml-24" />
                        <div className="w-1/2 lg:w-1/4 h-4 lg:h-5 skeleton rounded-full ml-30 lg:ml-38 mt-2" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-4 mt-6">
                <div className="w-1/2 lg:w-1/4 h-4 lg:h-5 skeleton rounded-full" />
                <div className="w-1/2 lg:w-1/4 h-4 lg:h-5 skeleton rounded-full ml-6 lg:ml-10" />
              </div>

              <div className="w-full flex flex-row justify-end items-center mt-4">
                <div className="w-26 h-8 skeleton rounded-lg" />
              </div>
            </div>
          ) : (
            <>
              {/* title */}
              <div className="w-full flex flex-row justify-start items-start gap-2 pb-3 border-b border-primary-black/50">
                <History className="size-6" />
                <h2 className="text-base lg:text-xl font-semibold">Riwayat</h2>
                <span className="text-base lg:text-xl font-semibold">-</span>
                <span className="text-base lg:text-xl font-semibold">
                  {dataRiwayat?.data?.[0].highlightDataEmpy}
                </span>
              </div>

              {/* tanggal di buat  */}
              <div className="w-full flex flex-col justify-start items-start gap-2 mt-6">
                {/* label */}
                <div className="flex flex-row justify-start items-center gap-4">
                  <h3 className="text-sm lg:text-base font-semibold">
                    Tanggal dibuat
                  </h3>
                  <CalendarDays className="size-4 lg:size-5" />
                </div>

                {/* value */}

                <div className="w-full flex flex-row justify-start items-start gap-2 ml-6 lg:ml-10">
                  <FieldData
                    label={formatTanggalPanjang(
                      dataRiwayat?.data?.[0].createdData ?? "",
                    )}
                    sizeSmall
                    medium
                  />
                </div>
              </div>

              {/* daftar revisi */}
              <div className="w-full flex flex-col justify-start items-start gap-2 mt-8">
                {/* label */}
                <div className="flex flex-row justify-start items-center gap-4">
                  <h3 className="text-sm lg:text-base font-semibold">
                    Daftar revisi
                  </h3>
                  <PencilLineIcon className="size-4 lg:size-5" />
                </div>

                {/* value */}
                <div className="w-full flex flex-row justify-start items-start gap-2">
                  <div className="w-full flex flex-col gap-4 justify-start items-start pt-1.5 lg:pt-1">
                    {dataRiwayat?.data?.[0].id === 0 ? (
                      <div className="w-full flex flex-row justify-start items-start">
                        <span className="text-xs lg:text-sm">
                          tidak ada revisi
                        </span>
                      </div>
                    ) : (
                      dataRiwayat?.data
                        ?.filter((item) => item.status !== "disetujui")
                        .map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col justify-start items-center ml-6 lg:ml-10"
                          >
                            {/* label */}
                            <div className="w-full flex flex-row justify-start items-start gap-2">
                              <span className="text-xs lg:text-base font-semibold">
                                -
                              </span>
                              <span className="text-xs lg:text-base font-semibold text-error">
                                Revisi {index + 1}
                              </span>
                            </div>

                            {/* revisi detail */}
                            <div className="w-full flex flex-col justify-start items-start mt-2 gap-8">
                              {/* nama dokumentasi */}
                              <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                                <div className="flex flex-col justify-start items-start">
                                  {/* nama dokumentasi */}
                                  <FieldData
                                    label="Nama Dokumentasi"
                                    semibold
                                    sizeBase
                                  />
                                  <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                    <FieldData
                                      label={
                                        item.pic?.kebutuhanDokumen
                                          ?.namaDokumen ?? "-"
                                      }
                                      sizeSmall
                                      normal
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* tim akreditasi */}
                              <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                                <div className="flex flex-col justify-start items-start">
                                  <FieldData
                                    label="Tim Akreditasi"
                                    semibold
                                    sizeBase
                                  />

                                  <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                    <FieldData
                                      label={
                                        item.pic?.timAkreditasi
                                          .namaTimAkreditasi ?? "-"
                                      }
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

                              {/* keterangan */}
                              <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                                <div className="flex flex-col justify-start items-start">
                                  <FieldData
                                    label="Keterangan Revisi"
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
                                  <FieldData
                                    label="Tanggal Revisi"
                                    semibold
                                    sizeBase
                                  />

                                  <div className="flex flex-col justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                    <FieldData
                                      label={
                                        formatTanggalPanjang(item.createdAt) ??
                                        "-"
                                      }
                                      sizeSmall
                                      normal
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* aksi */}
                              {user?.role === "kaprodi" &&
                                index === (dataRiwayat.data?.length ?? 0) - 2 &&
                                !dataRiwayat?.data?.find(
                                  (item) => item.status === "disetujui",
                                ) && (
                                  <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                                    <div className="flex flex-col justify-start items-start">
                                      <FieldData
                                        label="Aksi"
                                        semibold
                                        sizeBase
                                      />

                                      <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                        <button
                                          type="button"
                                          className="btn btn-info btn-sm lg:btn-md"
                                        >
                                          Revisi
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {dataRiwayat?.data
                ?.filter((item) => item.status === "disetujui")
                ?.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex flex-col justify-start items-start gap-2 mt-8"
                  >
                    {/* label */}
                    <div className="flex flex-row justify-start items-center gap-4">
                      <h3 className="text-sm lg:text-base font-semibold">
                        Tanggal disetujui
                      </h3>

                      <CalendarCheck className="size-4 lg:size-5" />
                    </div>

                    <div className="w-full flex flex-row justify-start items-start gap-2 ml-6 lg:ml-10">
                      <FieldData
                        label={formatTanggalPanjang(item.createdAt)}
                        sizeSmall
                        medium
                      />
                    </div>
                  </div>
                ))}

              {/* action */}
              <div className="w-full flex flex-row justify-end items-center gap-2 mt-8">
                {/* back */}
                <ButtonBackBox />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
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
    <div className="flex flex-row justify-start items-center gap-2">
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

export default RiwayatPic;
