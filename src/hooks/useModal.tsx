import { useRef, useState } from "react";

const useModal = () => {
  // state
  const [idModal, setIdModal] = useState<number>(0);
  // ref
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // handle show modal
  const handleShowModal = (id?: number) => {
    if (modalRef.current) {
      setIdModal(id || 0);
      modalRef.current.showModal();
    }
  };

  // close modal
  const handleCloseModal = () => {
    if (modalRef.current) {
      setIdModal(0);
      modalRef.current.close();
    }
  };

  return { modalRef, handleCloseModal, handleShowModal, idModal };
};

export default useModal;
