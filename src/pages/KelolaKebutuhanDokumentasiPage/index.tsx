import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import KelolaKebutuhanDokumentasi from "../../views/Kaprodi/KelolaKebutuhabDokumentasi";

const KelolaKebutuhanDokumentasiPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Kelola Kebutuhan Dokumen"
        content="Daftar Kriteria"
      />

      {/* content */}
      <KelolaKebutuhanDokumentasi />
    </>
  );
};

export default KelolaKebutuhanDokumentasiPage;
