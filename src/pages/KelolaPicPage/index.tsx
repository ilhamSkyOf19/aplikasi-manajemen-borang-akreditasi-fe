import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import KelolaPic from "../../views/WakilDekan&Kaprodi/KelolaPic";

const KelolaPicPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage title="Dashboard | Kelola PIC" content="Kelola PIC" />

      <KelolaPic />
    </>
  );
};

export default KelolaPicPage;
