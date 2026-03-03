import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import {
  FLAG_REVISI_VALUES,
  type FlagRevisi,
  type JenisRiwayat,
  type ModalUpdateStatusHandle,
  type UpdateStatusType,
} from "../../../types/constanst.type";
import { StatusValidation } from "../../../validations/status.validation";
import { useEffect, useImperativeHandle, useState, type Ref } from "react";

const useModalUpdateStatus = (params: {
  jenisRiwayat: JenisRiwayat;
  handleCloseModal: () => void;
  ref: Ref<ModalUpdateStatusHandle>;
}) => {
  const { jenisRiwayat } = params;

  // state flag revisi
  const [isFlagRevisi, setIsFlagRevisi] = useState<
    { flag: FlagRevisi; nama: string }[]
  >([]);

  // use form
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
    watch,
    clearErrors,
    setValue,
  } = useForm<UpdateStatusType>({
    resolver: zodResolver(StatusValidation.UPDATE_STATUS),
  });

  // status controller
  const statusController = useController({
    control,
    name: "status",
  });

  // handle choose anggota / user
  const handleChooseFlagRevisi = (flag: FlagRevisi | "semua", nama: string) => {
    // check flag
    if (flag !== "semua" && FLAG_REVISI_VALUES.includes(flag) === false) {
      return;
    }

    // check flag in state
    if (isFlagRevisi.some((item) => item.flag === flag)) {
      setIsFlagRevisi((prev) => prev.filter((item) => item.flag !== flag));
      return;
    }

    // clear error
    clearErrors("flagRevisi");

    if (flag === "semua") {
      setIsFlagRevisi([
        { flag: "pic", nama: "PIC" },
        { flag: "kebutuhan_dokumen", nama: "Kebutuhan Dokumentasi" },
      ]);
    } else {
      setIsFlagRevisi((prev) => [...prev, { flag, nama }]);
    }
  };

  console.log(isFlagRevisi);

  // handle remove
  const handleRemoveChooseFlagRevisi = () => {
    // remove flag
    setIsFlagRevisi([]);
  };

  // set value flag revisi
  useEffect(() => {
    // debounce
    const timer = setTimeout(() => {
      // result
      const result = isFlagRevisi.map((item) => item.flag as FlagRevisi);

      // set value
      setValue("flagRevisi", result);
    }, 500);

    // clear
    return () => clearTimeout(timer);
  }, [isFlagRevisi]);

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
    watch,
    isFlagRevisi,
    handleChooseFlagRevisi,
    handleRemoveChooseFlagRevisi,
  };
};

export default useModalUpdateStatus;
