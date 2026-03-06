import { type FC } from "react";

const SkeletonPemberitahuan: FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="w-full flex flex-col justify-start items-start py-4 border-b border-primary-black/40"
        >
          {/* skeleton title */}
          <div className="w-full flex flex-row justify-between items-center mb-4">
            <div className="w-1/2 lg:w-1/6 h-5 skeleton rounded-full" />
            <div className="w-10 h-2 skeleton rounded-full" />
          </div>
          <div className="w-4/5 h-3 skeleton rounded-full mb-1" />
          <div className="w-1/2 h-3 skeleton rounded-full mb-6" />
          <div className="w-full flex flex-row justify-end lg:justify-start items-center gap-3">
            <div className="w-8 h-2 skeleton rounded-full" />
            <div className="w-1 h-1 skeleton rounded-full" />
            <div className="w-16 h-2 skeleton rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonPemberitahuan;
