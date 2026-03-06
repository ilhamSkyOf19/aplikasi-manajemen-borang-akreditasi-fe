import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import Pemberitahuan from "../../views/Global/Pemberitahuan";

const PemberitahuanPage: FC = () => {
  return (
    <>
      <HeaderPage
        title="Dashboard | Pemberitahuan"
        content="Halaman Pemberitahuan"
      />

      <Pemberitahuan />
    </>
  );
};

export default PemberitahuanPage;
