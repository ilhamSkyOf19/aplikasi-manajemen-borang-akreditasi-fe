import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import KelolaKebutuhanDokumentasi from "../../views/Kaprodi/KelolaKebutuhabDokumentasi";

const KelolaKebutuhanDokumentasiPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Kelola Kebutuhan Dokumentasi"
        content="Kelola Kebutuhan Dokumentasi"
      />

      {/* content */}
      <KelolaKebutuhanDokumentasi />
    </>
  );
};

export default KelolaKebutuhanDokumentasiPage;
