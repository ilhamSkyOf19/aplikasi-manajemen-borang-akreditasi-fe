import { type FC } from "react";
import HeaderPage from "../../layouts/HeaderPage";
import RiwayatPic from "../../views/Global/RiwayatPic";

type Props = {
  title: string;
  content: string;
  bigTitle: string;
  smallTitle: string;
  type: "pic" | "dokumen_borang" | "kebutuhan_dokumentasi";
};
const RiwayatPage: FC<Props> = ({
  content,
  title,
  bigTitle,
  smallTitle,
  type,
}) => {
  return (
    <>
      {/* header page */}
      <HeaderPage title={`Dashboard | ${title}`} content={content} />

      {type === "pic" && (
        <RiwayatPic bigTitle={bigTitle} smallTitle={smallTitle} />
      )}
    </>
  );
};

export default RiwayatPage;
