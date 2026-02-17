import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import FormulirTimAkreditasi from "../../views/WakilDekan/KelolaTimAkreditasi/FormulirTimAkreditasi";

const FormulirTimAkreditasiPage: FC = () => {
  return (
    <>
      {/* hader page */}
      <HeaderPage
        title="Dashboard | Tambah Tim Akreditasi"
        content="Tambah Tim Akreditasi"
      />

      {/* content */}
      <FormulirTimAkreditasi />
    </>
  );
};

export default FormulirTimAkreditasiPage;
