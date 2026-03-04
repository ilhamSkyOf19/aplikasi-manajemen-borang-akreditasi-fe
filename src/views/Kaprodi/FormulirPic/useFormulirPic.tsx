import { useMutation, useQueries } from "@tanstack/react-query";
import { TimAkreditasiService } from "../../../services/timAkreditasi.service";
import { KebutuhanDokumentasiService } from "../../../services/kebutuhanDokumentasi.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PicService } from "../../../services/pic.service";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PicValidation } from "../../../validations/pic.validation";
import type { CreatePicType, UpdatePicType } from "../../../models/pic.model";
import { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { AxiosError } from "axios";

const useFormulirPic = () => {
  // use location
  const location = useLocation();

  // current pathname
  const currentPathname = location.pathname.split("/");

  let pathname: string;

  if (currentPathname.includes("detail")) {
    pathname = currentPathname.slice(0, -1).join("/");
  } else {
    pathname = currentPathname.slice(0, 4).join("/");
  }

  // state pj
  const [isPj, setIsPj] = useState<{ id: number; nama: string }[]>([]);

  //   state tim akreditasi choose
  const [isTimAkreditasiChoose, setIsTimAkreditasiChoose] = useState<{
    id: number;
    namaTimAkreditasi: string;
    anggota: { id: number; nama: string }[];
  } | null>(null);

  // modal alert duplikat
  const {
    handleCloseModal: handleCloseModalDuplikat,
    handleShowModal: handleShowModalDuplikat,
    modalRef: modalDuplikatRef,
  } = useModal();

  // navigate
  const navigate = useNavigate();
  // get id from params
  const { id } = useParams() as { id: string };

  // queries
  const data = useQueries({
    queries: [
      // data tim akreditasi & anggota
      {
        queryKey: ["formulir-pic-tim-akreditasi"],
        queryFn: () => TimAkreditasiService.readChoose({}),
        refetchOnWindowFocus: false,
      },
      // data kebutuhan dokumentasi
      {
        queryKey: ["formulir-pic-kebutuhan-dokumentasi"],
        queryFn: () => KebutuhanDokumentasiService.readChoose({}),
        refetchOnWindowFocus: false,
      },
      //   data pic
      {
        queryKey: ["formulir-pic"],
        queryFn: () => PicService.readById(+id),
        enabled: !!id,
        refetchOnWindowFocus: false,
      },
    ],
  });

  // pecah queries
  const [dataTimAkreditasiAndAnggota, dataKebutuhanDokumentasi, dataPic] = data;

  //   use form
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreatePicType | UpdatePicType>({
    resolver: zodResolver(id ? PicValidation.UPDATE : PicValidation.CREATE),
  });

  // set default value
  useEffect(() => {
    if (
      id &&
      !dataPic.isLoading &&
      dataPic?.data?.meta.statusCode === 200 &&
      dataPic?.data.data
    ) {
      reset({
        kebutuhanDokumenId: dataPic?.data?.data?.kebutuhanDokumen.id,
        timAkreditasiId: dataPic?.data?.data?.timAkreditasi.id,
        keterangan: dataPic?.data?.data?.keterangan,
        pjId: dataPic?.data?.data?.pj.map((pj) => pj.id),
      });

      // set pj
      setIsPj(dataPic?.data?.data?.pj);

      // set
      setIsTimAkreditasiChoose({
        namaTimAkreditasi: dataPic?.data?.data?.timAkreditasi.namaTimAkreditasi,
        id: dataPic?.data?.data?.timAkreditasi.id,
        anggota: dataPic?.data?.data?.pj,
      });
    }
  }, [
    id,
    dataPic?.data?.meta.statusCode,
    dataPic?.data?.data,
    dataPic.isLoading,
  ]);

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreatePicType | UpdatePicType) => {
      if (id) {
        return PicService.update(+id, data as UpdatePicType);
      } else {
        return PicService.create(data as CreatePicType);
      }
    },
    onSuccess: () => {
      if (location?.state?.callback) {
        return navigate(location?.state?.callback, {
          state: {
            status: id ? "updated" : "created",
          },
        });
      }
      // navigate
      navigate("/dashboard/kelola-pic", {
        state: {
          status: id ? "updated" : "created",
        },
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.data.meta.statusCode === 409) {
          handleShowModalDuplikat();
        }
      }
    },
  });

  // controller tim akreditasi
  const timAkreditasiController = useController({
    name: "timAkreditasiId",
    control,
  });

  //   handle set value tim akreditasi
  const handleSetTimAkreditasi = (id: number) => {
    // setvalue
    setValue("timAkreditasiId", id);

    // data choose
    const dataChoose = dataTimAkreditasiAndAnggota?.data?.data?.data?.find(
      (item) => item.id === id,
    );

    // set tim akreditasi choose
    setIsTimAkreditasiChoose(dataChoose ?? null);

    // set pj
    setIsPj([]);

    // clear errors
    clearErrors("timAkreditasiId");
  };

  //   handle remove tim akreditasi
  const handleRemoveTimAkreditasi = () => {
    setValue("timAkreditasiId", undefined);
  };

  // controller kebutuhan dokumentasi
  const kebutuhanDokumentasiController = useController({
    name: "kebutuhanDokumenId",
    control,
  });

  //   handle set value kebutuhan dokumentasi
  const handleSetKebutuhanDokumentasi = (id: number) => {
    setValue("kebutuhanDokumenId", id);

    // clear errors
    clearErrors("kebutuhanDokumenId");
  };

  //   handle remove kebutuhan dokumentasi
  const handleRemoveKebutuhanDokumentasi = () => {
    setValue("kebutuhanDokumenId", undefined);
  };

  // controller pj
  const pjController = useController({
    name: "pjId",
    control,
  });

  //   handle set pj
  const handleSetPj = (id: number) => {
    if (!isTimAkreditasiChoose) return;

    const pj = isTimAkreditasiChoose.anggota.find((item) => item.id === id);

    if (!pj) return;

    // clear error
    clearErrors("pjId");

    setIsPj((prev) => [...prev, pj]);
  };

  //   handle remove pj
  const handleRemovePj = (id: number) => {
    setIsPj(isPj.filter((idPj) => idPj.id !== id));
  };

  //   set value pj
  useEffect(() => {
    //   debounce
    const timer = setTimeout(() => {
      setValue(
        "pjId",
        isPj.map((pj) => pj.id),
      );
    }, 500);

    //   clear
    return () => clearTimeout(timer);
  }, [isPj]);

  // handle submit
  const onSubmit = async (data: CreatePicType | UpdatePicType) => {
    try {
      if (id) {
        const currentData = {
          kebutuhanDokumenId: Number(data.kebutuhanDokumenId),
          timAkreditasiId: Number(data.timAkreditasiId),
          keterangan: data.keterangan?.trim(),
          pjId: [...(data.pjId ?? [])].map(Number).sort(),
          keteranganUpdate: null,
        };

        const originalData = {
          kebutuhanDokumenId: dataPic?.data?.data?.kebutuhanDokumen.id,
          timAkreditasiId: dataPic?.data?.data?.timAkreditasi.id,
          keterangan: dataPic?.data?.data?.keterangan.trim(),
          pjId: dataPic?.data?.data?.pj.map((pj) => pj.id).sort(),
          keteranganUpdate: data.keteranganUpdate,
        };

        if (JSON.stringify(currentData) === JSON.stringify(originalData)) {
          navigate("/dashboard/kelola-pic", {
            state: { status: "notUpdated" },
          });
          return;
        }
      }

      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   return
  return {
    dataKebutuhanDokumentasi: dataKebutuhanDokumentasi?.data?.data,
    dataTimAkreditasiAndAnggota: dataTimAkreditasiAndAnggota?.data?.data,
    register,
    timAkreditasiController,
    kebutuhanDokumentasiController,
    pjController,
    handleSetTimAkreditasi,
    handleRemoveTimAkreditasi,
    handleSetKebutuhanDokumentasi,
    handleRemoveKebutuhanDokumentasi,
    handleSetPj,
    handleRemovePj,
    onSubmit,
    isPending,
    formulirUpdate: id,
    pathname,
    handleSubmit,
    isLoadingData: dataPic?.isLoading,
    watch,
    isTimAkreditasiChoose,
    isPjActive: isPj,
    dataPic,
    errors,
    currentPathname,
    modalDuplikatRef,
    handleCloseModalDuplikat,
  };
};

export default useFormulirPic;
