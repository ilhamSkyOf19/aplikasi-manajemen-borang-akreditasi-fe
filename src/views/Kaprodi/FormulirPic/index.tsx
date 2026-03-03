import { type FC } from "react";
import TitlePage from "../../../components/TitlePage";
import ButtonSubmit from "../../../components/buttonComponents/ButtonSubmit";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { cn } from "../../../utils/cn";
import ButtonBackBox from "../../../components/buttonComponents/ButtonBackBox";
import SkeletonForm from "../../../components/SkeletonForm";
import useFormulirPic from "./useFormulirPic";
import type { CreatePicType, UpdatePicType } from "../../../models/pic.model";
import InputFieldChooseWithSearch from "../../../components/inputComponents/InputFieldChooseWithSearch";
import DaftarPilihanInput from "../../../components/DaftarPilihanInput";
import InputFieldNonIconTextArea from "../../../components/inputComponents/InputFieldNonIconTextArea";
import ModalAlertDataDuplikat from "../../../components/modalComponents/ModalAlertDataDuplikat";

const FormulirPic: FC = () => {
  // call use formulir pic
  const {
    dataKebutuhanDokumentasi,
    dataTimAkreditasiAndAnggota,
    formulirUpdate,
    handleRemovePj,
    handleSetKebutuhanDokumentasi,
    handleSetPj,
    handleSetTimAkreditasi,
    isPending,
    kebutuhanDokumentasiController,
    onSubmit,
    pjController,
    register,
    timAkreditasiController,
    handleSubmit,
    pathname,
    isLoadingData,
    watch,
    handleRemoveKebutuhanDokumentasi,
    handleRemoveTimAkreditasi,
    isTimAkreditasiChoose,
    isPjActive,
    dataPic,
    errors,
    currentPathname,
    handleCloseModalDuplikat,
    modalDuplikatRef,
  } = useFormulirPic();

  return (
    <div className="w-full flex flex-col justify-start items-start pb-40">
      {/* breadcrumbs */}
      <div className="w-full mb-2">
        <BreadCrumbs
          pathname={pathname}
          link={
            currentPathname.includes("detail")
              ? [
                  pathname.split("/").slice(0, -2).join("/"),
                  `${pathname.split("/").slice(0, -1).join("/")}/${dataPic?.data?.data?.id}`,
                ]
              : [pathname.split("/").slice(0, -1).join("/")]
          }
        />
      </div>
      <div className="card w-full flex flex-col justify-start items-start lg:w-1/2 bg-base-100 p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
        {/* title page */}
        <TitlePage
          bigTitle={formulirUpdate ? "Ubah PIC" : "Tambah PIC"}
          smallTitle={`Halaman untuk ${formulirUpdate ? "mengubah" : "menambah"} PIC.`}
        />

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("w-full flex flex-col justify-start items-center mt-4")}
        >
          {/* loading */}
          {isLoadingData ? (
            <SkeletonForm />
          ) : (
            <>
              {/* kebutuhan dokumentasi  */}
              <InputFieldChooseWithSearch<CreatePicType | UpdatePicType>
                controller={kebutuhanDokumentasiController}
                label="jenis dokumentasi"
                required={true}
                placeholder="Pilih jenis dokumentasi"
                chooseList={
                  dataKebutuhanDokumentasi?.data?.map((item) => ({
                    label: item.namaDokumen,
                    id: item.id,
                  })) ?? []
                }
                handleSearch={() => {}}
                active={[watch("kebutuhanDokumenId") ?? 0]}
                handleChoose={handleSetKebutuhanDokumentasi}
                handleRemove={handleRemoveKebutuhanDokumentasi}
                limit={10}
                totalData={dataKebutuhanDokumentasi?.meta?.totalData}
                totalPage={dataKebutuhanDokumentasi?.meta?.totalPage}
                currentPage={dataKebutuhanDokumentasi?.meta?.currentPage}
                setPage={() => {}}
                showValueInPlaceholder={
                  dataKebutuhanDokumentasi?.data?.find(
                    (item) => item.id === watch("kebutuhanDokumenId"),
                  )?.namaDokumen
                }
                chooseAndHide={true}
              />

              {/* tim akreditasi  */}
              <InputFieldChooseWithSearch<CreatePicType | UpdatePicType>
                controller={timAkreditasiController}
                label="tim akreditasi"
                required={true}
                placeholder="Pilih tim akreditasi"
                chooseList={
                  dataTimAkreditasiAndAnggota?.data?.map((item) => ({
                    label: item.namaTimAkreditasi,
                    id: item.id,
                  })) ?? []
                }
                handleSearch={() => {}}
                active={[watch("timAkreditasiId") ?? 0]}
                handleChoose={handleSetTimAkreditasi}
                handleRemove={handleRemoveTimAkreditasi}
                limit={10}
                totalData={dataTimAkreditasiAndAnggota?.meta?.totalData}
                totalPage={dataTimAkreditasiAndAnggota?.meta?.totalPage}
                currentPage={dataTimAkreditasiAndAnggota?.meta?.currentPage}
                setPage={() => {}}
                showValueInPlaceholder={
                  dataTimAkreditasiAndAnggota?.data?.find(
                    (item) => item.id === watch("timAkreditasiId"),
                  )?.namaTimAkreditasi
                }
                chooseAndHide
              />

              {/* pj id  */}
              {watch("timAkreditasiId") && (
                <InputFieldChooseWithSearch<CreatePicType | UpdatePicType>
                  controller={pjController}
                  label="penanggung jawab"
                  required={true}
                  placeholder="Pilih penanggung jawab"
                  chooseList={
                    isTimAkreditasiChoose?.anggota.map((item) => ({
                      label: item.nama,
                      id: item.id,
                    })) ?? []
                  }
                  handleSearch={() => {}}
                  active={isPjActive.map((item) => item.id)}
                  handleChoose={handleSetPj}
                  handleRemove={handleRemovePj}
                  limit={10}
                  totalData={isTimAkreditasiChoose?.anggota.length}
                  totalPage={1}
                  currentPage={1}
                  setPage={() => {}}
                />
              )}

              {/* choose pj active */}
              <div className="w-full mb-6">
                <DaftarPilihanInput
                  label="Daftar penanggung jawab yang dipilih:"
                  list={isPjActive.map((pj) => ({
                    id: pj.id,
                    label: pj.nama,
                  }))}
                  handleRemoveList={handleRemovePj}
                />
              </div>

              {/* keterangan */}
              <InputFieldNonIconTextArea
                register={register("keterangan")}
                label="Keterangan"
                max={1000}
                required
                name="keterangan"
                placeholder="masukan keterangan"
                rows={8}
                defaultValue={dataPic?.data?.data?.keterangan}
                errorMessage={errors.keterangan?.message}
              />

              {/* keterangan */}
              {formulirUpdate && (
                <InputFieldNonIconTextArea
                  register={register("keteranganUpdate")}
                  label="Keterangan Update"
                  max={1000}
                  required
                  name="keteranganUpdate"
                  placeholder="masukan keterangan update"
                  rows={8}
                  errorMessage={errors.keteranganUpdate?.message}
                />
              )}

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

      {/* modal alert */}
      <ModalAlertDataDuplikat
        handleCloseModal={handleCloseModalDuplikat}
        modalRef={modalDuplikatRef}
      />
    </div>
  );
};

export default FormulirPic;
