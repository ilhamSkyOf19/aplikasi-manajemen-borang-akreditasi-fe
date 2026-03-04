import { AlertCircle } from "lucide-react";
import { type FC, type RefObject } from "react";
import ButtonDeleteTextWithLoading from "../../buttonComponents/ButtonDeleteTextWithLoading";
import ButtonCancelText from "../../buttonComponents/ButtonCancelText";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleDelete: () => void;
  isLoadingDelete?: boolean;
  bigTitle?: string;
  listData?: string[];
  normalMessage?: string;
};
const ModalDelete: FC<Props> = ({
  handleCloseModal,
  modalRef,
  handleDelete,
  isLoadingDelete,
  bigTitle,
  listData,
  normalMessage,
}) => {
  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={() => handleCloseModal()}
    >
      <div className="modal-box w-[80vw] lg:w-110">
        {/* icon alert */}
        <div className="w-full flex justify-center mb-4">
          <AlertCircle className="size-20 text-error" />
        </div>
        <h3 className="font-bold text-base lg:text-lg text-center mb-4">
          {bigTitle || "Apakah anda yakin ingin menghapus data ini?"}
        </h3>

        {/* content */}
        {normalMessage && (
          <p className="text-sm lg:text-sm text-center">
            Data yang telah dihapus tidak dapat dikembalikan
          </p>
        )}

        {listData && (
          <div className="w-ful flex flex-col justify-start items-start">
            <span className="text-sm font-medium">
              Data ini memiliki keterkaitan dengan:
            </span>

            <ul className="list-disc pl-5 mt-2 mb-5">
              {listData.map((item, index) => (
                <li key={index} className="text-sm font-semibold">
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-sm text-error font-medium">
                Peringatan :
              </span>
              <span className="text-sm">
                Jika data ini dihapus, seluruh data yang terkait juga akan ikut
                terhapus dan tidak dapat dipulihkan kembali.
              </span>
            </div>
          </div>
        )}

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-8">
          {/* button close */}
          <ButtonCancelText handleCancel={handleCloseModal} />

          {/* button delete */}
          <ButtonDeleteTextWithLoading
            handleDelete={handleDelete}
            isLoading={isLoadingDelete}
          />
        </div>
      </div>
    </dialog>
  );
};

export default ModalDelete;
