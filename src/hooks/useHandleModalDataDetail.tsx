import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";

type ModalState<T> = {
  data: T | null;
  active: boolean;
};

export const useHandleModalDataDetail = <T extends { id: number }>(params: {
  setIsShowModal: Dispatch<SetStateAction<ModalState<T>>>;
  dataList: T[] | undefined;
}) => {
  const { dataList, setIsShowModal } = params;

  //   modal ref
  const modalRef = useRef<HTMLDialogElement>(null);

  // show modal
  const handleShowModalDetail = useCallback(
    (id: number) => {
      if (!dataList?.length) return;

      //   find data
      const findData = dataList.find((item) => item.id === id);

      //   check find data
      if (!findData) return;

      setIsShowModal({
        data: findData,
        active: true,
      });

      modalRef?.current?.showModal();
    },
    [dataList, setIsShowModal],
  );

  // close modal
  const handleCloseModalDetail = useCallback(
    (defaultData?: null) => {
      // tutup dialog
      modalRef.current?.close();

      // langsung reset state
      const timer = setTimeout(() => {
        setIsShowModal({
          data: defaultData || null,
          active: false,
        });
      }, 200);

      return () => clearTimeout(timer);
    },
    [modalRef, setIsShowModal],
  );

  return {
    modalRef,
    handleShowModalDetail,
    handleCloseModalDetail,
  };
};
