import { type FC, type RefObject } from "react";
import type { UpdateStatusType } from "../../../types/constanst.type";
import useModalStatusDisetujui from "./useModalStatusDisetujui";
import { cn } from "../../../utils/cn";
import InputFieldNonIconTextArea from "../../inputComponents/InputFieldNonIconTextArea";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleAksi: (data: UpdateStatusType) => void;
  isLoading?: boolean;
};
const ModalStatusDiSetujui: FC<Props> = ({
  handleCloseModal,
  modalRef,
  handleAksi,
  isLoading,
}) => {
  // use function
  const { errors, register, handleSubmit } = useModalStatusDisetujui();

  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={() => handleCloseModal()}
    >
      <div className="modal-box w-[90vw] lg:w-lg">
        {/* title */}
        <div className="w-full pb-2 border-b border-primary-black/50">
          <h2 className="text-base font-semibold">Setujui Pengajuan</h2>
        </div>

        <form
          onSubmit={handleSubmit(handleAksi)}
          className="w-full flex flex-col justify-start items-start mt-4 gap-4"
        >
          {/* input choose status */}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            {/* label */}
            <p className="text-sm font-medium">Status</p>

            {/* status */}
            <p className="ml-6 px-3 py-0.5 bg-success rounded-full text-xs">
              disetujui
            </p>
          </div>

          {/* keterangan */}
          <InputFieldNonIconTextArea
            register={register("keterangan")}
            label="Keterangan"
            max={1000}
            name="keterangan"
            placeholder="Masukan keterangan"
            rows={6}
            defaultValue="Pengajuan telah disetujui"
            errorMessage={errors.keterangan?.message}
            required
          />

          <div className="w-full flex flex-row justify-end items-end gap-2">
            {/* button close */}
            <div className="modal-action">
              <button className="btn btn-sm" onClick={() => handleCloseModal()}>
                Batal
              </button>
            </div>

            {/* button kirim */}
            <button
              disabled={isLoading}
              type="submit"
              className={cn(
                "btn btn-success btn-sm",
                isLoading && "bg-success",
              )}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xs text-primary-white"></span>
              ) : (
                "Kirim"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalStatusDiSetujui;
