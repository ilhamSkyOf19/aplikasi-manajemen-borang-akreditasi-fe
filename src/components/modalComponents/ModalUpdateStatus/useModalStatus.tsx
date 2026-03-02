import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import type {
  JenisRiwayat,
  ModalUpdateStatusHandle,
  UpdateStatusType,
} from "../../../types/constanst.type";
import { StatusValidation } from "../../../validations/status.validation";
import { useEffect, useImperativeHandle, type Ref } from "react";

const useModalUpdateStatus = (params: {
  jenisRiwayat: JenisRiwayat;
  handleCloseModal: () => void;
  ref: Ref<ModalUpdateStatusHandle>;
}) => {
  const { jenisRiwayat } = params;
  // use form
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
  } = useForm<UpdateStatusType>({
    resolver: zodResolver(StatusValidation.UPDATE_STATUS),
  });

  // status controller
  const statusController = useController({
    control,
    name: "status",
  });

  //   reset
  useEffect(() => {
    reset({
      jenisRiwayat: jenisRiwayat === "pic" ? "pic" : "dokumen_borang",
    });
  }, [jenisRiwayat]);

  // handle close modal
  const handleCloseModalResetInput = () => {
    if (params.handleCloseModal) {
      params.handleCloseModal();
    }

    // set timeout
    setTimeout(() => {
      // reset
      reset();
    }, 500);
  };

  useImperativeHandle(params.ref, () => ({
    handleCloseModal: handleCloseModalResetInput,
  }));

  return {
    register,
    errors,
    handleSubmit,
    statusController,
    handleCloseModalResetInput,
  };
};

export default useModalUpdateStatus;
