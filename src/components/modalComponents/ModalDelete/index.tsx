import { AlertCircle } from "lucide-react";
import { type FC, type RefObject } from "react";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleDelete: () => void;
  isLoadingDelete?: boolean;
};
const ModalDelete: FC<Props> = ({
  handleCloseModal,
  modalRef,
  handleDelete,
  isLoadingDelete,
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
          Apakah anda yakin ingin menghapus data ini?
        </h3>

        {/* content */}
        <p className="text-sm lg:text-sm text-center">
          Data yang telah dihapus tidak dapat dikembalikan
        </p>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-4">
          {/* button close */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => handleCloseModal()}>
                <span className="text-xs lg:text-sm">Cancel</span>
              </button>
            </form>
          </div>

          {/* button delete */}
          <button
            disabled={isLoadingDelete}
            type="button"
            className="btn btn-error"
            onClick={() => {
              handleDelete();
            }}
          >
            {isLoadingDelete ? (
              <span className="loading loading-spinner text-primary-white"></span>
            ) : (
              <span className="text-white text-sm font-medium">Hapus</span>
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalDelete;
