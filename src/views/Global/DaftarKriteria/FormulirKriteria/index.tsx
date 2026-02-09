import { type FC } from "react";
import TitlePage from "../../../../components/TitlePage";
import useFormulirKriteria from "./useFormulirKriteria";
import InputFieldNonIconNumber from "../../../../components/InputFieldNonIconNumber";
import InputFieldNonIconText from "../../../../components/InputFieldNonIconText";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import BreadCrumbs from "../../../../components/BreadCrumbs";
import { cn } from "../../../../utils/cn";
import ButtonBackBox from "../../../../components/ButtonBackBox";

const FormulirKriteria: FC = () => {
  // use formulir kriteria
  const { errors, register, handleSubmit, isPending, onSubmit, pathname } =
    useFormulirKriteria();
  return (
    <div className="w-full flex flex-col justify-start items-start">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={pathname}
          link={["/dashboard/daftar-kriteria"]}
        />
      </div>
      <div className="card w-full flex flex-col justify-start items-start lg:w-1/2 bg-white p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
        {/* title page */}
        <TitlePage
          bigTitle="Tambah Kriteria"
          smallTitle="Halaman untuk menambah kriteria"
        />

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "w-full flex flex-col justify-start items-center mt-4",
            Object.keys(errors).length > 1 && "gap-3",
          )}
        >
          {/* input kriteria */}
          <InputFieldNonIconNumber
            register={register("kriteria", { valueAsNumber: true })}
            label="kriteria"
            max={30}
            name="kriteria"
            required={true}
            placeholder="masukan kriteria"
            errorMessage={errors.kriteria?.message}
          />

          {/* nama kriteria */}
          <InputFieldNonIconText
            register={register("namaKriteria")}
            label="nama kriteria"
            max={100}
            name="namaKriteria"
            required={true}
            placeholder="masukan nama kriteria"
            errorMessage={errors.namaKriteria?.message}
          />

          {/* action */}
          <div className="w-full mt-6 flex flex-row justify-center items-center gap-4">
            {/* button back */}
            <ButtonBackBox label="KEMBALI" />
            {/* button submit */}
            <ButtonSubmit label="TAMBAH" isLoading={isPending} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulirKriteria;
