import { type FC } from "react";

const SkeletonForm: FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start mt-4 gap-8">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="w-full h-10 skeleton" />
      ))}

      {/* skeleton button */}
      <div className="w-full flex flex-row justify-between items-center gap-8 mt-2">
        <div className="flex-1 h-10 skeleton" />
        <div className="flex-1 h-10 skeleton" />
      </div>
    </div>
  );
};

export default SkeletonForm;
