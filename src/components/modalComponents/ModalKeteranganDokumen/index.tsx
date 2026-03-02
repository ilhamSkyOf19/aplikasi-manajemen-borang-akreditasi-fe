import { type FC, type RefObject } from "react";
import { cn } from "../../../utils/cn";
import ButtonCloseText from "../../buttonComponents/ButtonCloseText";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  customClassName?: string;
  datas: {
    id: number;
    namaDokumen: string;
    keterangan: string;
    kriteriaDokumen: string;
    pendekatanDokumen: string;
  };
  //   disableAksi?: boolean;
};
const ModalKeteranganDokumen: FC<Props> = ({
  handleCloseModal,
  modalRef,
  customClassName,
  datas,
}) => {
  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={() => handleCloseModal()}
    >
      <div
        className={cn(
          "modal-box w-[92vw] max-h-[70vh] lg:w-xl",
          customClassName,
        )}
      >
        {/* icon alert */}
        <div className="w-full pb-2 border-b border-primary-black">
          <h3 className="font-semibold text-base lg:text-lg">
            Keterangan Dokumen
          </h3>
        </div>

        <FieldData typeData="Nama Dokumen" value={datas.namaDokumen} />

        <FieldData typeData="Kriteria Dokumen" value={datas.kriteriaDokumen} />

        <FieldData
          typeData="Pendekatan Dokumen"
          value={datas.pendekatanDokumen}
        />

        <FieldData typeData="Keterangan" value={datas.keterangan} />

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-4 pr-2 lg:pr-0">
          {/* button close */}
          <ButtonCloseText handleClose={handleCloseModal} />
        </div>
      </div>
    </dialog>
  );
};

// field text
type FieldDataProps = {
  typeData: string;
  value: string;
};
const FieldData: FC<FieldDataProps> = ({ typeData, value }) => {
  return (
    <div className="flex flex-col justify-start items-start mt-4">
      <h3 className="text-sm font-semibold">{typeData}</h3>

      <div className="flex flex-row justify-start items-start gap-2 ml-6 mt-2">
        <span className="text-sm">-</span>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
};

export default ModalKeteranganDokumen;
