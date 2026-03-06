import { type FC } from "react";
import TitlePage from "../../../components/TitlePage";
import InputFieldSearch from "../../../components/inputComponents/InputFieldSearch";
import usePemberitahuan from "./usePemberitahuan";
import { cn } from "../../../utils/cn";
import DropDown from "../../../components/DropDown";
import DataEmpty from "../../../components/DataEmpty";
import { Bell } from "lucide-react";
import ComponentCardPemberitahuan from "../../../components/ComponentCardPemberitahuan";
import SkeletonPemberitahuan from "../../../components/skeletonComponents/SkeletonPemberitahuan";
import Pagination from "../../../components/Pagination";

const Pemberitahuan: FC = () => {
  // call use
  const {
    dataPemberitahuan,
    handleSearch,
    isLoadingPemberitahuan,
    setIsRead,
    handleIsRead,
    isPendingIsRead,
    setPage,
  } = usePemberitahuan();

  return (
    <div className="w-full flex flex-col justify-between items-start pb-20">
      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <TitlePage
          bigTitle="Pemberitahuan"
          smallTitle="Halaman Pemberitahuan"
        />

        <div
          className={cn(
            "w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-l",
            isLoadingPemberitahuan &&
              "mask-alpha mask-b-from-black mask-b-from-40% mask-b-to-transparent",
          )}
        >
          {/* input field  search */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-end  lg:items-center gap-2 ">
            <div className="w-full lg:w-1/2">
              {/* input search */}
              <InputFieldSearch handleSearch={handleSearch} />
            </div>
            <div className="w-full lg:w-auto flex flex-col justify-start items-start gap-2 mt-2">
              {/* label */}
              <h3 className="text-xs font-medium lg:hidden">Filter :</h3>
              <div className="w-35 lg:w-50">
                <div className="w-full flex flex-row lg:justify-end justify-start items-center">
                  <DropDown
                    handleChange={(e) => setIsRead(e.target.value)}
                    listChoose={[
                      { value: "true", label: "Sudah dibaca" },
                      { value: "false", label: "Belum dibaca" },
                      { value: "semua", label: "Semua" },
                    ]}
                    placeholder="Pilih status"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* data */}
          <div className="w-full flex flex-col justify-start items-start mt-8">
            {isLoadingPemberitahuan ? (
              <SkeletonPemberitahuan />
            ) : (
              <div className="w-full flex flex-col justify-start items-start">
                {dataPemberitahuan?.data &&
                dataPemberitahuan?.data?.length > 0 ? (
                  dataPemberitahuan?.data?.map((item, idx) => (
                    <ComponentCardPemberitahuan
                      item={item}
                      isPending={isPendingIsRead}
                      key={idx}
                      handleIsRead={handleIsRead}
                    />
                  ))
                ) : (
                  <div className="w-full flex flex-row justify-center items-center">
                    <DataEmpty
                      title="Data Pemberitahuan Tidak Tersedia"
                      iconData={Bell}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* pagination */}
        <Pagination
          currentPage={dataPemberitahuan?.meta.currentPage || 1}
          totalPage={dataPemberitahuan?.meta.totalPage || 0}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Pemberitahuan;
