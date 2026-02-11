import { type FC } from "react";

const SkeletonTable: FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 mt-4">
      <div className="w-full h-11 skeleton" />
      <div className="w-full h-11 skeleton" />
      <div className="w-full h-11 skeleton" />
      <div className="w-full h-11 skeleton" />
      <div className="w-full h-11 skeleton" />
    </div>
  );
};

export default SkeletonTable;
