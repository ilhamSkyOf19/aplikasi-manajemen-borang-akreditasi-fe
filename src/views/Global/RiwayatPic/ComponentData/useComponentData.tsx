import { useNavigate } from "react-router-dom";
import type { ResponseRiwayatType } from "../../../../models/riwayat.model";

const useComponentData = (
  dataRiwayat: ResponseRiwayatType[],
  type: "menunggu" | "revisi",
) => {
  // navigate
  const navigate = useNavigate();

  // handle redirect link
  const handleRedirectLink = (link: string, callback: string) => {
    navigate(link, { state: { callback } });
  };

  // filter data
  const filteredData = dataRiwayat.filter(
    (item) => item.status === (type === "menunggu" ? "menunggu" : "revisi"),
  );

  //  find menunggu flag kebutuhan dokumen
  const flagMenungguKebutuhanDokumentasi =
    dataRiwayat.filter(
      (item) =>
        item.status === "menunggu" &&
        item.flagRevisi?.includes("kebutuhan_dokumen"),
    ).length > 0
      ? true
      : false;

  //  find menunggu flag pic
  const flagMenungguPic =
    dataRiwayat.filter(
      (item) => item.status === "menunggu" && item.flagRevisi?.includes("pic"),
    ).length > 0
      ? true
      : false;

  // ambil revisi terbaru (index 0 karena sudah order desc)
  const latestRevisi = dataRiwayat
    .filter((item) => item.status === "revisi")
    .at(-1);

  const flagRevisiKebutuhanDokumentasi =
    latestRevisi?.flagRevisi?.some((flag) => flag === "kebutuhan_dokumen") ??
    false;

  const flagRevisiPic =
    latestRevisi?.flagRevisi?.some((flag) => flag === "pic") ?? false;

  return {
    filteredData,
    flagMenungguKebutuhanDokumentasi,
    flagMenungguPic,
    flagRevisiKebutuhanDokumentasi,
    flagRevisiPic,
    handleRedirectLink,
  };
};

export default useComponentData;
