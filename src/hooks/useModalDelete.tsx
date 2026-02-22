import { useRef, useState } from "react";

const useModalDelete = () => {
  // state id delete
  const [idDelete, setIdDelete] = useState<number>(0);

  // modal ref
  const modalDeleteRef = useRef<HTMLDialogElement | null>(null);

  // handle modal delete show
  const handleShowModalDelete = (id: number) => {
    // set id delete
    setIdDelete(id);

    // show modal
    if (modalDeleteRef.current) {
      modalDeleteRef.current.showModal();
    }
  };

  // handle modal delete close
  const handleCloseModalDelete = () => {
    if (modalDeleteRef.current) {
      modalDeleteRef.current.close();

      // set state id
      setIdDelete(0);
    }
  };

  return {
    idDelete,
    modalDeleteRef,
    handleShowModalDelete,
    handleCloseModalDelete,
  };
};

export default useModalDelete;
