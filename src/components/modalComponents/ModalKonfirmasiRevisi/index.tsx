import { AlertCircle } from "lucide-react";
import { type FC, type RefObject } from "react";
import ButtonCancelText from "../../buttonComponents/ButtonCancelText";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleKonfirmasi: (data: boolean) => void;
  isPending?: boolean;
  type: "disetujui" | "revisi";
};
const ModalKonfirmasiRevisi: FC<Props> = ({
  handleCloseModal,
  modalRef,
  handleKonfirmasi,
  isPending,
  type,
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
          Apakah anda yakin ingin merevisi data ini?
        </h3>

        {/* content */}
        <p className="text-sm lg:text-sm text-center">
          {type === "revisi"
            ? "Data revisi terbaru sebelumnya akan dihapus dan diganti dengan data yang baru"
            : "Data disetujui sebelumnya akan dihapus dan diganti dengan data revisi"}
        </p>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-4">
          {/* button close */}
          <ButtonCancelText handleCancel={handleCloseModal} />

          {/* button delete */}
          <button
            disabled={isPending}
            type="button"
            className="btn btn-success bg-success btn-sm lg:btn-md"
            onClick={() => handleKonfirmasi(true)}
          >
            {isPending ? (
              <span className="loading loading-spinner text-primary-white loading-xs"></span>
            ) : (
              <span className="text-white font-medium">Lanjutkan</span>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalKonfirmasiRevisi;
