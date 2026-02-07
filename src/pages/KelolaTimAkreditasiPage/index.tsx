import { type FC } from "react";
import KelolaTimAkreditasi from "../../views/WakilDekan/KelolaTimAkreditasi";
import HeaderPage from "../../layouts/HeaderPage";

const KelolaTimAkreditasiPage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard | Kelola Tim Akreditasi"
        content="Kelola Tim Akreditasi"
      />

      <KelolaTimAkreditasi />
    </>
  );
};

export default KelolaTimAkreditasiPage;
