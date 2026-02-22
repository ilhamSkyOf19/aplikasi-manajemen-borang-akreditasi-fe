import { type FC } from "react";
import TitlePage from "../../../../components/TitlePage";
import InputFieldNonIconText from "../../../../components/inputComponents/InputFieldNonIconText";
import ButtonSubmit from "../../../../components/buttonComponents/ButtonSubmit";
import BreadCrumbs from "../../../../components/BreadCrumbs";
import { cn } from "../../../../utils/cn";
import ButtonBackBox from "../../../../components/buttonComponents/ButtonBackBox";
import useFomulirKebutuhanDokumentasi from "./useFormulirKebutuhanDokumentasi";
import InputFieldChoose from "../../../../components/inputComponents/InputFieldChoose";
import type {
  CreateKebutuhanDokumenType,
  UpdateKebutuhanDokumenType,
} from "../../../../models/kebutuhanDokumentasi.model";
import InputFieldNonIconTextArea from "../../../../components/inputComponents/InputFieldNonIconTextArea";
import SkeletonForm from "../../../../components/SkeletonForm";

const FormulirKebutuhanDokumentasi: FC = () => {
  // use formulir kriteria
  const {
    errors,
    register,
    handleSubmit,
    isPending,
    onSubmit,
    pathname,
    formulirUpdate,
    dataKriteria,
    dataKebutuhanDokumentasi,
    kriteriaController,
    pendekatanController,
    loadingData,
  } = useFomulirKebutuhanDokumentasi();
  return (
    <div className="w-full flex flex-col justify-start items-start pb-40">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={
            formulirUpdate
              ? "/dashboard/kelola-kebutuhan-dokumentasi/ubah-kebutuhan-dokumentasi"
              : pathname
          }
          link={["/dashboard/kelola-kebutuhan-dokumentasi"]}
        />
      </div>
      <div className="card w-full flex flex-col justify-start items-start lg:w-1/2 bg-white p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
        {/* title page */}
        <TitlePage
          bigTitle={
            formulirUpdate
              ? "Ubah Kebutuhan Dokumentasi"
              : "Tambah Kebutuhan Dokumentasi"
          }
          smallTitle={`Halaman untuk ${formulirUpdate ? "mengubah" : "menambah"} Kebutuhan Dokumentasi.`}
        />

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("w-full flex flex-col justify-start items-center mt-4")}
        >
          {/* loading */}
          {loadingData ? (
            <SkeletonForm />
          ) : (
            <>
              {/* nama user */}
              <InputFieldNonIconText
                register={register("namaDokumen")}
                label="nama dokumentasi"
                max={100}
                name="namaDokumen"
                required={true}
                placeholder="masukan nama dokumentasi"
                errorMessage={errors.namaDokumen?.message}
                defaultValue={dataKebutuhanDokumentasi?.namaDokumen}
              />

              {/* choose kriteria */}
              <InputFieldChoose<
                CreateKebutuhanDokumenType | UpdateKebutuhanDokumenType
              >
                controller={kriteriaController}
                label="Kriteria"
                required={true}
                placeholder="Pilih Kriteria"
                chooseList={
                  dataKriteria?.data
                    ? dataKriteria?.data.map((item) => ({
                        label: item.namaKriteria,
                        value: item.id,
                      }))
                    : []
                }
              />

              {/* choose pendekatan */}
              <InputFieldChoose<
                CreateKebutuhanDokumenType | UpdateKebutuhanDokumenType
              >
                controller={pendekatanController}
                label="Pendekatan"
                required={true}
                placeholder="Pilih Pendekatan"
                chooseList={[
                  {
                    value: 1,
                    label: "C1 - Penetapan",
                  },
                  {
                    value: 2,
                    label: "C2 - Pelaksanaan",
                  },
                  {
                    value: 3,
                    label: "C3 - Evaluasi",
                  },
                  {
                    value: 4,
                    label: "C4 - Pengendalian",
                  },
                  {
                    value: 5,
                    label: "C5 - Peningkatan",
                  },
                ]}
              />

              {/* keterangan */}
              <InputFieldNonIconTextArea
                register={register("keterangan")}
                label="keterangan"
                max={1000}
                name="keterangan"
                required={true}
                placeholder="masukan nama keterangan"
                errorMessage={errors.keterangan?.message}
                defaultValue={dataKebutuhanDokumentasi?.keterangan}
                rows={10}
              />

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

export default FormulirKebutuhanDokumentasi;
