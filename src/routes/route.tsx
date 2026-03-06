import { createBrowserRouter, redirect } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { AuthService } from "../services/auth.service";

// Layouts & Guards
import DashboardLayout from "../layouts/DashboardLayout";
import RoleGuard from "../guards/RoleGuard";

// Pages - Shared
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/Homepage";

// Pages - Wakil Dekan 1
import DaftarKriteriaPage from "../pages/DaftarKriteriaPage";
import FormulirDaftarKriteriaPage from "../pages/FormulirDaftarKriteriaPage";
import KelolaUserPage from "../pages/KelolaUser";
import FormulirKelolaUserPage from "../pages/FormulirKelolaUserPage";
import KelolaTimAkreditasiPage from "../pages/KelolaTimAkreditasiPage";
import FormulirTimAkreditasiPage from "../pages/FormulirTimAkreditasiPage";
import DaftarVerifikasiKebutuhanDokumentasiAndPicPage from "../pages/DaftarVerifikasiKebutuhanDokumentasiAndPicPage";

// Pages - Kaprodi
import KelolaKebutuhanDokumentasiPage from "../pages/KelolaKebutuhanDokumentasiPage";
import FormulirKebutuhanDokumentasiPage from "../pages/FormulirKebutuhanDokumentasiPage";
import KebutuhanDokumentasiDetailPage from "../pages/KebutuhanDokumentasiDetailPage";
import KelolaPicPage from "../pages/KelolaPicPage";
import FormulirPicPage from "../pages/FormulirPicPage";
import KelolaPicDetailPage from "../pages/KelolaPicDetailPage";
import RiwayatPage from "../pages/RiwayatPage";
import PemberitahuanPage from "../pages/PemberitahuanPage";

// ============================================================
// LOADER: cek auth di setiap masuk dashboard
// ============================================================
const dashboardLoader = async () => {
  try {
    const result = await AuthService.me();
    if (result && result.meta.statusCode === 200) {
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
};

// ============================================================
// LOADER: validasi params ID
// ============================================================
const idLoader =
  (fallbackPath: string) =>
  async ({ params }: { params: any }) => {
    if (!params.id || isNaN(Number(params.id))) {
      return redirect(fallbackPath);
    }
    return null;
  };

// ============================================================
// ROUTE
// ============================================================
const route = createBrowserRouter([
  // ── Redirect root ────────────────────────────────────────
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },

  // ── Login ────────────────────────────────────────────────
  {
    path: "/login",
    element: <LoginPage />,
  },

  // ── 404 ─────────────────────────────────────────────────
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

  // ── Dashboard (protected) ────────────────────────────────
  {
    path: "/dashboard",
    loader: dashboardLoader,
    shouldRevalidate: () => true,
    element: <DashboardLayout />,
    children: [
      // ── Home ─────────────────────────────────────────────
      {
        index: true,
        element: <HomePage />,
      },

      // ===========================================================
      // ROLE: WAKIL DEKAN 1
      // ===========================================================

      // ── Daftar Kriteria ──────────────────────────────────
      {
        path: "daftar-kriteria",
        children: [
          {
            index: true,
            element: <DaftarKriteriaPage />,
          },
          {
            path: "tambah-kriteria",
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <FormulirDaftarKriteriaPage />
              </RoleGuard>
            ),
          },
          {
            path: "ubah-kriteria/:id",
            loader: idLoader("/dashboard/daftar-kriteria"),
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <FormulirDaftarKriteriaPage />
              </RoleGuard>
            ),
          },
        ],
      },

      // ── Kelola User ──────────────────────────────────────
      {
        path: "kelola-user",
        children: [
          {
            index: true,
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <KelolaUserPage />
              </RoleGuard>
            ),
          },
          {
            path: "tambah-user",
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <FormulirKelolaUserPage />
              </RoleGuard>
            ),
          },
          {
            path: "ubah-user/:id",
            loader: idLoader("/dashboard/kelola-user"),
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <FormulirKelolaUserPage />
              </RoleGuard>
            ),
          },
        ],
      },

      // ── Kelola Tim Akreditasi ────────────────────────────
      {
        path: "kelola-tim-akreditasi",
        children: [
          {
            index: true,
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <KelolaTimAkreditasiPage />
              </RoleGuard>
            ),
          },
          {
            path: "tambah-tim-akreditasi",
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <FormulirTimAkreditasiPage />
              </RoleGuard>
            ),
          },
          {
            path: "ubah-tim-akreditasi/:id",
            loader: idLoader("/dashboard/kelola-tim-akreditasi"),
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <FormulirTimAkreditasiPage />
              </RoleGuard>
            ),
          },
        ],
      },

      // ── Verifikasi Kebutuhan Dokumentasi & PIC (WD1) ─────
      {
        path: "verifikasi-kebutuhan-dokumentasi-pic",
        children: [
          {
            index: true,
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <DaftarVerifikasiKebutuhanDokumentasiAndPicPage />
              </RoleGuard>
            ),
          },
          {
            path: "detail/:id",
            loader: idLoader("/dashboard/verifikasi-kebutuhan-dokumentasi-pic"),
            element: (
              <RoleGuard allowedRoles={["wakil_dekan_1"]}>
                <KelolaPicDetailPage />
              </RoleGuard>
            ),
          },
          {
            path: "detail/riwayat/:id",
            loader: idLoader("/dashboard/verifikasi-kebutuhan-dokumentasi-pic"),
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
          {
            path: "riwayat/:id",
            loader: idLoader("/dashboard/verifikasi-kebutuhan-dokumentasi-pic"),
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

      // ===========================================================
      // ROLE: KAPRODI
      // ===========================================================

      // ── Kelola Kebutuhan Dokumentasi ─────────────────────
      {
        path: "kelola-kebutuhan-dokumentasi",
        children: [
          {
            index: true,
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <KelolaKebutuhanDokumentasiPage />
              </RoleGuard>
            ),
          },
          {
            path: "tambah-kebutuhan-dokumentasi",
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirKebutuhanDokumentasiPage />
              </RoleGuard>
            ),
          },
          {
            path: "ubah-kebutuhan-dokumentasi/:id",
            loader: idLoader("/dashboard/kelola-kebutuhan-dokumentasi"),
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirKebutuhanDokumentasiPage />
              </RoleGuard>
            ),
          },
          {
            path: "detail/:id",
            loader: idLoader("/dashboard/kelola-kebutuhan-dokumentasi"),
            element: <KebutuhanDokumentasiDetailPage />,
          },
          {
            path: "detail/ubah-kebutuhan-dokumentasi/:id",
            loader: idLoader("/dashboard/kelola-kebutuhan-dokumentasi"),
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirKebutuhanDokumentasiPage />
              </RoleGuard>
            ),
          },
        ],
      },

      // ── Kelola PIC ───────────────────────────────────────
      {
        path: "kelola-pic",
        children: [
          {
            index: true,
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <KelolaPicPage />
              </RoleGuard>
            ),
          },
          {
            path: "tambah-pic",
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirPicPage />
              </RoleGuard>
            ),
          },
          {
            path: "ubah-pic/:id",
            loader: idLoader("/dashboard/kelola-pic"),
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirPicPage />
              </RoleGuard>
            ),
          },
          {
            path: "riwayat/:id",
            loader: idLoader("/dashboard/kelola-pic"),
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
          {
            path: "detail/:id",
            loader: idLoader("/dashboard/kelola-pic"),
            element: <KelolaPicDetailPage />,
          },
          {
            path: "detail/ubah-pic/:id",
            loader: idLoader("/dashboard/kelola-pic"),
            element: (
              <RoleGuard allowedRoles={["kaprodi"]}>
                <FormulirPicPage />
              </RoleGuard>
            ),
          },
          {
            path: "detail/riwayat/:id",
            loader: idLoader("/dashboard/kelola-pic"),
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
      // ── Pemberitahuan ───────────────────────────────────────
      {
        path: "pemberitahuan",
        children: [
          {
            index: true,
            element: <PemberitahuanPage />,
          },
        ],
      },
    ],
  },
]);

export default route;
