import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import KebutuhanDokumentasiDetail from "../../views/Kaprodi/KebutuhanDokumentasiDetail";

const KebutuhanDokumentasiDetailPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Kebutuhan Dokumentasi Detail"
        content="Kebutuhan Dokumentasi Detail"
      />

      {/* content */}
      <KebutuhanDokumentasiDetail />
    </>
  );
};

export default KebutuhanDokumentasiDetailPage;
