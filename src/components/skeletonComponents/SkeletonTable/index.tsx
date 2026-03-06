import { type FC } from "react";
import { cn } from "../../../utils/cn";

type Props = {
  headerLg: { label: string; size: number }[];
  headerSm: { label: string; size: number }[];
  fieldAksi?: {
    label: string;
    size: number;
    header: string;
    handleAksiWithParams?: (params: number) => void;
    handleAksiNonParams?: () => void;
  }[];
  aksiModal?: boolean;
  aksi?: boolean;
  size?: string;
};
const SkeletonTable: FC<Props> = ({
  headerLg,
  headerSm,
  aksi,
  size,
  fieldAksi,
  aksiModal,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 mt-4">
      <table
        className={cn("table w-full", size ? size : "table-md lg:table-sm")}
      >
        <thead>
          <tr>
            <th className="w-[5%]">#</th>

            {/* header sm */}
            {headerSm.map(({ label, size }, index) => (
              <th
                key={index}
                className={`capitalize lg:hidden`}
                style={{ width: `${size}%` }}
              >
                {label}
              </th>
            ))}

            {!aksiModal && <th className={cn("w-[10%] lg:hidden")} />}

            {/* header lg */}
            {headerLg.map(({ label, size }, index) => (
              <th
                key={index}
                className={`capitalize hidden lg:table-cell`}
                style={{ width: `${size}%` }}
              >
                {label}
              </th>
            ))}

            {/* field aksi lainnya */}
            {fieldAksi &&
              fieldAksi.map((item, index) => (
                <th
                  key={index}
                  className={`capitalize hidden lg:table-cell`}
                  style={{ width: `${size}%` }}
                >
                  {item.header}
                </th>
              ))}

            {/* aksi */}
            {aksi && <th className={cn("w-[10%] text-center")}>Aksi</th>}
          </tr>
        </thead>
      </table>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="w-full h-11 skeleton" />
      ))}
    </div>
  );
};

export default SkeletonTable;
