import { type FC } from "react";
import TitlePage from "../../../components/TitlePage";
import TableData from "../../../components/TableData";
import InputFieldSearch from "../../../components/InputFieldSearch";
import DropDown from "../../../components/DropDown";
import SkeletonTable from "../../../components/SkeletonTable";
import ModalDataDetail from "../../../components/ModalDataDetail";
import ModalDelete from "../../../components/ModalDelete";
import useKelolaUser from "./useKelolaUser";

const KelolaUser: FC = () => {
  // call use
  const {
    dataKelolaUser,
    isLoading,
    handleCloseModalDetail,
    handleShowModalDetail,
    isShowModal,
    modalDeleteRef,
    modalRef,
    handleShowModalDelete,
    handleCloseModalDelete,
    setFilterRole,
  } = useKelolaUser();

  return (
    <div className="w-full flex flex-col justify-between items-start pb-20">
      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <TitlePage
          bigTitle="Kelola Daftar User"
          smallTitle="Halaman untuk mengelola daftar user pada aplikasi."
          labelAdd="Tambah User"
          linkAdd="/dashboard/daftar-user/tambah-user"
        />

        <div className="w-full bg-primary-white flex flex-col justify-start items-start mt-8 p-4 rounded-lg">
          {/* input field  search */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-end lg:items-center gap-2">
            <div className="w-full lg:w-1/2">
              {/* input search */}
              <InputFieldSearch handleSearch={() => {}} />
            </div>

            {/* filter role */}
            <div className="w-35 lg:w-50">
              <DropDown
                handleChange={(e) => setFilterRole(e.target.value)}
                listChoose={[
                  { value: "wakil_dekan_1", label: "Wakil Dekan 1" },
                  { value: "kaprodi", label: "kaprodi" },
                  { value: "tim_akreditasi", label: "Tim Akreditasi" },
                  { value: "semua", label: "Semua" },
                ]}
                placeholder="Pilih status"
              />
            </div>
          </div>

          {/* table data */}
          {isLoading ? (
            <SkeletonTable />
          ) : (
            dataKelolaUser?.data && (
              <>
                {/* table data for sm */}
                <div className="w-full lg:hidden">
                  <TableData
                    header={[{ label: "nama", size: 80, key: "nama" }]}
                    datas={
                      dataKelolaUser?.data?.data.map((item) => ({
                        fields: { id: item.id, nama: item.nama },
                      })) || []
                    }
                    aksiModal={true}
                    handleModal={handleShowModalDetail}
                    isDataModalActive={0}
                  />
                </div>

                {/* table  */}
                <div className="w-full hidden lg:flex">
                  <TableData
                    header={[
                      {
                        key: "nama",
                        label: "Nama",
                        size: 25,
                      },
                      {
                        key: "email",
                        label: "Email",
                        size: 19,
                      },
                      {
                        key: "role",
                        label: "Role",
                        size: 19,
                      },
                    ]}
                    datas={dataKelolaUser?.data?.data.map((item) => ({
                      fields: {
                        id: item.id,
                        nama: item.nama,
                        email: item.email,
                        role:
                          item.role === "wakil_dekan_1"
                            ? "Wakil Dekan 1"
                            : item.role === "kaprodi"
                              ? "Kaprodi"
                              : item.role === "tim_akreditasi"
                                ? "Tim Akreditasi"
                                : "",
                      },
                    }))}
                    aksi={true}
                    handleShowModalDelete={() => {}}
                    linkUpdate={"kelola-user/ubah-user"}
                    fieldAksi={[
                      {
                        header: "Tim Akreditasi",
                        label: "Lihat selengkapnya",
                        size: 19,
                        handleAksi: () => {},
                      },
                    ]}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>

      {/* modal */}
      <ModalDataDetail
        modalRef={modalRef}
        handleCloseModal={handleCloseModalDetail}
        isShowModal={{
          active: isShowModal.active,
          data: {
            nama: isShowModal?.data?.nama || "",
            email: isShowModal?.data?.email || "",
            role:
              isShowModal?.data?.role &&
              (isShowModal?.data?.role === "wakil_dekan_1"
                ? "Wakil Dekan 1"
                : isShowModal?.data?.role === "kaprodi"
                  ? "Kaprodi"
                  : isShowModal?.data?.role === "tim_akreditasi"
                    ? "Tim Akreditasi"
                    : ""),
          },
          id: isShowModal?.data?.id || 0,
          label: [
            { key: "nama", label: "Nama" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
          ],
        }}
        linkUpdate={`/dashboard/kelola-user/ubah-user/${isShowModal?.data?.id || 0}`}
        handleShowModalDelete={handleShowModalDelete}
      />

      {/* modal delete */}
      <ModalDelete
        handleDelete={() => {}}
        isLoadingDelete={false}
        handleCloseModal={handleCloseModalDelete}
        modalRef={modalDeleteRef}
      />
    </div>
  );
};

export default KelolaUser;
