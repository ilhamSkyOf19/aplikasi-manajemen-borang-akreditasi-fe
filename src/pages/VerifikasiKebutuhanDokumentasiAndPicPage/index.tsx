import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import KelolaPic from "../../views/WakilDekan&Kaprodi/KelolaPic";

const VerifikasiKebutuhanDokumentasiAndPicPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Verifikasi Kebutuhan Dokumentasi & PIC"
        content="Verifikasi Kebutuhan Dokumentasi & PIC"
      />

      <KelolaPic />
    </>
  );
};

export default VerifikasiKebutuhanDokumentasiAndPicPage;
