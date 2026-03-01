import { type FC, type RefObject } from "react";
import { cn } from "../../../utils/cn";
import { Link } from "react-router-dom";
import type { PayloadUserType } from "../../../models/user.model";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  customClassName?: string;
  datas: PayloadUserType[];
  title: string;
  disableAksi?: boolean;
  label: string;
};
const ModalDaftarAnggota: FC<Props> = ({
  handleCloseModal,
  modalRef,
  customClassName,
  title,
  datas,
  disableAksi,
  label,
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
          <h3 className="font-semibold text-base lg:text-lg">{label}</h3>
        </div>

        {/* nama tim akreditasi */}
        <div className="flex flex-col justify-start items-start mt-4">
          <h3 className="text-sm font-semibold">Nama Tim Akreditasi</h3>

          <div className="flex flex-row justify-start items-start gap-2 ml-6 mt-2">
            <span className="text-sm">-</span>
            <span className="text-sm">{title}</span>
          </div>
        </div>

        <div className="flex flex-col justify-start items-start mt-4">
          <h3 className="text-sm font-semibold">Nama Tim Akreditasi</h3>

          <div className="flex flex-row justify-start items-start gap-2 ml-6 mt-2">
            <ol className="list-decimal pl-5 flex flex-col gap-2 lg:marker:text-sm">
              {datas.map((item, index) => (
                <li key={index}>
                  <div className="flex items-center gap-6 ml-1">
                    <span className="text-sm">
                      {item.nama}{" "}
                      {!disableAksi && (
                        <>
                          <span className="text-sm font-semibold mx-2">-</span>
                          <Link
                            to={`/dashboard/kelola-user?search=${item.email}`}
                            className="text-sm text-primary-purple hover:underline"
                          >
                            Lihat
                          </Link>
                        </>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-4 pr-2 lg:pr-0">
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
