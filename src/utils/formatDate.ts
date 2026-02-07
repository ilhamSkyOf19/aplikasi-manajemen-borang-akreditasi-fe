// format tanggal contoh : 11 Januari 2026
export const formatTanggalPanjang = (iso: string) => {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
