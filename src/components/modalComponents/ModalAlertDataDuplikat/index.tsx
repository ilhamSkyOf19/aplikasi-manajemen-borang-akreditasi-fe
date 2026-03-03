import { AlertCircle } from "lucide-react";
import { type FC, type RefObject } from "react";
import ButtonCancelText from "../../buttonComponents/ButtonCancelText";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
};
const ModalAlertDataDuplikat: FC<Props> = ({ handleCloseModal, modalRef }) => {
  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={() => handleCloseModal()}
    >
      <div className="modal-box w-[80vw] lg:w-90">
        {/* icon alert */}
        <div className="w-full flex justify-center mb-4">
          <AlertCircle className="size-20 text-error" />
        </div>
        <h3 className="font-bold text-base lg:text-lg text-center mb-4">
          Data sudah tersedia di sistem dan tidak dapat dibuat ulang.
        </h3>

        {/* content */}
        <p className="text-sm lg:text-sm text-center">
          Silakan periksa kembali daftar data yang telah dibuat atau lakukan
          pembaruan pada data yang sudah tersedia.
        </p>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-4">
          {/* button close */}
          <ButtonCancelText handleCancel={handleCloseModal} />
        </div>
      </div>
    </dialog>
  );
};

export default ModalAlertDataDuplikat;
