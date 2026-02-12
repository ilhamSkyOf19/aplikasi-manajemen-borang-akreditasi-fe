import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { AuthService } from "../services/auth.service";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/Homepage";
import KelolaTimAkreditasiPage from "../pages/KelolaTimAkreditasiPage";
import DaftarKriteriaPage from "../pages/DaftarKriteriaPage";
import FormulirDaftarKriteriaPage from "../pages/FormulirDaftarKriteriaPage";
import NotFoundPage from "../pages/NotFoundPage";
import RoleGuard from "../guards/RoleGuard";
import GuardLoginPage from "../guards/GuardLoginPage";
import KelolaUserPage from "../pages/KelolaUser";
const route = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/dashboard",

    loader: async () => {
      try {
        const result = await AuthService.me();

        if (result && result.meta.statusCode === 200) {
          return result.data;
        }

        return null;
      } catch (err: any) {
        if (err.response?.status === 401) {
          return redirect("/login");
        }

        throw err;
      }
    },
    shouldRevalidate: () => false,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      // daftar kriteria
      {
        path: "daftar-kriteria",
        element: <DaftarKriteriaPage />,
      },

      // tambah kriteria
      {
        path: "daftar-kriteria/tambah-kriteria",
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <FormulirDaftarKriteriaPage />
          </RoleGuard>
        ),
      },
      {
        path: "daftar-kriteria/ubah-kriteria/:id",
        loader: async ({ params }) => {
          if (!params.id || isNaN(Number(params.id))) {
            return redirect("/dashboard/daftar-kriteria");
          }
        },
        element: <FormulirDaftarKriteriaPage />,
      },

      // kelola user
      {
        path: "kelola-user",
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <KelolaUserPage />
          </RoleGuard>
        ),
      },

      // kelola tim akreditasi
      {
        path: "kelola-tim-akreditasi",
        element: <KelolaTimAkreditasiPage />,
      },
    ],
  },

  {
    path: "/login",
    element: (
      <GuardLoginPage>
        <LoginPage />
      </GuardLoginPage>
    ),
  },
]);

export default route;
