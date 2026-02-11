import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import KelolaUser from "../../views/WakilDekan/KelolaUser";

const KelolaUserPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage title="Dashboard | kelola User" content="Tambah Kriteria" />

      {/* content */}
      <KelolaUser />
    </>
  );
};

export default KelolaUserPage;
