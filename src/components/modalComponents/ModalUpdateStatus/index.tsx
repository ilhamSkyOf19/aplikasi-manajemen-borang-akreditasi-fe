import { type FC, type Ref, type RefObject } from "react";
import type {
  JenisRiwayat,
  ModalUpdateStatusHandle,
  UpdateStatusType,
} from "../../../types/constanst.type";
import { cn } from "../../../utils/cn";
import InputFieldNonIconTextArea from "../../inputComponents/InputFieldNonIconTextArea";
import useModalUpdateStatus from "./useModalStatus";
import InputFieldChoose from "../../inputComponents/InputFieldChoose";
import ButtonCancelText from "../../buttonComponents/ButtonCancelText";
import ErrorFieldInput from "../../ErrorFieldInput";
import { X } from "lucide-react";
import InputFieldChooseFlagRevisi from "../../inputComponents/InputFieldChooseFlagRevisi";

type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleAksi: (data: UpdateStatusType) => void;
  isLoading?: boolean;
  jenisRiwayat: JenisRiwayat;
  ref: Ref<ModalUpdateStatusHandle>;
};
const ModalUpdateStatus: FC<Props> = ({
  handleCloseModal,
  modalRef,
  handleAksi,
  isLoading,
  jenisRiwayat,
  ref,
}) => {
  // use function
  const {
    errors,
    register,
    handleSubmit,
    statusController,
    handleCloseModalResetInput,
    watch,
    handleChooseFlagRevisi,
    handleRemoveChooseFlagRevisi,
    isFlagRevisi,
  } = useModalUpdateStatus({
    jenisRiwayat,
    handleCloseModal,
    ref,
  });

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
          <h2 className="text-base font-semibold">Verifikasi Data</h2>
        </div>

        <form
          onSubmit={handleSubmit(handleAksi)}
          className="w-full flex flex-col justify-start items-start mt-4"
        >
          {/* jenis */}
          <div className="w-full flex flex-col justify-start items-start gap-2 mb-2">
            {/* label */}
            <p className="text-sm font-medium">Jenis Data</p>

            {/* status */}
            <p className="ml-6 text-xs lg:text-sm">
              {jenisRiwayat === "pic" ? "Kebutuhan Dokumentasi & PIC" : "-"}
            </p>
          </div>

          {/* status choose */}
          <InputFieldChoose<UpdateStatusType>
            controller={statusController}
            label="Status"
            chooseList={[
              { label: "Revisi", value: "revisi" },
              { label: "Setujui", value: "disetujui" },
            ]}
            placeholder="Pilih status"
            required
          />

          {/* check status */}
          {watch("status") === "revisi" && (
            <InputFieldChooseFlagRevisi
              handleChooseFlag={handleChooseFlagRevisi}
              isFlagRevisi={isFlagRevisi}
              errorMessage={errors.flagRevisi?.message}
              handleRemoveChooseFlag={handleRemoveChooseFlagRevisi}
            />
          )}

          {/* keterangan */}
          <InputFieldNonIconTextArea
            register={register("keterangan")}
            label="Keterangan"
            max={1000}
            name="keterangan"
            placeholder="Masukan keterangan"
            rows={6}
            errorMessage={errors.keterangan?.message}
            required
          />

          <div className="w-full flex flex-row justify-end items-end gap-2 mt-4">
            {/* button close */}
            <ButtonCancelText handleCancel={handleCloseModalResetInput} />

            {/* button kirim */}
            <button
              disabled={isLoading}
              type="submit"
              className={cn(
                "btn btn-success btn-sm lg:btn-md text-primary-white font-medium",
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

export default ModalUpdateStatus;
