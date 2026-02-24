import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import KelolaPicDetail from "../../views/WakilDekan&Kaprodi/KelolaPicDetail";

const KelolaPicDetailPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Data PIC Detail"
        content="Data PIC Detail"
      />

      {/* content */}
      <KelolaPicDetail />
    </>
  );
};

export default KelolaPicDetailPage;
