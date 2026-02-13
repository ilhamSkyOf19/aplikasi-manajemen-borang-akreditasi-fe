import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import FormulirKelolaUser from "../../views/WakilDekan/KelolaUser/FormulirKelolaUser";

const FormulirKelolaUserPage: FC = () => {
  return (
    <>
      {/* hader page */}
      <HeaderPage title="Dashboard | Tambah User" content="Tambah User" />

      {/* content */}
      <FormulirKelolaUser />
    </>
  );
};

export default FormulirKelolaUserPage;
