import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UpdateStatusType } from "../../../types/constanst.type";
import { StatusValidation } from "../../../validations/status.validation";
import { useEffect } from "react";

const useModalStatusDisetujui = () => {
  // use form
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UpdateStatusType>({
    resolver: zodResolver(StatusValidation.UPDATE_STATUS),
  });

  //   reset
  useEffect(() => {
    reset({
      keterangan: "pengajuan telah disetujui",
      status: "disetujui",
    });
  }, []);
  return { register, errors, handleSubmit };
};

export default useModalStatusDisetujui;
