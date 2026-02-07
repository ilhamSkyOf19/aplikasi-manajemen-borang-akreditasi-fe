import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import DaftarKriteria from "../../views/Global/DaftarKriteria";

const DaftarKriteriaPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Daftar Kriteria"
        content="Daftar Kriteria"
      />

      {/* content */}
      <DaftarKriteria />
    </>
  );
};

export default DaftarKriteriaPage;
