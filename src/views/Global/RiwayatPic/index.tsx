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
          {/* title */}
          <div className="w-full flex flex-row justify-start items-start gap-2 pb-3 border-b border-primary-black/50">
            <History className="size-6" />
            <h2 className="text-base lg:text-lg font-medium lg:font-semibold">
              Riwayat
            </h2>
            <span className="text-base lg:text-lg font-medium lg:font-semibold">
              -
            </span>
            <span className="text-base lg:text-lg font-medium lg:font-semibold">
              {dataRiwayat?.data?.[0].highlightDataEmpy}
            </span>
          </div>

          {/* tanggal di buat  */}
          <div className="w-full flex flex-col justify-start items-start gap-2 mt-6">
            {/* label */}
            <div className="flex flex-row justify-start items-center gap-4">
              <h3 className="text-sm lg:text-lg font-medium">Tanggal dibuat</h3>
              <CalendarDays className="size-4 lg:size-6" />
            </div>

            {/* value */}
            <div className="w-full flex flex-row justify-start items-start gap-2 ml-6 lg:ml-10">
              <span className="text-xs lg:text-base font-semibold">-</span>
              <span className="text-xs lg:text-base font-medium">
                {formatTanggalPanjang(dataRiwayat?.data?.[0].createdData ?? "")}
              </span>
            </div>
          </div>

          {/* daftar revisi */}
          <div className="w-full flex flex-col justify-start items-start gap-2 mt-8">
            {/* label */}
            <div className="flex flex-row justify-start items-center gap-4">
              <h3 className="text-sm lg:text-lg font-medium">Daftar revisi</h3>
              <PencilLineIcon className="size-4 lg:size-6" />
            </div>

            {/* value */}
            <div className="w-full flex flex-row justify-start items-start gap-2">
              <div className="w-full flex flex-col gap-4 justify-start items-start pt-1.5 lg:pt-1">
                {dataRiwayat?.data?.[0].id === 0 ? (
                  <div className="w-full flex flex-row justify-start items-start">
                    <span className="text-xs lg:text-sm">tidak ada revisi</span>
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
                          <span className="text-xs lg:text-base font-medium text-error">
                            Revisi {index + 1}
                          </span>
                        </div>

                        {/* revisi detail */}
                        <div className="w-full flex flex-col justify-start items-start mt-2 gap-8">
                          {/* nama dokumentasi */}
                          <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                            <div className="flex flex-col justify-start items-start">
                              <div className="flex flex-row justify-start items-center gap-2">
                                <span className="text-xs lg:text-base font-semibold">
                                  -
                                </span>
                                <span className="text-xs lg:text-base font-medium">
                                  Nama Dokumentasi
                                </span>
                              </div>

                              <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                <div className="flex flex-row justify-start items-start gap-2">
                                  <span className="text-xs lg:text-base font-semibold">
                                    -
                                  </span>
                                  <span className="text-xs lg:text-base">
                                    {item.pic?.kebutuhanDokumen.namaDokumen}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* tim akreditasi */}
                          <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                            <div className="flex flex-col justify-start items-start">
                              <div className="flex flex-row justify-start items-center gap-2">
                                <span className="text-xs lg:text-base font-semibold">
                                  -
                                </span>
                                <span className="text-xs lg:text-base font-medium">
                                  Tim Akreditasi
                                </span>
                              </div>

                              <div className="flex flex-row justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                <div className="w-full flex flex-row justify-start items-start gap-2">
                                  <span className="text-xs lg:text-base font-semibold">
                                    -
                                  </span>
                                  <span className="text-xs lg:text-base">
                                    {item.pic?.timAkreditasi.namaTimAkreditasi}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* penanggung jawab pj */}
                          <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                            <div className="flex flex-col justify-start items-start">
                              <div className="flex flex-row justify-start items-center gap-2">
                                <span className="text-xs lg:text-base font-semibold">
                                  -
                                </span>
                                <span className="text-xs lg:text-base font-medium">
                                  Penanggung Jawab (PIC)
                                </span>
                              </div>

                              <div className="flex flex-col justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                {item.pic?.pj.map((item, index) => (
                                  <div
                                    key={index}
                                    className="w-full flex flex-row justify-start items-start gap-2"
                                  >
                                    <span className="text-xs lg:text-base font-semibold">
                                      -
                                    </span>
                                    <span className="text-xs lg:text-base">
                                      {item.nama}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* keterangan */}
                          <div className="flex flex-row justify-start items-start ml-6 lg:ml-12">
                            <div className="flex flex-col justify-start items-start">
                              <div className="flex flex-row justify-start items-center gap-2">
                                <span className="text-xs lg:text-base font-semibold">
                                  -
                                </span>
                                <span className="text-xs lg:text-base font-medium">
                                  Keterangan Revisi
                                </span>
                              </div>

                              <div className="flex flex-col justify-start items-start gap-2 mt-2 ml-8 lg:ml-12">
                                <div className="w-full flex flex-row justify-start items-start gap-2">
                                  <span className="text-xs lg:text-base font-semibold">
                                    -
                                  </span>
                                  <span className="text-xs lg:text-base">
                                    {item.keterangan}
                                  </span>
                                </div>
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
                                  <div className="flex flex-row justify-start items-center gap-2">
                                    <span className="text-xs lg:text-base font-semibold">
                                      -
                                    </span>
                                    <span className="text-xs lg:text-base font-medium">
                                      Aksi
                                    </span>
                                  </div>

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
                  <h3 className="text-sm lg:text-lg font-medium">
                    Tanggal disetujui
                  </h3>

                  <CalendarCheck className="size-4 lg:size-6" />
                </div>

                <div className="w-full flex flex-row justify-start items-start gap-2 ml-6 lg:ml-10">
                  <span className="text-xs lg:text-base font-semibold">-</span>
                  <span className="text-xs lg:text-base font-medium">
                    {formatTanggalPanjang(item.createdAt)}
                  </span>
                </div>
              </div>
            ))}

          {/* action */}
          <div className="w-full flex flex-row justify-end items-center gap-2 mt-8">
            {/* back */}
            <div className="w-28 lg:w-32">
              <ButtonBackBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPic;
