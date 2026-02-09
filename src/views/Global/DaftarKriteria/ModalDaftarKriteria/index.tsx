import { type FC, type RefObject } from "react";
import { Link } from "react-router-dom";
type Props = {
  isShowModal: {
    data: {
      id: number;
      namaKriteria: string;
      tanggalBuat: string;
      tanggalUbah: string;
      status: string;
    };
    active: boolean;
  };
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
};
const ModalDaftarKriteria: FC<Props> = ({
  handleCloseModal,
  isShowModal,
  modalRef,
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
          <h3 className="font-bold text-base lg:text-lg">Data Kriteria</h3>

          <div className="w-full flex flex-col justify-start items-stary mt-4 gap-3">
            <FieldDataModal
              typeData="Nama Kriteria"
              value={isShowModal.data.namaKriteria}
            />
            <FieldDataModal
              typeData="Tanggal Buat"
              value={isShowModal.data.tanggalBuat}
            />
            <FieldDataModal
              typeData="Tanggal Ubah"
              value={isShowModal.data.tanggalUbah}
            />
            <FieldDataModal typeData="Status" value={isShowModal.data.status} />
          </div>

          <div className="w-full flex flex-row justify-end items-end gap-2 mt-2">
            {/* button close */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => handleCloseModal()}>
                  <span className="text-xs lg:text-sm">Close</span>
                </button>
              </form>
            </div>

            {/* button update */}
            <Link
              to={`/dashboard/daftar-kriteria/update-kriteria/${isShowModal.data.id}`}
              type="button"
              className="btn btn-info"
            >
              <span className="text-xs lg:text-sm text-primary-white">
                Update
              </span>
            </Link>

            {/* button delete */}
            <button type="button" className="btn btn-error">
              <span className="text-xs lg:text-sm text-primary-white">
                Delete
              </span>
            </button>
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

export default ModalDaftarKriteria;
