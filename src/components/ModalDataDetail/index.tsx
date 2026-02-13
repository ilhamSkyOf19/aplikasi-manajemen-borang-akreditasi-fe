import { type FC, type RefObject } from "react";
import { Link } from "react-router-dom";

type Props = {
  isShowModal: {
    id: number;
    label: { key: string; label: string }[];
    data: Record<string, any>;
    active: boolean;
  };
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleShowModalDelete: (id: number) => void;
  linkUpdate: string;
  title: string;
  disableDelete?: boolean;
};
const ModalDataDetail: FC<Props> = ({
  handleCloseModal,
  isShowModal,
  modalRef,
  handleShowModalDelete,
  linkUpdate,
  title,
  disableDelete,
}) => {
  return (
    <>
      <dialog
        ref={modalRef}
        id="my_modal_1"
        className="modal"
        onCancel={() => handleCloseModal()}
      >
        <div className="modal-box">
          <h3 className="font-bold text-base lg:text-lg">{title}</h3>

          <div className="w-full flex flex-col justify-start items-stary mt-4 gap-3">
            {/* field data modal */}

            {isShowModal.label.map((item, index) => (
              <FieldDataModal
                key={index}
                typeData={item.label}
                value={isShowModal.data[item.key]}
              />
            ))}
          </div>

          <div className="w-full flex flex-row justify-end items-end gap-2 mt-6">
            {/* button close */}
            <button className="btn" onClick={() => handleCloseModal()}>
              <span className="text-xs lg:text-sm">Close</span>
            </button>

            {/* button update */}
            <Link to={linkUpdate} type="button" className="btn btn-info">
              <span className="text-xs lg:text-sm text-primary-white">
                Ubah
              </span>
            </Link>

            {/* button delete */}
            {disableDelete !== true && (
              <button
                type="button"
                className="btn btn-error"
                onClick={() => handleShowModalDelete(isShowModal.id)}
              >
                <span className="text-xs lg:text-sm text-primary-white">
                  Hapus
                </span>
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

// field data modal
type FieldDataModalProps = {
  typeData: string;
  value: string;
};
const FieldDataModal: FC<FieldDataModalProps> = ({ typeData, value }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <span className="text-xs flex-3 lg:text-sm">{value}</span>
    </div>
  );
};

export default ModalDataDetail;
