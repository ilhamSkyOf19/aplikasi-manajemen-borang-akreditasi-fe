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
import SkeletonForm from "../../../../components/SkeletonForm";

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
          bigTitle={formulirUpdate ? "Ubah User" : "Tambah User"}
          smallTitle={`Halaman untuk ${formulirUpdate ? "mengubah" : "menambah"} User.`}
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
              <div className="w-full flex flex-col justify-start items-start gap-1">
                <p className="text-sm">Daftar anggota yang dipilih :</p>
                {chooseUser.length > 0 ? (
                  chooseUser.map((item, index) => (
                    <div
                      key={item.id}
                      className="w-full flex flex-row justify-start items-center gap-2 px-4 mt-2"
                    >
                      {/* keterangan */}
                      <div className="w-3/4 flex flex-row justify-start items-center gap-2">
                        {/* number */}
                        <span className="text-sm font-medium">
                          {index + 1}.
                        </span>

                        {/* label */}
                        <p className="text-sm">{item.nama}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveUser(item.id)}
                        className="text-sm text-error hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex flex-row justify-center items-center mt-4">
                    <span className="text-xs text-primary-black/50">
                      Tidak ada anggota
                    </span>
                  </div>
                )}
              </div>

              {/* action */}
              <div className="w-full mt-10 flex flex-row justify-center items-center gap-4">
                {/* button back */}
                <ButtonBackBox label="KEMBALI" />
                {/* button submit */}
                <ButtonSubmit
                  label={`${formulirUpdate ? "UBAH" : "SIMPAN"}`}
                  isLoading={isPending}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormulirTimAkreditasi;
