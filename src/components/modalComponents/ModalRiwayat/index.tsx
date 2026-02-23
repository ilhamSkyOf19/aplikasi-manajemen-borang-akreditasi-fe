import { CornerDownRight } from "lucide-react";
import { type FC, type RefObject } from "react";
import { formatTanggalPanjang } from "../../../utils/formatDate";

// Props
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  id: number;
};
const ModalRiwayat: FC<Props> = ({ modalRef, handleCloseModal, id }) => {
  return (
    <dialog
      ref={modalRef}
      id="my_modal_4"
      className="modal"
      onCancel={() => handleCloseModal()}
    >
      <div className="modal-box w-[90vw] min-h-40 max-h-[70vh] lg:max-h-[70vh] lg:w-2xl lg:max-w-4xl">
        {/* title */}
        <div className="pb-2 mb-4 border-b border-primary-black">
          <h2 className="text-sm lg:text-base font-semibold">
            Riwayat - Data Alumni tahun 2025
          </h2>
        </div>
        {/* tanggal */}
        <div className="w-full flex flex-col justify-start items-start">
          <h3 className="text-sm lg:font-medium">Tanggal dibuat - {id}</h3>

          <div className="w-full flex flex-row justify-start items-center gap-2 mt-2">
            <div className="flex-1 flex flex-row justify-end items-center">
              <CornerDownRight className="size-5" />
            </div>

            <div className="flex-6 flex flex-row justify-start items-start pt-1">
              <span className="text-xs lg:text-sm">
                {formatTanggalPanjang(new Date())}
              </span>
            </div>
          </div>
        </div>
        {/* revisi */}
        <div className="w-full flex flex-col justify-start items-start mt-6">
          <h3 className="text-sm lg:font-medium">
            Daftar <span className="text-error">revisi</span>
          </h3>

          <div className="w-full flex flex-row justify-start items-start gap-2 mt-2">
            <div className="flex-1 flex flex-row justify-end items-center">
              <CornerDownRight className="size-5" />
            </div>

            <div className="flex-6 flex flex-col justify-start items-start pt-1 gap-2">
              {/* revisi */}
              <div className="w-full flex flex-row justify-start items-center gap-6 lg:gap-12 flex-wrap">
                {/* revisi */}
                <div className="flex flex-row justify-start items-start gap-2">
                  <span className="text-xs lg:text-sm font-semibold">-</span>
                  <span className="text-xs lg:text-sm">Revisi - 1</span>
                </div>

                {/* selengkapnya */}
                <button
                  type="button"
                  className="text-xs lg:text-sm text-primary-purple lg:hover:underline"
                >
                  Lihat selengkapnya
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* tanggal disetujui */}
        <div className="w-full flex flex-col justify-start items-start mt-6">
          <h3 className="text-sm lg:font-medium">
            Tanggal <span className="text-success">disetujui</span>
          </h3>

          <div className="w-full flex flex-row justify-start items-center gap-2 mt-2">
            <div className="flex-1 flex flex-row justify-end items-center">
              <CornerDownRight className="size-5" />
            </div>

            <div className="flex-6 flex flex-row justify-start items-start pt-1">
              <span className="text-xs lg:text-sm">
                {formatTanggalPanjang(new Date())}
              </span>
            </div>
          </div>
        </div>
        {/* button close */}
        <div className="w-full flex flex-row justify-end items-center">
          <button
            type="button"
            className="btn"
            onClick={() => handleCloseModal()}
          >
            tutup
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalRiwayat;
