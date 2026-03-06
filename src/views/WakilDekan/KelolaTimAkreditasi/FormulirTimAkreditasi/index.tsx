import { type FC } from "react";
import TitlePage from "../../../../components/TitlePage";
import InputFieldNonIconText from "../../../../components/inputComponents/InputFieldNonIconText";
import ButtonSubmit from "../../../../components/buttonComponents/ButtonSubmit";
import BreadCrumbs from "../../../../components/BreadCrumbs";
import { cn } from "../../../../utils/cn";
import ButtonBackBox from "../../../../components/buttonComponents/ButtonBackBox";
import useFormulirTimAkreditasi from "./useFormulirTimAkreditasi";
import type {
  CreateTimAkreditasiType,
  UpdateTimAkreditasiType,
} from "../../../../models/timAkreditasi.model";
import InputFieldChooseWithSearch from "../../../../components/inputComponents/InputFieldChooseWithSearch";
import SkeletonForm from "../../../../components/skeletonComponents/SkeletonForm";
import DaftarPilihanInput from "../../../../components/DaftarPilihanInput";
import ModalAlert from "../../../../components/modalComponents/ModalAlert";

const FormulirTimAkreditasi: FC = () => {
  // use formulir kriteria
  const {
    errors,
    register,
    handleSubmit,
    isPending,
    onSubmit,
    pathname,
    formulirUpdate,
    dataTimAkreditasi,
    usersController,
    dataUsers,
    handleSearchUsers,
    chooseUser,
    handleChooseUser,
    handleRemoveUser,
    setPageUsers,
    loadingDataTimAkreditasi,
    handleCancel,
    handleConfirm,
    modalRefConfirm,
  } = useFormulirTimAkreditasi();

  return (
    <div className="w-full flex flex-col justify-start items-start pb-40">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={
            formulirUpdate
              ? "/dashboard/kelola-tim-akreditasi/ubah-tim-akreditasi"
              : pathname
          }
          link={["/dashboard/kelola-tim-akreditasi"]}
        />
      </div>
      <div className="card w-full flex flex-col justify-start items-start lg:w-1/2 bg-white p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
        {/* title page */}
        <TitlePage
          bigTitle={
            formulirUpdate ? "Ubah Tim Akreditasi" : "Tambah Tim Akreditasi"
          }
          smallTitle={`Halaman untuk ${formulirUpdate ? "mengubah" : "menambah"} tim akreditasi.`}
        />

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("w-full flex flex-col justify-start items-center mt-4")}
        >
          {/* loading */}
          {loadingDataTimAkreditasi ? (
            <SkeletonForm />
          ) : (
            <>
              {/* nama user */}
              <InputFieldNonIconText
                register={register("namaTimAkreditasi")}
                label="nama tim"
                max={100}
                name="namaTimAkreditasi"
                required={true}
                placeholder="masukan nama tim akreditasi"
                errorMessage={errors.namaTimAkreditasi?.message}
                defaultValue={dataTimAkreditasi?.namaTimAkreditasi}
              />

              <InputFieldChooseWithSearch<
                CreateTimAkreditasiType | UpdateTimAkreditasiType
              >
                controller={usersController}
                label="Anggota"
                required={true}
                placeholder="Pilih anggota"
                chooseList={
                  dataUsers?.data.map((user) => ({
                    label: user.nama,
                    id: user.id,
                  })) ?? []
                }
                handleSearch={handleSearchUsers}
                active={chooseUser.map((user) => user.id)}
                handleChoose={handleChooseUser}
                handleRemove={handleRemoveUser}
                limit={10}
                totalData={dataUsers?.meta?.totalData}
                totalPage={dataUsers?.meta?.totalPage}
                currentPage={dataUsers?.meta?.currentPage}
                setPage={setPageUsers}
              />

              {/* list choose  */}
              <DaftarPilihanInput
                label="Daftar anggota yang dipilih :"
                list={chooseUser.map((user) => ({
                  id: user.id,
                  label: user.nama,
                }))}
                handleRemoveList={handleRemoveUser}
              />

              {/* action */}
              <div className="w-full mt-10 flex flex-row justify-end items-center gap-4">
                {/* button back */}
                <ButtonBackBox label="Kembali" />
                {/* button submit */}
                <ButtonSubmit
                  label={`${formulirUpdate ? "Ubah" : "Simpan"}`}
                  isLoading={isPending}
                />
              </div>
            </>
          )}
        </form>
      </div>

      {/* modal confirm */}
      <ModalAlert
        modalRef={modalRefConfirm}
        handleCloseModal={handleCancel}
        handleConfirm={handleConfirm}
        bigTitle="Apakah Anda yakin ingin mengubah data ini?"
        smallTitle="Data ini saling terhubung dengan data lain. Mohon pastikan sebelum melakukan perubahan."
      />
    </div>
  );
};

export default FormulirTimAkreditasi;
