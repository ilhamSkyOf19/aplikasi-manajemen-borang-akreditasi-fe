import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";

type ModalState<T> = {
  data: T | null;
  active: boolean;
};

export const useHandleModalDataDetail = <T extends { id: number }>({
  dataList,
  setIsShowModal,
}: {
  setIsShowModal: Dispatch<SetStateAction<ModalState<T>>>;
  dataList: T[] | undefined;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleShowModalDetail = useCallback(
    (id: number) => {
      if (!dataList?.length) return;

      const findData = dataList.find((item) => item.id === id);
      if (!findData) return;

      setIsShowModal({
        data: findData,
        active: true,
      });

      modalRef.current?.showModal();
    },
    [dataList, setIsShowModal],
  );

  const handleCloseModalDetail = useCallback(() => {
    modalRef.current?.close();

    setTimeout(() => {
      setIsShowModal({
        data: null,
        active: false,
      });
    }, 200);
  }, [setIsShowModal]);

  return {
    modalRef,
    handleShowModalDetail,
    handleCloseModalDetail,
  };
};
