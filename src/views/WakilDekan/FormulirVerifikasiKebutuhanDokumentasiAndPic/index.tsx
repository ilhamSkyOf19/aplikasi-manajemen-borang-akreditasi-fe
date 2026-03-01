import { type FC } from "react";
import useFormulirVerifikasiKebutuhanDokumentasiAndPic from "./useFormulirVerifikasiKebutuhanDokumentasiAndPic";
import BreadCrumbs from "../../../components/BreadCrumbs";
import TitlePage from "../../../components/TitlePage";

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
        <div className="card w-full flex flex-col justify-start items-start lg:w-1/2 bg-white p-5 lg:p-8 lg:rounded-md lg:shadow-sm">
          {/* title page */}
          <TitlePage
            bigTitle={"Formulir Revisi Kebutuhan Dokumentasi dan PIC"}
            smallTitle={`Halaman untuk melakukan verifikasi kebutuhan dokumentasi dan PIC.`}
          />
        </div>
      </div>
    </div>
  );
};

export default FormulirVerfikasiKebutuhanDokumentasiAndPic;
