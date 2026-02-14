import { type FC, type RefObject } from "react";
import { cn } from "../../../utils/cn";
import { CornerDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { PayloadUserType } from "../../../models/user.model";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  customClassName?: string;
  datas: PayloadUserType[];
  namaTim: string;
};
const ModalDaftarAnggota: FC<Props> = ({
  handleCloseModal,
  modalRef,
  customClassName,
  namaTim,
  datas,
}) => {
  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={() => handleCloseModal()}
    >
      <div className={cn("modal-box w-[80vw] lg:w-xl", customClassName)}>
        {/* icon alert */}
        <h3 className="font-bold text-base lg:text-lg">
          Daftar Anggota - {namaTim}
        </h3>

        {datas.length > 0 ? (
          <div className="w-full flex flex-row justify-start items-start gap-2 mt-2 pl-4">
            {/* arrow corner down */}
            <div className="flex-1">
              <CornerDownRight />
            </div>

            <div className="flex-12 w-full flex flex-col justify-start items-start pt-0.5">
              <ol className="w-full">
                {datas.map((item, index) => (
                  <div className="w-full  flex flex-row justify-between items-center pb-2 border-b border-primary-black/30">
                    {/* nama */}
                    <div className="flex flex-row justify-start items-start gap-2">
                      {/* number */}
                      <span className="text-sm">{index + 1}.</span>

                      {/* nama */}
                      <span className="text-sm">{item.nama}</span>
                    </div>

                    {/* aksi */}
                    <Link
                      to={`/dashboard/kelola-user?search=${item.email}`}
                      className="text-sm text-primary-purple hover:underline"
                    >
                      Lihat
                    </Link>
                  </div>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-row justify-center items-center mt-4">
            <span className="text-sm">Belum ada anggota</span>
          </div>
        )}

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-4">
          {/* button close */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => handleCloseModal()}>
                <span className="text-xs lg:text-sm">Tutup</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalDaftarAnggota;
