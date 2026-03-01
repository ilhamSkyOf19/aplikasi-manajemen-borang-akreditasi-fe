import { type FC } from "react";
import useFormulirVerifikasiKebutuhanDokumentasiAndPic from "./useFormulirVerifikasiKebutuhanDokumentasiAndPic";
import BreadCrumbs from "../../../components/BreadCrumbs";

const FormulirVerfikasiKebutuhanDokumentasiAndPic: FC = () => {
  // call use
  const { pathname, id } = useFormulirVerifikasiKebutuhanDokumentasiAndPic();

  return (
    <div className="w-full flex flex-col justify-between items-start pb-20 lg:pb-32">
      <div className="w-full flex flex-col justify-start items-start">
        {/* title page */}
        <BreadCrumbs
          pathname={pathname}
          link={[
            pathname.split("/").slice(0, -2).join("/"),
            `${pathname.split("/").slice(0, -1).join("/")}/${id}`,
          ]}
        />
      </div>
    </div>
  );
};

export default FormulirVerfikasiKebutuhanDokumentasiAndPic;
