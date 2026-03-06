import { type FC } from "react";
import TitlePage from "../../../components/TitlePage";
import InputFieldSearch from "../../../components/inputComponents/InputFieldSearch";
import usePemberitahuan from "./usePemberitahuan";
import { cn } from "../../../utils/cn";
import DropDown from "../../../components/DropDown";
import DataEmpty from "../../../components/DataEmpty";
import { Bell } from "lucide-react";
import { formatWaktu } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

const Pemberitahuan: FC = () => {
  // call use
  const {
    dataPemberitahuan,
    handleSearch,
    isLoadingPemberitahuan,
    setIsRead,
    user,
    handleIsRead,
    isPendingIsRead,
  } = usePemberitahuan();

  return (
    <div className="w-full flex flex-col justify-between items-start pb-20">
      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <TitlePage
          bigTitle="Pemberitahuan"
          smallTitle="Halaman Pemberitahuan"
        />

        <div
          className={cn(
            "w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-l",
            isLoadingPemberitahuan &&
              "mask-alpha mask-b-from-black mask-b-from-40% mask-b-to-transparent",
          )}
        >
          {/* input field  search */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-end  lg:items-center gap-2">
            <div className="w-full lg:w-1/2">
              {/* input search */}
              <InputFieldSearch handleSearch={handleSearch} />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 mt-2">
              {/* label */}
              <h3 className="text-xs font-medium lg:hidden">Filter :</h3>
              <div className="w-30 lg:w-50">
                <div className="w-full flex flex-row lg:justify-end justify-start items-center">
                  <DropDown
                    handleChange={(e) => setIsRead(e.target.value)}
                    listChoose={[
                      { value: "true", label: "Sudah dibaca" },
                      { value: "false", label: "Belum dibaca" },
                      { value: "semua", label: "Semua" },
                    ]}
                    placeholder="Pilih status"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* data */}
          <div className="w-full flex flex-col justify-start items-start mt-8">
            {isLoadingPemberitahuan ? (
              <div className="w-full flex flex-col justify-start items-start gap-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="w-full flex flex-col justify-start items-start py-4 border-b border-primary-black/40"
                  >
                    {/* skeleton title */}
                    <div className="w-full flex flex-row justify-between items-center mb-4">
                      <div className="w-1/2 lg:w-1/6 h-5 skeleton rounded-full" />
                      <div className="w-10 h-2 skeleton rounded-full" />
                    </div>
                    <div className="w-4/5 h-3 skeleton rounded-full mb-1" />
                    <div className="w-1/2 h-3 skeleton rounded-full mb-6" />
                    <div className="w-full flex flex-row justify-end lg:justify-start items-center gap-3">
                      <div className="w-8 h-2 skeleton rounded-full" />
                      <div className="w-1 h-1 skeleton rounded-full" />
                      <div className="w-16 h-2 skeleton rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col justify-start items-start">
                {dataPemberitahuan?.data &&
                dataPemberitahuan?.data?.length > 0 ? (
                  dataPemberitahuan?.data?.map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-full flex flex-row justify-start items-start py-4 border-b border-primary-black/40 gap-1.5 px-3",
                        !item.isRead &&
                          "bg-primary-purple/15 hover:bg-primary-purple/25 transition-all duration-200 ease-in-out",
                      )}
                    >
                      <div className="flex flex-col justify-center items-start">
                        <div className="h-5 flex flex-row justify-center items-center">
                          <div
                            className={cn(
                              "w-1 h-1 bg-error rounded-full",
                              item.isRead && "bg-transparent",
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex flex-col justify-start items-start">
                        {/* skeleton title */}
                        <div className="w-full flex flex-row justify-between items-center mb-2">
                          {/* title */}
                          <div className="w-full h-5 flex flex-row justify-between items-center">
                            <h3 className="text-base font-medium lg:font-semibold">
                              {item.type.startsWith("KRITERIA")
                                ? "Kriteria"
                                : item.type.startsWith("PIC")
                                  ? "PIC"
                                  : ""}
                            </h3>

                            <span className="text-xs font-light lg:font-normal">
                              {formatWaktu(item.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex flex-col justify-start items-start gap-0.5">
                          <span className="text-xs font-semibold">
                            {item.title}
                          </span>
                          <span className="text-xs">{item.message}</span>
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-3 mt-4">
                          <Link
                            to={
                              item.kriteria
                                ? item.type.includes("KRITERIA_DITAMBAH") ||
                                  item.type.includes("KRITERIA_DIEDIT")
                                  ? `/dashboard/daftar-kriteria?search=${item.kriteria}`
                                  : ""
                                : item.type.includes("KRITERIA_DIHAPUS")
                                  ? `/dashboard/daftar-kriteria`
                                  : item.picId
                                    ? user?.role === "kaprodi"
                                      ? `/dashboard/kelola-pic?search=${item.kebutuhanDokumen}`
                                      : user?.role === "wakil_dekan_1"
                                        ? `/dashboard/verifikasi-kebutuhan-dokumentasi-pic?search=${item.kebutuhanDokumen}`
                                        : `/dashboard/kelola-pic?search=${item.kebutuhanDokumen}`
                                    : ""
                            }
                            type="button"
                            className="text-xs text-primary-purple hover:underline"
                          >
                            Lihat
                          </Link>
                          {!item.isRead && (
                            <>
                              <div className="w-0.5 h-0.5 bg-primary-purple rounded-full" />
                              <button
                                type="button"
                                className="text-xs text-primary-purple hover:underline flex flex-row justify-center items-center"
                                onClick={() => handleIsRead(item.id)}
                              >
                                {isPendingIsRead ? (
                                  <span className="loading loading-spinner w-2.5" />
                                ) : (
                                  "Tandai sudah dibaca"
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex flex-row justify-center items-center">
                    <DataEmpty
                      title="Data Pemberitahuan Tidak Tersedia"
                      iconData={Bell}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pemberitahuan;
