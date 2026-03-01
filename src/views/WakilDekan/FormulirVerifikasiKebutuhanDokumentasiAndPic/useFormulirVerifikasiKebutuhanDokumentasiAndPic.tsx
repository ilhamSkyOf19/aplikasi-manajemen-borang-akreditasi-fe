import { useLocation, useParams } from "react-router-dom";

const useFormulirVerifikasiKebutuhanDokumentasiAndPic = () => {
  // get id from params
  const { id } = useParams() as { id: string };

  // pathname
  const pathname = useLocation().pathname.split("/").slice(0, -1).join("/");
  return { pathname, id };
};

export default useFormulirVerifikasiKebutuhanDokumentasiAndPic;
