export type UserRole = "wakil_dekan_1" | "kaprodi" | "tim_akreditasi";

export type MetaType = {
  totalData: number;
  currentPage: number;
  totalPage: number;
  limit: number;
};

// status type
export type Status = "menunggu" | "revisi" | "disetujui";

// jenis riwayat
export type JenisRiwayat = "dokumen_borang" | "pic";

// update status
export interface UpdateStatusType {
  status: Status;
  keterangan: string;
  jenisRiwayat: JenisRiwayat;
  flagRevisi?: FlagRevisi[];
}

// flag revisi
export type FlagRevisi = "dokumen_borang" | "pic" | "kebutuhan_dokumen";

export const FLAG_REVISI_VALUES = [
  "dokumen_borang",
  "pic",
  "kebutuhan_dokumen",
] as const;

// type notifikasi
export type TypeNotifikasi =
  | "KRITERIA_DITAMBAH"
  | "KRITERIA_DIEDIT"
  | "KRITERIA_DIHAPUS"
  | "PIC_BARU_PERLU_VERIFIKASI"
  | "PIC_DIREVISI_KAPRODI"
  | "PIC_DISETUJUI_WD1"
  | "PIC_DIREVISI_WD1";

export interface ModalUpdateStatusHandle {
  handleCloseModal: () => void;
}
