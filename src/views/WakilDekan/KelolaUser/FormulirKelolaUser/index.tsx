import { type FC } from "react";
import TitlePage from "../../../../components/TitlePage";
import InputFieldNonIconText from "../../../../components/inputComponents/InputFieldNonIconText";
import ButtonSubmit from "../../../../components/buttonComponents/ButtonSubmit";
import BreadCrumbs from "../../../../components/BreadCrumbs";
import { cn } from "../../../../utils/cn";
import ButtonBackBox from "../../../../components/buttonComponents/ButtonBackBox";
import useFormulirKelolaUser from "./useFormulirKelolaUser";
import InputFieldChoose from "../../../../components/inputComponents/InputFieldChoose";
import type {
  CreateUserType,
  UpdateUserType,
} from "../../../../models/user.model";
import InputFieldNonIconPassword from "../../../../components/inputComponents/InputFieldNonIconPassword";

const FormulirKelolaUser: FC = () => {
  // use formulir kriteria
  const {
    errors,
    register,
    handleSubmit,
    isPending,
    onSubmit,
    pathname,
    dataUser,
    formulirUpdate,
    roleController,
    handlePasswordOtomatis,
  } = useFormulirKelolaUser();
  return (
    <div className="w-full flex flex-col justify-start items-start pb-40">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={
            formulirUpdate ? "/dashboard/kelola-user/ubah-user" : pathname
          }
          link={["/dashboard/kelola-user"]}
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
          {/* nama user */}
          <InputFieldNonIconText
            register={register("nama")}
            label="nama user"
            max={100}
            name="nama"
            required={true}
            placeholder="masukan nama user"
            errorMessage={errors.nama?.message}
            defaultValue={dataUser?.nama}
          />

          {/* email user */}
          <InputFieldNonIconText
            register={register("email")}
            label="email user"
            max={100}
            name="email"
            required={true}
            placeholder="masukan email user"
            errorMessage={errors.email?.message}
            defaultValue={dataUser?.email}
          />

          <InputFieldChoose<CreateUserType | UpdateUserType>
            controller={roleController}
            label="Role"
            required={true}
            placeholder="Pilih role"
            disabled={
              dataUser?.role ? dataUser.role === "wakil_dekan_1" : false
            }
            chooseList={[
              {
                label: "Kaprodi",
                value: "kaprodi",
              },
              {
                label: "Tim Akreditasi",
                value: "tim_akreditasi",
              },
            ]}
          />

          {/* password user */}
          {!formulirUpdate && (
            <>
              <InputFieldNonIconPassword
                register={register("password")}
                label="password user"
                max={100}
                name="password"
                required={true}
                placeholder="masukan password user"
                errorMessage={errors.password?.message}
              />
              <InputFieldNonIconPassword
                register={register("confirmPassword")}
                label="konfirmasi password user"
                max={100}
                name="confirmPassword"
                required={true}
                placeholder="masukan konfirmasi password user"
                errorMessage={errors.confirmPassword?.message}
              />

              {/* generate password  */}
              <div className="w-full flex flex-row justify-end items-center">
                <button
                  type="button"
                  className="text-sm text-primary-purple hover:underline"
                  onClick={handlePasswordOtomatis}
                >
                  Buat password otomatis
                </button>
              </div>
            </>
          )}

          {/* action */}
          <div className="w-full mt-8 flex flex-row justify-center items-center gap-4">
            {/* button back */}
            <ButtonBackBox label="KEMBALI" />
            {/* button submit */}
            <ButtonSubmit
              label={`${formulirUpdate ? "UBAH" : "SIMPAN"}`}
              isLoading={isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulirKelolaUser;
