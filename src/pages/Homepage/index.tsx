import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import Dashboard from "../../views/Global/Dashboard";

const HomePage: FC = () => {
  return (
    <>
      {/* header page */}
      <HeaderPage
        title="Dashboard"
        content="Selamat Datang di Aplikasi Manajemen Dokumentasi Borang Akreditasi"
      />

      {/* content */}
      <Dashboard />
    </>
  );
};

export default HomePage;
