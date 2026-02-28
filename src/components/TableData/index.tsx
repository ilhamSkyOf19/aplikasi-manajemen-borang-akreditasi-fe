import { type FC } from "react";
import { cn } from "../../utils/cn";
import { Pencil, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  header: { key: string; label: string; size: number }[];
  datas: {
    fields: Record<string, any> & {
      disableAksi?: { update?: boolean; delete?: boolean };
    };
  }[];
  aksiDetail?: boolean;
  handleAksiDetail?: (index: number) => void;
  aksiLink?: boolean;
  aksi?: boolean;
  handleAksiLink?: (index: number) => void;
  isDataModalActive?: number;
  linkUpdate?: string;
  handleShowModalDelete?: (id: number) => void;
  size?: string;
  fieldAksi?: {
    label: string;
    size: number;
    header: string;
    handleAksiWithParams?: (params: number) => void;
    handleAksiNonParams?: () => void;
  }[];
  fieldColor?: {
    header: string;
    key: string;
    size: number;
    color?: string;
    colorFn?: (item: any) => string;
  }[];
  emptyMessage?: string;
  currentPage: number;
  labelButtonUpdate?: string;
};
const TableData: FC<Props> = ({
  header,
  datas,
  aksiLink,
  handleAksiLink,
  isDataModalActive,
  linkUpdate,
  aksi,
  handleShowModalDelete,
  size,
  fieldAksi,
  emptyMessage,
  currentPage,
  fieldColor,
  labelButtonUpdate,
  aksiDetail,
  handleAksiDetail,
}) => {
  // first number
  const firstNumber = currentPage * 10 - 9;

  return (
    <div className="w-full overflow-x-auto mt-4">
      <table
        className={cn("table w-full", size ? size : "table-md lg:table-sm")}
      >
        {/* ================= HEADER ================= */}
        <thead>
          <tr>
            <th className="w-[5%]">#</th>

            {/* dynamic header */}
            {header
              .filter((item) => item.key !== "id")
              .map((item, index) => (
                <th
                  key={index}
                  className="capitalize"
                  style={{ width: item.size ? `${item.size}%` : undefined }}
                >
                  {item.label}
                </th>
              ))}

            {/* fieldAksi header */}
            {fieldAksi &&
              fieldAksi.map((item, index) => (
                <th
                  key={index}
                  className="capitalize"
                  style={{ width: item.size ? `${item.size}%` : undefined }}
                >
                  {item.header}
                </th>
              ))}

            {/* fieldColor header */}
            {fieldColor &&
              fieldColor.map((item, index) => (
                <th
                  key={index}
                  className="capitalize"
                  style={{ width: item.size ? `${item.size}%` : undefined }}
                >
                  {item.header}
                </th>
              ))}

            {/* AKSI (single column only) */}
            {(aksi || aksiDetail || aksiLink) && (
              <th className="w-[10%] text-center">Aksi</th>
            )}
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {datas.length > 0 &&
            datas.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  !aksi && "h-12",
                  aksiLink &&
                    "hover:bg-primary-purple group transition-all duration-150",
                  isDataModalActive === row.fields.id && "lg:bg-primary-purple",
                )}
                onClick={() => aksiLink && handleAksiLink?.(row.fields.id)}
              >
                {/* number */}
                <th
                  className={cn(
                    "group-hover:text-primary-white transition-all duration-150",
                    isDataModalActive === row.fields.id &&
                      "lg:text-primary-white",
                  )}
                >
                  {firstNumber + index}
                </th>

                {/* dynamic data */}
                {header
                  .filter((item) => item.key !== "id")
                  .map((item, idx) => (
                    <td
                      key={idx}
                      className={cn(
                        "group-hover:text-primary-white transition-all duration-150",
                        isDataModalActive === row.fields.id &&
                          "lg:text-primary-white",
                      )}
                    >
                      {row.fields[item.key]}
                    </td>
                  ))}

                {/* fieldAksi */}
                {fieldAksi &&
                  fieldAksi.map((item, idx) => (
                    <td key={idx}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          item.handleAksiWithParams?.(row.fields.id);
                          item.handleAksiNonParams?.();
                        }}
                        className="text-primary-purple hover:underline"
                      >
                        {item.label}
                      </button>
                    </td>
                  ))}

                {/* fieldColor */}
                {fieldColor &&
                  fieldColor.map((item, idx) => (
                    <td key={idx}>
                      <div className="flex items-center">
                        <span
                          className={cn(
                            "py-0.5 px-3 rounded-full text-xs",
                            item.color,
                            item.colorFn?.(row.fields[item.key]),
                          )}
                        >
                          {row.fields[item.key]}
                        </span>
                      </div>
                    </td>
                  ))}

                {/* ================= AKSI COLUMN ================= */}
                {(aksi || aksiDetail || aksiLink) && (
                  <td className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      {/* DETAIL */}
                      {aksiDetail && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAksiDetail?.(row.fields.id);
                          }}
                          className="text-primary-purple hover:underline text-sm"
                        >
                          Lihat
                        </button>
                      )}

                      {/* aksi link sm */}
                      <div className={cn("lg:hidden", !aksiLink && "hidden")}>
                        {" "}
                        <div className="flex justify-end">
                          {" "}
                          <span
                            className={cn(
                              "text-xs text-primary-purple",
                              aksiLink &&
                                "group-hover:text-primary-white transition-colors duration-150 ease-in-out",
                            )}
                          >
                            {" "}
                            Lihat{" "}
                          </span>{" "}
                        </div>{" "}
                      </div>

                      {/* UPDATE */}
                      {aksi && !row.fields.disableAksi?.update && (
                        <Link
                          key={row.fields.id}
                          to={`/dashboard/${linkUpdate}/${row.fields.id}`}
                          className="btn btn-info btn-sm tooltip font-normal"
                          data-tip={labelButtonUpdate || "Ubah"}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Pencil className="w-3 h-3" />
                        </Link>
                      )}

                      {/* DELETE */}
                      {aksi && !row.fields.disableAksi?.delete && (
                        <button
                          type="button"
                          className="btn btn-error btn-sm tooltip font-normal"
                          data-tip="hapus"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowModalDelete?.(row.fields.id);
                          }}
                        >
                          <Trash2Icon className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      {/* empy data */}
      {datas.length === 0 && (
        <div className="w-full flex justify-center items-center py-12">
          <p className="text-sm font-semibold">
            {emptyMessage || "Tidak ada data"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TableData;
