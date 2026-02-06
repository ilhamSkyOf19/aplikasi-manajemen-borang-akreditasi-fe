import { type FC } from "react";
import Login from "../../views/Auth/Login/Login";
import HeaderPage from "../../layouts/HeaderPage";

const LoginPage: FC = () => {
  return (
    <main className="container mx-auto min-h-screen flex justify-center items-center px-4">
      {/* header page */}
      <HeaderPage
        title="Auth | Login"
        content="Login ke aplikasi manajemen dokumentasi borang akreditasi untuk mengelola dan memantau dokumen akreditasi secara aman."
      />

      {/* view login */}
      <Login />
    </main>
  );
};

export default LoginPage;
