import { AlertCircle } from "lucide-react";
import { type FC, type RefObject } from "react";
import ButtonCancelText from "../../buttonComponents/ButtonCancelText";
import ButtonNext from "../../buttonComponents/ButtonNext";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleConfirm?: () => void;
  bigTitle: string;
  smallTitle: string;
};
const ModalAlert: FC<Props> = ({
  handleCloseModal,
  modalRef,
  bigTitle,
  smallTitle,
  handleConfirm,
}) => {
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
          {bigTitle}
        </h3>

        {/* content */}
        <p className="text-sm lg:text-sm text-center">{smallTitle}</p>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-8">
          {/* button close */}
          <ButtonCancelText handleCancel={handleCloseModal} />

          {handleConfirm && <ButtonNext handleNext={handleConfirm} />}
        </div>
      </div>
    </dialog>
  );
};

export default ModalAlert;
