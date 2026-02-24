import type { FC } from "react";

// field data modal
type FieldDataBasicProps = {
  typeData: string;
  value: string;
};

const FieldDataBasic: FC<FieldDataBasicProps> = ({ typeData, value }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <span className="text-xs flex-3 lg:text-sm">{value}</span>
    </div>
  );
};

export default FieldDataBasic;
