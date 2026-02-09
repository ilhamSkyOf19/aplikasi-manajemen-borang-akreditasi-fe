import { useState, type FC } from "react";
import { cn } from "../../utils/cn";

// max
const max = 5;

const Pagination: FC = () => {
  // state count
  const [isCount, setIsCount] = useState<number>(1);
  return (
    <div
      className={cn(
        "w-full flex flex-row justify-center items-center py-4 lg:justify-end",
        isCount === 1 && "hidden",
      )}
    >
      <div className="join">
        <button
          disabled={isCount === 1}
          className="join-item btn"
          onClick={() => isCount > 1 && setIsCount((prev) => prev - 1)}
        >
          «
        </button>
        <button className="join-item btn">Page {isCount}</button>
        <button
          disabled={isCount === max}
          className="join-item btn"
          onClick={() => isCount < max && setIsCount((prev) => prev + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
