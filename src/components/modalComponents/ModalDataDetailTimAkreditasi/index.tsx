import { useRef, type FC, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../utils/cn";
import type { ResponseTimAkreditasiType } from "../../../models/timAkreditasi.model";
import { formatTanggalPanjang } from "../../../utils/formatDate";
import type { PayloadUserType } from "../../../models/user.model";
import ModalDaftarAnggota from "../ModalDaftarAnggota";
import ButtonDeleteTextNonLoading from "../../buttonComponents/ButtonDeleteTextNonLoading";
import ButtonUpdateText from "../../buttonComponents/ButtonUpdateText";
import ButtonCloseText from "../../buttonComponents/ButtonCloseText";

type Props = {
  datas: ResponseTimAkreditasiType | null;
  modalRef: RefObject<HTMLDialogElement | null>;
  handleCloseModal: () => void;
  handleShowModalDelete: (id: number) => void;
  title: string;
  disableDelete?: boolean;
  customClassName?: string;
  limit: number;
};
const ModalDataDetailTimAkreditasi: FC<Props> = ({
  handleCloseModal,
  modalRef,
  handleShowModalDelete,
  title,
  disableDelete,
  customClassName,
  datas,
  limit,
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

          {datas?.user && datas.user.length > limit ? (
            <FieldAction
              typeData={"Tanggal Dibuat"}
              placeholder="lihat selengkapnya"
              action={() => handleShowModalDaftarAnggota()}
            />
          ) : (
            <FieldDataModalList
              typeData={"Daftar Tim"}
              values={datas?.user || []}
              action={handleRedirectToDataUser}
            />
          )}
        </div>

        <div className="w-full flex flex-row justify-end items-end gap-2 mt-8">
          {/* button close */}
          <ButtonCloseText handleClose={handleCloseModal} />

          {/* button update */}
          <ButtonUpdateText
            link={`/dashboard/kelola-tim-akreditasi/ubah-tim-akreditasi/${datas?.id}`}
          />

          {/* button delete */}
          {disableDelete !== true && (
            <ButtonDeleteTextNonLoading
              handleDelete={() => handleShowModalDelete(datas?.id || 0)}
            />
          )}
        </div>
      </div>

      {/* modal daftar anggota */}
      <ModalDaftarAnggota
        label="Daftar Anggota"
        datas={datas?.user || []}
        modalRef={modalRefDaftarAnggota}
        handleCloseModal={handleCloseModalDaftarAnggota}
        title={datas?.namaTimAkreditasi || ""}
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
      <div className="flex-3">
        <ol className="list-decimal pl-5 flex flex-col gap-2 marker:text-xs">
          {values.map((item, index) => (
            <li key={index}>
              <div className="flex items-center gap-1 ml-1">
                <span className="text-xs">
                  {item.nama}{" "}
                  <span className="text-xs font-semibold mx-0.5">-</span>
                  <button
                    type="button"
                    onClick={() => action(item.email)}
                    className="text-xs text-primary-purple"
                  >
                    lihat
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
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
