import type { ElementType } from "react";
import {
  Bell,
  ChartArea,
  FileCog,
  LayoutDashboard,
  ScrollText,
  UserCog,
} from "lucide-react";

export const NAVIGATION_LIST_WD: {
  label: string;
  link: string;
  icon: ElementType;
}[] = [
  {
    label: "dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "progres pengumpulan",
    link: "/dashboard/pengumpulan",
    icon: ChartArea,
  },
  {
    label: "daftar kriteria",
    link: "/dashboard/pengumpulan",
    icon: ScrollText,
  },
  {
    label: "kelola tim akreditasi",
    link: "/dashboard/kelola-tim-akreditasi",
    icon: UserCog,
  },
  {
    label: "daftar dokumentasi borang",
    link: "/dashboard/daftar-dokumentasi-borang",
    icon: ScrollText,
  },
  {
    label: "kelola dokumentasi borang",
    link: "/dashboard/kelola-dokumentasi-borang",
    icon: FileCog,
  },
  {
    label: "daftar kebutuhan & PIC",
    link: "/dashboard/daftar-kebutuhan-pic",
    icon: ScrollText,
  },
  {
    label: "kelola kebutuhan & PIC",
    link: "/dashboard/kelola-kebutuhan-pic",
    icon: UserCog,
  },
  {
    label: "pemberitahuan",
    link: "/dashboard/pemberitahuan",
    icon: Bell,
  },
];
