import { Fragment, type FC, type RefObject } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";

type Props = {
  isShowModal: {
    id: number;
    label: { key: string; label: string; list?: boolean }[];
    data: Record<string, any>;
    active: boolean;
  };
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleShowModalDelete: (id: number) => void;
  linkUpdate: string;
  title: string;
  disableDelete?: boolean;
  customClassName?: string;
};
const ModalDataDetail: FC<Props> = ({
  handleCloseModal,
  isShowModal,
  modalRef,
  handleShowModalDelete,
  linkUpdate,
  title,
  disableDelete,
  customClassName,
}) => {
  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={() => handleCloseModal()}
    >
      <div className={cn("modal-box", customClassName)}>
        <h3 className="font-bold text-base lg:text-lg">{title}</h3>

        <div className="w-full flex flex-col justify-start items-stary mt-4 gap-3">
          {/* field data modal */}

          {isShowModal.label.map((item, index) => (
            <Fragment key={index}>
              {item.list ? (
                <FieldDataModalList
                  typeData={item.label}
                  values={isShowModal.data[item.key]}
                />
              ) : (
                <FieldDataModal
                  typeData={item.label}
                  value={isShowModal.data[item.key]}
                />
              )}
            </Fragment>
          ))}
        </div>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-6">
          {/* button close */}
          <button className="btn btn-sm" onClick={() => handleCloseModal()}>
            tutup
          </button>

          {/* button update */}
          <Link to={linkUpdate} type="button" className="btn btn-info btn-sm">
            ubah
          </Link>

          {/* button delete */}
          {disableDelete !== true && (
            <button
              type="button"
              className="btn btn-error btn-sm"
              onClick={() => handleShowModalDelete(isShowModal.id)}
            >
              hapus
            </button>
          )}
        </div>
      </div>
    </dialog>
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

// field data modal list
type FieldDataModalListProps = {
  typeData: string;
  values: string[];
};
const FieldDataModalList: FC<FieldDataModalListProps> = ({
  typeData,
  values,
}) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <div className="flex-3">
        <ol className="list-decimal pl-5 flex flex-col gap-2 marker:text-xs">
          {values.length > 0 ? (
            values.map((item, index) => (
              <li key={index}>
                <div className="flex items-center gap-6 ml-1">
                  <span className="text-xs">{item}</span>
                </div>
              </li>
            ))
          ) : (
            <span className="text-sm">-</span>
          )}
        </ol>
      </div>
    </div>
  );
};

export default ModalDataDetail;
