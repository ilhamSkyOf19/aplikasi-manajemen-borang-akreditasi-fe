import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import FormulirPic from "../../views/Kaprodi/FormulirPic";

const FormulirPicPage: FC = () => {
  return (
    <>
      {/* hader page */}
      <HeaderPage title="Dashboard | Tambah PIC" content="Tambah PIC" />

      {/* content */}
      <FormulirPic />
    </>
  );
};

export default FormulirPicPage;
