import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import FormulirVerfikasiKebutuhanDokumentasiAndPic from "../../views/WakilDekan/FormulirVerifikasiKebutuhanDokumentasiAndPic";

const FormulirVerifikasiKebutuhanDokumentasiAndPicPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Formulir Verifikasi Kebutuhan Dokumentasi & PIC"
        content="Formulir Verifikasi Kebutuhan Dokumentasi & PIC"
      />

      <FormulirVerfikasiKebutuhanDokumentasiAndPic />
    </>
  );
};

export default FormulirVerifikasiKebutuhanDokumentasiAndPicPage;
