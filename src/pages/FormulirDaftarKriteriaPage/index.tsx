import { type FC } from "react";
import FormulirKriteria from "../../views/Global/DaftarKriteria/FormulirKriteria";
import HeaderPage from "../../layouts/HeaderPage";

const FormulirDaftarKriteriaPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Tambah Kriteria"
        content="Tambah Kriteria"
      />

      {/* content */}
      <FormulirKriteria />
    </>
  );
};

export default FormulirDaftarKriteriaPage;
