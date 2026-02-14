import { type FC } from "react";
import TitlePage from "../../../../components/TitlePage";
import useFormulirKriteria from "./useFormulirKriteria";
import InputFieldNonIconNumber from "../../../../components/inputComponents/InputFieldNonIconNumber";
import InputFieldNonIconText from "../../../../components/inputComponents/InputFieldNonIconText";
import ButtonSubmit from "../../../../components/buttonComponents/ButtonSubmit";
import BreadCrumbs from "../../../../components/BreadCrumbs";
import { cn } from "../../../../utils/cn";
import ButtonBackBox from "../../../../components/buttonComponents/ButtonBackBox";

const FormulirKriteria: FC = () => {
  // use formulir kriteria
  const {
    errors,
    register,
    handleSubmit,
    isPending,
    onSubmit,
    pathname,
    kriteria,
    namaKriteria,
    formulirUpdate,
  } = useFormulirKriteria();
  return (
    <div className="w-full flex flex-col justify-start items-start">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={
            formulirUpdate
              ? "/dashboard/daftar-kriteria/ubah-kriteria"
              : pathname
          }
          link={["/dashboard/daftar-kriteria"]}
        />
      </div>
      <div className="card w-full flex flex-col justify-start items-start lg:w-1/2 bg-white p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
        {/* title page */}
        <TitlePage
          bigTitle={formulirUpdate ? "Ubah Kriteria" : "Tambah Kriteria"}
          smallTitle={`Halaman untuk ${formulirUpdate ? "mengubah" : "menambah"} kriteria`}
        />

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("w-full flex flex-col justify-start items-center mt-4")}
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
            defaultValue={kriteria}
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
            defaultValue={namaKriteria}
          />

          {/* action */}
          <div className="w-full mt-6 flex flex-row justify-center items-center gap-4">
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

export default FormulirKriteria;
