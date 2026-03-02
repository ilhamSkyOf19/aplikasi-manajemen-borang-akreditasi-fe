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
import KebutuhanDokumentasiDetailPage from "../pages/KebutuhanDokumentasiDetailPage";
import KelolaPicPage from "../pages/KelolaPicPage";
import FormulirPicPage from "../pages/FormulirPicPage";
import KelolaPicDetailPage from "../pages/KelolaPicDetailPage";
import RiwayatPage from "../pages/RiwayatPage";
import DaftarVerifikasiKebutuhanDokumentasiAndPicPage from "../pages/DaftarVerifikasiKebutuhanDokumentasiAndPicPage";
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
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <FormulirDaftarKriteriaPage />
          </RoleGuard>
        ),
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
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <KelolaTimAkreditasiPage />
          </RoleGuard>
        ),
      },

      // tambah tim akreditasi
      {
        path: "kelola-tim-akreditasi/tambah-tim-akreditasi",
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <FormulirTimAkreditasiPage />
          </RoleGuard>
        ),
      },
      // update tim akreditasi
      {
        path: "kelola-tim-akreditasi/ubah-tim-akreditasi/:id",
        loader: async ({ params }) => {
          if (!params.id || isNaN(Number(params.id))) {
            return redirect("/dashboard/kelola-tim-akreditasi");
          }
        },
        element: (
          <RoleGuard allowedRoles={["wakil_dekan_1"]}>
            <FormulirTimAkreditasiPage />
          </RoleGuard>
        ),
      },

      // kelola kebutuhan dokumentasi
      {
        path: "kelola-kebutuhan-dokumentasi",
        children: [
          {
            path: "",
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <KelolaKebutuhanDokumentasiPage />
              </RoleGuard>
            ),
          },

          {
            path: "detail",
            children: [
              {
                path: ":id",

                loader: async ({ params }) => {
                  if (!params.id || isNaN(Number(params.id))) {
                    return redirect("/dashboard/kelola-kebutuhan-dokumentasi");
                  }
                },
                element: <KebutuhanDokumentasiDetailPage />,
              },
              // update kebutuhan dokumentasi
              {
                path: "ubah-kebutuhan-dokumentasi/:id",
                loader: async ({ params }) => {
                  if (!params.id || isNaN(Number(params.id))) {
                    return redirect("/dashboard/kelola-kebutuhan-dokumentasi");
                  }
                },
                element: (
                  <RoleGuard allowedRoles={["kaprodi"]}>
                    <FormulirKebutuhanDokumentasiPage />
                  </RoleGuard>
                ),
              },
            ],
          },
          // tambah kebutuhan dokumentasi
          {
            path: "tambah-kebutuhan-dokumentasi",
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirKebutuhanDokumentasiPage />
              </RoleGuard>
            ),
          },
          // update kebutuhan dokumentasi
          {
            path: "ubah-kebutuhan-dokumentasi/:id",
            loader: async ({ params }) => {
              if (!params.id || isNaN(Number(params.id))) {
                return redirect("/dashboard/kelola-kebutuhan-dokumentasi");
              }
            },
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirKebutuhanDokumentasiPage />
              </RoleGuard>
            ),
          },
        ],
      },

      // pic
      {
        path: "kelola-pic",
        element: (
          <RoleGuard allowedRoles={["kaprodi"]}>
            <KelolaPicPage />
          </RoleGuard>
        ),
      },

      // tambah pic
      {
        path: "kelola-pic",
        children: [
          {
            path: "tambah-pic",
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirPicPage />
              </RoleGuard>
            ),
          },
          // update pic
          {
            path: "ubah-pic/:id",
            loader: async ({ params }) => {
              if (!params.id || isNaN(Number(params.id))) {
                return redirect("/dashboard/kelola-pic");
              }
            },
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirPicPage />
              </RoleGuard>
            ),
          },
          // detail pic
          {
            path: "detail",
            children: [
              {
                path: ":id",

                loader: async ({ params }) => {
                  if (!params.id || isNaN(Number(params.id))) {
                    return redirect("/dashboard/kelola-pic");
                  }
                },
                element: <KelolaPicDetailPage />,
              },

              // update pic
              {
                path: "ubah-pic/:id",
                loader: async ({ params }) => {
                  if (!params.id || isNaN(Number(params.id))) {
                    return redirect("/dashboard/kelola-pic");
                  }
                },
                element: (
                  <RoleGuard allowedRoles={["kaprodi"]}>
                    <FormulirPicPage />
                  </RoleGuard>
                ),
              },

              // pic riwayat kaprod
              {
                path: "riwayat/:id",

                loader: async ({ params }) => {
                  if (!params.id || isNaN(Number(params.id))) {
                    return redirect("/dashboard/kelola-pic");
                  }
                },
                element: (
                  <RoleGuard allowedRoles={["kaprodi"]}>
                    <RiwayatPage
                      title="Riwayat PIC"
                      content="Riwayat PIC"
                      bigTitle="Riwayat PIC"
                      smallTitle="Halaman daftar riwayat PIC"
                      type="pic"
                    />
                  </RoleGuard>
                ),
              },
            ],
          },

          // pic riwayat kaprodi
          {
            path: "riwayat/:id",

            loader: async ({ params }) => {
              if (!params.id || isNaN(Number(params.id))) {
                return redirect("/dashboard/kelola-pic");
              }
            },
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <RiwayatPage
                  title="Riwayat PIC"
                  content="Riwayat PIC"
                  bigTitle="Riwayat PIC"
                  smallTitle="Halaman daftar riwayat PIC"
                  type="pic"
                />
              </RoleGuard>
            ),
          },
        ],
      },

      // formulir kebutuhan dokumentasi & pic
      {
        path: "verifikasi-kebutuhan-dokumentasi-pic",
        children: [
          // verifikasi kebutuhan dokumentasi & pic
          {
            path: "",
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <DaftarVerifikasiKebutuhanDokumentasiAndPicPage />
              </RoleGuard>
            ),
          },
          {
            path: "detail/:id",

            loader: async ({ params }) => {
              if (!params.id || isNaN(Number(params.id))) {
                return redirect(
                  "/dashboard/verifikasi-kebutuhan-dokumentasi-pic",
                );
              }
            },
            element: <KelolaPicDetailPage />,
          },

          // pic riwayat wakil dekan
          {
            path: "riwayat/:id",

            loader: async ({ params }) => {
              if (!params.id || isNaN(Number(params.id))) {
                return redirect(
                  "/dashboard/verifikasi-kebutuhan-dokumentasi-pic",
                );
              }
            },
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <RiwayatPage
                  title="Riwayat PIC"
                  content="Riwayat PIC"
                  bigTitle="Riwayat PIC"
                  smallTitle="Halaman daftar riwayat PIC"
                  type="pic"
                />
              </RoleGuard>
            ),
          },
          // pic riwayat wakil dekan
          {
            path: "detail/riwayat/:id",

            loader: async ({ params }) => {
              if (!params.id || isNaN(Number(params.id))) {
                return redirect(
                  "/dashboard/verifikasi-kebutuhan-dokumentasi-pic",
                );
              }
            },
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <RiwayatPage
                  title="Riwayat PIC"
                  content="Riwayat PIC"
                  bigTitle="Riwayat PIC"
                  smallTitle="Halaman daftar riwayat PIC"
                  type="pic"
                />
              </RoleGuard>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default route;
