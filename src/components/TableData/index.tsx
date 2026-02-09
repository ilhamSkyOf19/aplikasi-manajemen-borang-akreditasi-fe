import { type FC } from "react";
import { cn } from "../../utils/cn";
import { Pencil, Trash2Icon } from "lucide-react";

type Props = {
  header: { key: string; label: string; size: number }[];
  datas: { fields: Record<string, any> }[];
  aksiModal?: boolean;
  aksi?: boolean;
  handleModal?: (index: number) => void;
  isDataModalActive?: number;
};
const TableData: FC<Props> = ({
  header,
  datas,
  aksiModal,
  handleModal,
  isDataModalActive,
  aksi,
}) => {
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="w-[10%]">#</th>
            {header
              .filter((item) => item.key !== "id")
              .map(({ label, size }, index) => (
                <th key={index} className={`w-[${size}%] capitalize`}>
                  {label}
                </th>
              ))}

            <th className={cn("w-[10%] lg:hidden", !aksiModal && "hidden")} />

            {/* aksi */}
            <th
              className={cn("w-[5%] hidden lg:table-cell", !aksi && "hidden")}
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {datas.map((row, index) => (
            <tr
              key={index}
              className={cn(
                aksiModal &&
                  "hover:bg-primary-purple transition-all duration-150 group",
                isDataModalActive &&
                  isDataModalActive === row.fields.id &&
                  "lg:bg-primary-purple",
              )}
              onClick={() => aksiModal && handleModal && handleModal(index)}
            >
              <th
                className={cn(
                  "group-hover:text-primary-white transition-all duration-150",
                  isDataModalActive &&
                    isDataModalActive === row.fields.id &&
                    "lg:text-primary-white",
                )}
              >
                {index + 1}
              </th>
              {header
                .filter((item) => item.key !== "id")
                .map((item, index) => (
                  <td
                    key={index}
                    className={cn(
                      "group-hover:text-primary-white transition-all duration-150",
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

              {/* aksi */}
              <td className={cn("hidden lg:block", !aksi && "hidden")}>
                <div className="flex flex-row justify-start items-center gap-2">
                  {/* update */}
                  <div className="tooltip" data-tip="edit">
                    <button
                      type="button"
                      className="btn btn-info px-3 btn-soft"
                      onClick={(e) => {
                        e.stopPropagation();
                        // logic update
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>

                  {/* delete */}
                  <div className="tooltip" data-tip="delete">
                    <button
                      type="button"
                      className="btn btn-error px-3 btn-soft"
                      onClick={(e) => {
                        e.stopPropagation();
                        // logic delete
                      }}
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
