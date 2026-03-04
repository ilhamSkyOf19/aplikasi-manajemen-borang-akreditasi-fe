import { type FC, type RefObject } from "react";
import { cn } from "../../../utils/cn";
import type { ITimAkreditasi } from "../../../models/timAkreditasi.model";
import { Link } from "react-router-dom";
import ButtonCloseText from "../../buttonComponents/ButtonCloseText";
type Props = {
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  customClassName?: string;
  datas: Omit<ITimAkreditasi, "user">[];
  nama: string;
};
const ModalDaftarTim: FC<Props> = ({
  handleCloseModal,
  modalRef,
  customClassName,
  nama,
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
        <div className="w-full pb-2 border-b border-primary-black">
          <h3 className="font-semibold text-base lg:text-lg">Daftar Tim</h3>
        </div>

        <div className="flex flex-col justify-start items-start mt-4">
          <h3 className="text-sm font-semibold">
            Daftar tim akreditasi - {nama}
          </h3>

          {datas.length > 0 ? (
            <div className="ml-6 w-full flex flex-col justify-start items-start pt-0.5">
              <ol className="list-decimal pl-2 flex flex-col gap-2 lg:marker:text-sm mt-2">
                {datas.map((item, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-6 ml-1">
                      <span className="text-sm">
                        {item.namaTimAkreditasi}{" "}
                        {true && (
                          <>
                            <span className="text-sm font-semibold mx-2">
                              -
                            </span>
                            <Link
                              to={`/dashboard/kelola-tim-akreditasi?search=${item.namaTimAkreditasi}`}
                              className="text-sm text-primary-purple hover:underline"
                            >
                              Kelola
                            </Link>
                          </>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="w-full flex flex-row justify-center items-center mt-4">
              <span className="text-sm">Belum ada tim akreditasi</span>
            </div>
          )}
        </div>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-6">
          {/* button close */}
          <ButtonCloseText handleClose={() => handleCloseModal()} />
        </div>
      </div>
    </dialog>
  );
};

export default ModalDaftarTim;
