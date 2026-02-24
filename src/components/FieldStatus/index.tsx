import type { FC } from "react";
import type { Status } from "../../types/constanst.type";
import { cn } from "../../utils/cn";

// field status
type FieldDataStatus = {
  typeData: string;
  value: Status;
};

const FieldDataStatus: FC<FieldDataStatus> = ({ typeData, value }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <div className={"flex-3 justify-start items-start"}>
        <span
          className={cn(
            "text-xs lg:text-sm py-0.5 px-3 rounded-full",
            value === "menunggu"
              ? "bg-warning"
              : value === "revisi"
                ? "bg-error"
                : value === "disetujui" && "bg-success",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default FieldDataStatus;
