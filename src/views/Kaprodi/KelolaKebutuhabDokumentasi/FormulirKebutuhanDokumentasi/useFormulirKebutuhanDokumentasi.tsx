import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { KebutuhanDokumentasiService } from "../../../../services/kebutuhanDokumentasi.service";
import { KriteriaService } from "../../../../services/kriteria.service";
import type {
  CreateKebutuhanDokumenType,
  UpdateKebutuhanDokumenType,
} from "../../../../models/kebutuhanDokumentasi.model";
import { KebutuhanDokumenValidation } from "../../../../validations/kebutuhanDokumentasi.validation";
import useModal from "../../../../hooks/useModal";
import { AxiosError } from "axios";
import useConfirm from "../../../../hooks/useConfirm";

const useFomulirKebutuhanDokumentasi = () => {
  // navigate
  const navigate = useNavigate();
  // get id from params
  const { id } = useParams() as { id: string };

  // use location
  const location = useLocation();

  // modal alert
  const {
    modalRef: modalAlertRef,
    handleCloseModal: handleCloseModalAlert,
    handleShowModal: handleShowModalAlert,
  } = useModal();

  // modal alert konfirmasi
  const {
    confirm,
    handleCancel,
    handleConfirm,
    modalRef: modalConfirmRef,
  } = useConfirm();

  // get query
  const data = useQueries({
    queries: [
      {
        queryKey: ["formulir-kebutuhan-dokumentasi", id],
        queryFn: async () => KebutuhanDokumentasiService.readById(+id),
        enabled: !!id,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["daftar-kriteria"],
        queryFn: async () => KriteriaService.readAll({}),
        refetchOnWindowFocus: false,
      },
    ],
  });

  // destruct
  const [dataKebutuhanDokumentasi, dataKriteria] = data;

  // current pathname
  const currentPathName = useLocation().pathname.split("/");

  // pathname
  let pathname: string;

  if (currentPathName.includes("detail")) {
    pathname = useLocation().pathname.split("/").slice(0, -1).join("/");
  } else {
    pathname = useLocation().pathname.split("/").slice(0, 4).join("/");
  }
  // use form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<CreateKebutuhanDokumenType | UpdateKebutuhanDokumenType>({
    resolver: zodResolver(
      id
        ? KebutuhanDokumenValidation.UPDATE
        : KebutuhanDokumenValidation.CREATE,
    ),
  });

  // set default value
  useEffect(() => {
    if (
      id &&
      !dataKebutuhanDokumentasi.isLoading &&
      dataKebutuhanDokumentasi?.data?.meta.statusCode === 200 &&
      dataKebutuhanDokumentasi?.data.data
    ) {
      reset({
        namaDokumen: dataKebutuhanDokumentasi?.data?.data?.namaDokumen,
        keterangan: dataKebutuhanDokumentasi?.data?.data?.keterangan,
        kriteriaId: dataKebutuhanDokumentasi?.data?.data?.kriteria.id,
        pendekatanId: dataKebutuhanDokumentasi?.data?.data?.pendekatan.id,
      });
    }
  }, [
    id,
    dataKebutuhanDokumentasi?.data?.meta.statusCode,
    dataKebutuhanDokumentasi?.data?.data,
    dataKebutuhanDokumentasi.isLoading,
  ]);

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      data: CreateKebutuhanDokumenType | UpdateKebutuhanDokumenType,
    ) => {
      if (id) {
        return KebutuhanDokumentasiService.update(
          +id,
          data as UpdateKebutuhanDokumenType,
        );
      } else {
        return KebutuhanDokumentasiService.create(
          data as CreateKebutuhanDokumenType,
        );
      }
    },
    onSuccess: () => {
      // check state from location state
      if (location?.state?.callback) {
        return navigate(location?.state?.callback, {
          state: {
            status: id ? "updated" : "created",
          },
        });
      }

      // navigate
      navigate("/dashboard/kelola-kebutuhan-dokumentasi", {
        state: {
          status: id ? "updated" : "created",
        },
      });

      // reset
      const timer = setTimeout(() => {
        reset();
      }, 1000);

      //   clear
      return () => clearTimeout(timer);
    },
    onError: (error) => {
      // check error
      if (error instanceof AxiosError) {
        if (error?.response?.data?.meta?.statusCode === 409) {
          // show modal
          handleShowModalAlert();
        }
      }
    },
  });

  // controller kriteria
  const kriteriaController = useController({
    name: "kriteriaId",
    control: control,
  });

  // controll pendekatan
  const pendekatanController = useController({
    name: "pendekatanId",
    control: control,
  });

  // handle submit
  const onSubmit = async (
    data: CreateKebutuhanDokumenType | UpdateKebutuhanDokumenType,
  ) => {
    try {
      // check same data
      if (id) {
        if (
          JSON.stringify({
            ...data,
            keteranganUpdate: null,
          }) ===
          JSON.stringify({
            namaDokumen: dataKebutuhanDokumentasi?.data?.data?.namaDokumen,
            keterangan: dataKebutuhanDokumentasi?.data?.data?.keterangan,
            kriteriaId: dataKebutuhanDokumentasi?.data?.data?.kriteria.id,
            pendekatanId: dataKebutuhanDokumentasi?.data?.data?.pendekatan.id,
            keteranganUpdate: null,
          })
        ) {
          navigate("/dashboard/kelola-kebutuhan-dokumentasi", {
            state: {
              status: "notUpdated",
            },
          });

          return;
        }

        // call confirm
        const isConfirm = await confirm();

        // check confirm
        if (!isConfirm) {
          return;
        }
      }

      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  //
  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
    pathname,
    dataKebutuhanDokumentasi: dataKebutuhanDokumentasi?.data?.data,
    formulirUpdate: id,
    dataKriteria: dataKriteria?.data?.data,
    kriteriaController,
    pendekatanController,
    loadingData: dataKebutuhanDokumentasi?.isLoading,
    modalAlertRef,
    handleCloseModalAlert,
    handleCancel,
    handleConfirm,
    modalConfirmRef,
  };
};

export default useFomulirKebutuhanDokumentasi;
