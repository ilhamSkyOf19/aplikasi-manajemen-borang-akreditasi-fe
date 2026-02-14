import { type FC } from "react";
import ButtonAdd from "../buttonComponents/ButtonAdd";

type Props = {
  bigTitle: string;
  smallTitle: string;
  labelAdd?: string;
  linkAdd?: string;
};
const TitlePage: FC<Props> = ({ bigTitle, smallTitle, labelAdd, linkAdd }) => {
  return (
    <div className="w-full flex flex-row justify-between items-start">
      <div className="flex-4 lg:flex-none flex flex-col justify-start items-start">
        {/* title */}
        <h2 className="text-lg font-medium lg:text-xl">{bigTitle}</h2>

        {/* deskripsi */}
        <p className="text-xs text-primary-black/80 lg:text-sm">{smallTitle}</p>
      </div>

      {/* btn */}
      <div className="flex-1 lg:flex-none flex flex-row justify-end items-center">
        {linkAdd && <ButtonAdd link={linkAdd} label={labelAdd} />}
      </div>
    </div>
  );
};

export default TitlePage;
