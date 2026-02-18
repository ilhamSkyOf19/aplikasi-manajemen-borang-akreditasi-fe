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
  aksiModal?: boolean;
  aksi?: boolean;
  handleModal?: (index: number) => void;
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
};
const TableData: FC<Props> = ({
  header,
  datas,
  aksiModal,
  handleModal,
  isDataModalActive,
  linkUpdate,
  aksi,
  handleShowModalDelete,
  size,
  fieldAksi,
  emptyMessage,
  currentPage,
  fieldColor,
}) => {
  // first number
  const firstNumber = currentPage * 10 - 9;

  return (
    <div className="w-full overflow-x-auto mt-4">
      <table
        className={cn("table w-full", size ? size : "table-md lg:table-sm")}
      >
        {/* head */}
        <thead>
          <tr>
            <th className="w-[5%]">#</th>
            {header
              .filter((item) => item.key !== "id")
              .map(({ label, size }, index) => (
                <th
                  key={index}
                  className={`capitalize`}
                  style={{ width: `${size}%` }}
                >
                  {label}
                </th>
              ))}

            {!aksiModal && <th className={cn("w-[10%] lg:hidden")} />}

            {/* field aksi lainnya */}
            {fieldAksi &&
              fieldAksi.map((item, index) => (
                <th
                  key={index}
                  className={`capitalize`}
                  style={{ width: `${size}%` }}
                >
                  {item.header}
                </th>
              ))}

            {/* field color */}
            {fieldColor &&
              fieldColor.map((item, index) => (
                <th
                  key={index}
                  className={`capitalize`}
                  style={{ width: `${size}%` }}
                >
                  {item.header}
                </th>
              ))}

            {/* aksi */}
            {aksi && (
              <th className={cn("w-[10%] hidden lg:table-cell")}>Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {datas.length > 0 &&
            datas.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  aksiModal &&
                    "hover:bg-primary-purple transition-all duration-150 group",
                  isDataModalActive &&
                    isDataModalActive === row.fields.id &&
                    "lg:bg-primary-purple",
                )}
                onClick={() =>
                  aksiModal && handleModal && handleModal(row.fields.id)
                }
              >
                {/* number */}
                <th
                  className={cn(
                    "group-hover:text-primary-white transition-all duration-150",
                    isDataModalActive &&
                      isDataModalActive === row.fields.id &&
                      "lg:text-primary-white",
                  )}
                >
                  {firstNumber + index}
                </th>
                {header
                  .filter((item) => item.key !== "id")
                  .map((item, index) => (
                    <td
                      key={index}
                      className={cn(
                        "group-hover:text-primary-white transition-all duration-15",
                        isDataModalActive &&
                          isDataModalActive === row.fields.id &&
                          "lg:text-primary-white",
                      )}
                    >
                      {row.fields[item.key]}
                    </td>
                  ))}

                <td className={cn("lg:hidden", !aksiModal && "hidden")}>
                  <div className="flex justify-end">
                    <span className="text-xs text-primary-purple">Lihat</span>
                  </div>
                </td>

                {/* field aksi lainnya */}
                {fieldAksi &&
                  fieldAksi.map((item, idx) => (
                    <td key={idx}>
                      <button
                        type="button"
                        onClick={() => {
                          item.handleAksiWithParams &&
                            item.handleAksiWithParams(row.fields.id);
                          item.handleAksiNonParams &&
                            item.handleAksiNonParams();
                        }}
                      >
                        <span className="text-primary-purple hover:underline">
                          {item.label}
                        </span>
                      </button>
                    </td>
                  ))}

                {/* field color */}
                {fieldColor &&
                  fieldColor.map((item, idx) => (
                    <td key={idx}>
                      <div className="w-full flex flex-row justify-start items-center">
                        <span
                          className={cn(
                            "text-primary-black py-0.5 px-3 rounded-full",
                            item.color && item.color,
                            item.colorFn && item.colorFn(row.fields[item.key]),
                          )}
                        >
                          {row.fields[item.key]}
                        </span>
                      </div>
                    </td>
                  ))}

                {/* aksi */}
                {aksi && (
                  <td className={cn("hidden lg:table-cell")}>
                    <div className="flex flex-row justify-start items-center gap-2">
                      {/* update */}
                      {!row.fields.disableAksi?.update && (
                        <div className="tooltip" data-tip="ubah">
                          <Link
                            to={`/dashboard/${linkUpdate}/${row.fields.id}`}
                            type="button"
                            className="btn btn-info px-3 btn-soft"
                            onClick={(e) => {
                              e.stopPropagation();
                              // logic update
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </div>
                      )}

                      {/* delete */}
                      {!row.fields.disableAksi?.delete && (
                        <div className="tooltip" data-tip="hapus">
                          <button
                            type="button"
                            className="btn btn-error px-3 btn-soft"
                            onClick={(e) => {
                              e.stopPropagation();
                              // logic delete
                              handleShowModalDelete &&
                                handleShowModalDelete(row.fields.id);
                            }}
                          >
                            <Trash2Icon className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      {/* empty data */}
      {datas.length === 0 && (
        <div className="w-full flex flex-row justify-center items-center my-12">
          <p className="text-sm text-primary-black/80 font-semibold lg:text-base">
            {emptyMessage || "Tidak ada data"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TableData;
