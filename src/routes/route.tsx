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
import KelolaUserPage from "../pages/KelolaUser";
import FormulirKelolaUserPage from "../pages/FormulirKelolaUserPage";
import { useAuthStore } from "../stores/authStore";
import FormulirTimAkreditasiPage from "../pages/FormulirTimAkreditasiPage";
import KelolaKebutuhanDokumentasiPage from "../pages/KelolaKebutuhanDokumentasiPage";
import FormulirKebutuhanDokumentasiPage from "../pages/FormulirKebutuhanDokumentasiPage";
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
          // set user context
          useAuthStore.getState().setUser(result.data);

          return null;
        }

        return null;
      } catch (err: any) {
        if (err.response?.status === 401) {
          return redirect("/login");
        }

        throw err;
      }
    },
    shouldRevalidate: () => true,
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

      // tambah user
      {
        path: "kelola-user/tambah-user",
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <FormulirKelolaUserPage />
          </RoleGuard>
        ),
      },

      // update user
      {
        path: "kelola-user/ubah-user/:id",
        loader: async ({ params }) => {
          if (!params.id || isNaN(Number(params.id))) {
            return redirect("/dashboard/kelola-user");
          }
        },
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <FormulirKelolaUserPage />
          </RoleGuard>
        ),
      },

      // kelola tim akreditasi
      {
        path: "kelola-tim-akreditasi",
        element: <KelolaTimAkreditasiPage />,
      },

      // tambah tim akreditasi
      {
        path: "kelola-tim-akreditasi/tambah-tim-akreditasi",
        element: <FormulirTimAkreditasiPage />,
      },
      // update tim akreditasi
      {
        path: "kelola-tim-akreditasi/ubah-tim-akreditasi/:id",
        loader: async ({ params }) => {
          if (!params.id || isNaN(Number(params.id))) {
            return redirect("/dashboard/kelola-tim-akreditasi");
          }
        },
        element: <FormulirTimAkreditasiPage />,
      },

      // kelola kebutuhan dokumentasi
      {
        path: "kelola-kebutuhan-dokumentasi",
        element: <KelolaKebutuhanDokumentasiPage />,
      },
      // tambah kebutuhan dokumentasi
      {
        path: "kelola-kebutuhan-dokumentasi/tambah-kebutuhan-dokumentasi",
        element: <FormulirKebutuhanDokumentasiPage />,
      },
      // update kebutuhan dokumentasi
      {
        path: "kelola-kebutuhan-dokumentasi/ubah-kebutuhan-dokumentasi/:id",
        loader: async ({ params }) => {
          if (!params.id || isNaN(Number(params.id))) {
            return redirect("/dashboard/kelola-kebutuhan-dokumentasi");
          }
        },
        element: <FormulirKebutuhanDokumentasiPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default route;
