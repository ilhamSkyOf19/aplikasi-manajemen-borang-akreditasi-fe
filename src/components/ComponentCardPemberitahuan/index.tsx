import { type FC } from "react";
import { cn } from "../../utils/cn";
import type { INotifikasi } from "../../models/notifikasi.model";
import { formatWaktu } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

type Props = {
  item: INotifikasi;
  handleIsRead: (id: number) => void;
  isPending?: boolean;
  handleCloseModalNotifikasi?: () => void;
};
const ComponentCardPemberitahuan: FC<Props> = ({
  item,
  handleIsRead,
  isPending,
  handleCloseModalNotifikasi,
}) => {
  // get user from store
  const user = useAuthStore((s) => s.user);
  return (
    <div
      className={cn(
        "w-full flex flex-row justify-start items-start py-4 border-b border-primary-black/40 gap-1.5 lg:px-3 px-2",
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
            <div className="flex flex-row justify-start items-center">
              <h3 className="text-base font-medium lg:font-semibold">
                {item.type.startsWith("KRITERIA")
                  ? "Kriteria"
                  : item.type.startsWith("PIC")
                    ? "PIC"
                    : ""}
              </h3>

              <span className="text-sm font-semibold mx-2">-</span>
              <span className="text-xs font-semibold">{item.title}</span>
            </div>

            <span className="text-xs font-light lg:font-normal">
              {formatWaktu(item.createdAt)}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-0.5">
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
            onClick={() => {
              handleIsRead(item.id);
              handleCloseModalNotifikasi?.();
            }}
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
                {isPending ? (
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
  );
};

export default ComponentCardPemberitahuan;
