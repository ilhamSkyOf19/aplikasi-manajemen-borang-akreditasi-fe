import { useRef, type FC, type RefObject } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../../utils/cn";
import type { ResponseTimAkreditasiType } from "../../../models/timAkreditasi.model";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import type { PayloadUserType } from "../../../models/user.model";
import ModalDaftarAnggota from "../ModalDaftarAnggota";

type Props = {
  datas: ResponseTimAkreditasiType | null;
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleShowModalDelete: (id: number) => void;
  title: string;
  disableDelete?: boolean;
  customClassName?: string;
};
const ModalDataDetailTimAkreditasi: FC<Props> = ({
  handleCloseModal,
  modalRef,
  handleShowModalDelete,
  title,
  disableDelete,
  customClassName,
  datas,
}) => {
  // ref modal daftar anggota
  const modalRefDaftarAnggota = useRef<HTMLDialogElement | null>(null);

  // handle show modal daftar anggota
  const handleShowModalDaftarAnggota = () => {
    if (modalRefDaftarAnggota.current) {
      modalRefDaftarAnggota.current.showModal();
    }
  };

  // handle close modal daftar anggota
  const handleCloseModalDaftarAnggota = () => {
    if (modalRefDaftarAnggota.current) {
      modalRefDaftarAnggota.current.close();
    }
  };

  // navigate
  const navigate = useNavigate();

  // handle redirect to data user
  const handleRedirectToDataUser = (email: string) => {
    navigate(`/dashboard/kelola-user?search=${email}`);
  };

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
          {/* field nama tim */}
          <FieldDataModal
            typeData={"Nama Tim"}
            value={datas?.namaTimAkreditasi || ""}
          />
          {/* field tanggal di buat */}
          <FieldDataModal
            typeData={"Tanggal Dibuat"}
            value={formatTanggalPanjang(datas?.createdAt || "")}
          />

          {datas?.user && datas.user.length > 10 ? (
            <FieldAction
              typeData={"Tanggal Dibuat"}
              placeholder="lihat selengkapnya"
              action={() => handleShowModalDaftarAnggota()}
            />
          ) : (
            <FieldDataModalList
              typeData={"Tanggal Dibuat"}
              values={datas?.user || []}
              action={handleRedirectToDataUser}
            />
          )}
        </div>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-8">
          {/* button close */}
          <button className="btn" onClick={() => handleCloseModal()}>
            <span className="text-xs lg:text-sm">Close</span>
          </button>

          {/* button update */}
          <Link
            to={`/dashboard/kelola-tim-akreditasi/ubah-tim-akreditasi/${datas?.id}`}
            type="button"
            className="btn btn-info"
          >
            <span className="text-xs lg:text-sm text-primary-white">Ubah</span>
          </Link>

          {/* button delete */}
          {disableDelete !== true && (
            <button
              type="button"
              className="btn btn-error"
              onClick={() => handleShowModalDelete(datas?.id || 0)}
            >
              <span className="text-xs lg:text-sm text-primary-white">
                Hapus
              </span>
            </button>
          )}
        </div>
      </div>

      {/* modal daftar anggota */}
      <ModalDaftarAnggota
        datas={datas?.user || []}
        modalRef={modalRefDaftarAnggota}
        handleCloseModal={handleCloseModalDaftarAnggota}
        namaTim={datas?.namaTimAkreditasi || ""}
      />
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
  values: PayloadUserType[];
  action: (email: string) => void;
};
const FieldDataModalList: FC<FieldDataModalListProps> = ({
  typeData,
  values,
  action,
}) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <ol className="flex-3 flex flex-col justify-start items-start gap-1.5">
        {values.length > 0 ? (
          values.map((item, index) => (
            <li
              key={index}
              className="w-full flex flex-row justify-start items-start gap-1"
            >
              <div className="flex-6 flex flex-row justify-start items-start gap-1">
                {/* number */}
                <span className="text-xs lg:text-sm w-3">{index + 1}.</span>

                {/* label */}
                <span className="text-xs lg:text-sm">{item.nama}</span>
              </div>

              {/* action list */}
              <div className="flex-1 flex flex-row justify-end items-start">
                <button
                  type="button"
                  onClick={() => action(item.email)}
                  className="text-xs text-primary-purple"
                >
                  lihat
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="flex flex-row justify-start items-start gap-1">
            <span className="text-xs lg:text-sm">-</span>
          </li>
        )}
      </ol>
    </div>
  );
};

// field action
type FieldActionProps = {
  placeholder: string;
  action: () => void;
  typeData: string;
};
const FieldAction: FC<FieldActionProps> = ({
  action,
  placeholder,
  typeData,
}) => {
  return (
    <div className="w-full flex flex-row justify-start items-start">
      {/* type */}
      <span className="text-xs flex-2 lg:text-sm">{typeData}</span>
      <span className="mx-1.5 text-xs lg:text-sm">:</span>
      <div className="flex-3 flex flex-row justify-start items-start">
        <button
          type="button"
          onClick={action}
          className="text-xs text-primary-purple"
        >
          {placeholder}
        </button>
      </div>
    </div>
  );
};

export default ModalDataDetailTimAkreditasi;
