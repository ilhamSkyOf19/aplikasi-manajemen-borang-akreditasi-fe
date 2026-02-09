import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { AuthService } from "../services/auth.service";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/Homepage";
import KelolaTimAkreditasiPage from "../pages/KelolaTimAkreditasiPage";
import DaftarKriteriaPage from "../pages/DaftarKriteriaPage";
import FormulirDaftarKriteriaPage from "../pages/FormulirDaftarKriteriaPage";
const route = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/dashboard",

    loader: async () => {
      try {
        const result = await AuthService.me();

        if (result.meta.statusCode === 200) {
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
        element: <FormulirDaftarKriteriaPage />,
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

      // kelola tim akreditasi
      {
        path: "kelola-tim-akreditasi",
        element: <KelolaTimAkreditasiPage />,
      },
    ],
  },

  {
    path: "/login",
    loader: async () => {
      try {
        const result = await AuthService.me();

        if (result.meta.statusCode === 200) {
          return redirect("/");
        }

        return null;
      } catch (err: any) {
        if (err.response?.status === 401) {
          return null; // tetap di login
        }

        throw err;
      }
    },
    element: <LoginPage />,
  },
]);

export default route;
