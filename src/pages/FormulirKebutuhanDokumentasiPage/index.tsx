import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import FormulirKebutuhanDokumentasi from "../../views/Kaprodi/KelolaKebutuhabDokumentasi/FormulirKebutuhanDokumentasi";

const FormulirKebutuhanDokumentasiPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Tambah Kebutuhan Dokumentasi"
        content="Tambah Kebutuhan Dokumentasi"
      />

      {/* content */}
      <FormulirKebutuhanDokumentasi />
    </>
  );
};

export default FormulirKebutuhanDokumentasiPage;
