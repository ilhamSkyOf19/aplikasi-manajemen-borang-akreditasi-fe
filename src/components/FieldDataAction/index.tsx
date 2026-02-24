import type { FC } from "react";

// field data link
type FieldDataActionProps = {
  typeData: string;
  label: string;
  action: () => void;
};

const FieldDataAction: FC<FieldDataActionProps> = ({
  typeData,
  label,
  action,
}) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <div className=" flex-3 flex flex-row justify-start items-start">
        <button
          type="button"
          onClick={() => action()}
          className="text-xs lg:text-sm text-primary-purple"
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default FieldDataAction;
