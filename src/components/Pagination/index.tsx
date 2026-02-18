import { type FC } from "react";
import { cn } from "../../utils/cn";

type Props = {
  currentPage: number;
  setPage: (page: string) => void;
  totalPage: number;
};
const Pagination: FC<Props> = ({ currentPage, setPage, totalPage }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row justify-center items-center py-4 lg:justify-end",
        totalPage < 2 && "hidden",
      )}
    >
      <div className="join">
        <button
          disabled={currentPage === 1}
          className="join-item btn"
          onClick={() => {
            if (currentPage > 1) {
              setPage((currentPage - 1).toString());
            }
          }}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button
          disabled={currentPage === totalPage}
          className="join-item btn"
          onClick={() => {
            if (currentPage < totalPage) {
              setPage((currentPage + 1).toString());
            }
          }}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
