import { type FC } from "react";
import InputFieldSearch from "../../../components/InputFieldSearch";
import TableData from "../../../components/TableData";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import Pagination from "../../../components/Pagination";
import TitlePage from "../../../components/TitlePage";
import ModalDaftarKriteria from "./ModalDaftarKriteria";
import UseDaftarKriteria from "./UseDaftarKriteria";
import Toast from "../../../components/Toast";
import ModalDelete from "../../../components/ModalDelete";
import { useAuthStore } from "../../../stores/authStore";
import SkeletonTable from "../../../components/SkeletonTable";
import DropDown from "../../../components/DropDown";

const DaftarKriteria: FC = () => {
  // call use
  const {
    handleCloseModal,
    handleShowModal,
    isShowModal,
    header,
    modalRef,
    dataKriteria,
    handleSearch,
    isLoading,
    isToast,
    isAnimationOut,
    modalDeleteRef,
    handleDelete,
    isLoadingDelete,
    handleModalDeleteClose,
    handleModalDeleteShow,
    setFilterStatus,
  } = UseDaftarKriteria();

  // user
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full flex flex-col justify-between items-start pb-20">
      {user?.role === "wakil_dekan_1" && (
        <>
          {/* toast create */}
          <Toast
            toast={isToast === "created"}
            isAnimationOut={isAnimationOut}
            label={"Data Kriteria berhasil ditambahkan"}
            color="success"
          />
          {/* toast update */}
          <Toast
            toast={isToast === "updated"}
            isAnimationOut={isAnimationOut}
            label={"Data Kriteria berhasil diubah"}
            color="info"
          />

          {/* toast not updated */}
          <Toast
            toast={isToast === "notUpdated"}
            isAnimationOut={isAnimationOut}
            label={"Data Kriteria tidak ada perubahan"}
            color="warning"
          />

          {/* toast delete */}
          <Toast
            toast={isToast === "deleted"}
            isAnimationOut={isAnimationOut}
            label={"Data Kriteria berhasil dihapus"}
            color="error"
          />
        </>
      )}

      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <TitlePage
          bigTitle="Kelola Daftar Kriteria"
          smallTitle="Halaman untuk mengelola daftar kriteria"
          {...(user?.role === "wakil_dekan_1" && {
            labelAdd: "Tambah Kriteria",
            linkAdd: "/dashboard/daftar-kriteria/tambah-kriteria",
          })}
        />

        <div className="w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-lg">
          {/* input field  search */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-end lg:items-center gap-2">
            <div className="w-full lg:w-1/2">
              {/* input search */}
              <InputFieldSearch handleSearch={handleSearch} />
            </div>

            <div className="w-30 lg:w-40">
              <DropDown
                handleChange={(e) => setFilterStatus(e.target.value)}
                listChoose={["Baru", "Revisi", "Semua"]}
                placeholder="Pilih status"
              />
            </div>
          </div>

          {/* check data */}
          {isLoading ? (
            <SkeletonTable />
          ) : (
            dataKriteria?.data && (
              <>
                {/* table data */}
                <div className="w-full lg:hidden">
                  {/* table data for sm */}
                  <TableData
                    header={[
                      { label: "nama kriteria", size: 80, key: "namaKriteria" },
                    ]}
                    datas={dataKriteria?.data.data.map((item) => ({
                      fields: {
                        id: item.id,
                        namaKriteria: item.namaKriteria,
                      },
                    }))}
                    aksiModal={true}
                    handleModal={handleShowModal}
                    isDataModalActive={isShowModal.data.id}
                  />
                </div>

                {/* table data for lg */}
                <div className="w-full hidden lg:flex">
                  <TableData
                    header={
                      user?.role === "kaprodi" ||
                      user?.role === "tim_akreditasi"
                        ? header.filter((item) => item.key === "namaKriteria")
                        : user?.role === "wakil_dekan_1"
                          ? header
                          : []
                    }
                    datas={dataKriteria?.data.data.map((item) => ({
                      fields:
                        user?.role === "kaprodi" ||
                        user?.role === "tim_akreditasi"
                          ? {
                              namaKriteria: item.namaKriteria,
                            }
                          : user?.role === "wakil_dekan_1"
                            ? {
                                ...item,
                                kriteria: `C${item.kriteria}`,
                                tanggalBuat: formatTanggalPanjang(
                                  item.createdAt,
                                ),
                                tanggalUbah: formatTanggalPanjang(
                                  item.updatedAt,
                                ),
                                status:
                                  item.revisi > 0
                                    ? `Revisi ke-${item.revisi}`
                                    : "Baru",
                              }
                            : [],
                    }))}
                    {...(user?.role === "wakil_dekan_1" && {
                      aksi: true,
                      handleShowModalDelete: handleModalDeleteShow,
                      linkUpdate: "daftar-kriteria/ubah-kriteria",
                    })}
                    {...((user?.role === "tim_akreditasi" ||
                      user?.role === "kaprodi") && {
                      size: "table-md lg:table-md",
                    })}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* paginaton */}
      <Pagination />

      {/* modal detail */}
      <ModalDaftarKriteria
        modalRef={modalRef}
        handleCloseModal={handleCloseModal}
        isShowModal={{
          active: isShowModal.active,
          data: {
            kriteria: `C-${isShowModal.data.kriteria}`,
            namaKriteria: isShowModal.data.namaKriteria,
            createdAt: formatTanggalPanjang(isShowModal.data.createdAt),
            updatedAt: formatTanggalPanjang(isShowModal.data.updatedAt),
            revisi:
              isShowModal.data.revisi > 0
                ? `Revisi ke-${isShowModal.data.revisi}`
                : "Baru",
          },
          id: isShowModal.data.id,
          label: [
            { key: "kriteria", label: "Kriteria" },
            { key: "namaKriteria", label: "Nama Kriteria" },
            { key: "createdAt", label: "Tanggal Buat" },
            { key: "updatedAt", label: "Tanggal Ubah" },
            { key: "revisi", label: "Status" },
          ],
        }}
        linkUpdate={`/dashboard/daftar-kriteria/ubah-kriteria/${isShowModal.data.id}`}
        handleShowModalDelete={handleModalDeleteShow}
      />

      {/* modal delete  */}
      <ModalDelete
        handleDelete={handleDelete}
        isLoadingDelete={isLoadingDelete}
        handleCloseModal={handleModalDeleteClose}
        modalRef={modalDeleteRef}
      />
    </div>
  );
};

export default DaftarKriteria;
