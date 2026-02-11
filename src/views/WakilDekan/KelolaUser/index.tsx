import { type FC } from "react";
import TitlePage from "../../../components/TitlePage";
import TableData from "../../../components/TableData";
import InputFieldSearch from "../../../components/InputFieldSearch";
import DropDown from "../../../components/DropDown";
import userKelolaUser from "./useKelolaUser";
import SkeletonTable from "../../../components/SkeletonTable";

const KelolaUser: FC = () => {
  // call use
  const { dataKelolaUser, isLoading } = userKelolaUser();

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
                handleChange={() => {}}
                listChoose={[
                  "Wakil Dekan 1",
                  "Kaprodi",
                  "Tim Akreditasi",
                  "Semua",
                ]}
                placeholder="Pilih role"
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
                    handleModal={() => {}}
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
      {/* <ModalDaftarKriteria  
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
      /> */}
    </div>
  );
};

export default KelolaUser;
