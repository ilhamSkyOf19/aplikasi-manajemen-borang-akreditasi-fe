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

const useFomulirKebutuhanDokumentasi = () => {
  // navigate
  const navigate = useNavigate();
  // get id from params
  const { id } = useParams() as { id: string };

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
        queryKey: ["formulir-kebutuhan-dokumentasi-kriteria"],
        queryFn: async () => KriteriaService.readAll({}),
        refetchOnWindowFocus: false,
      },
    ],
  });

  // destruct
  const [dataKebutuhanDokumentasi, dataKriteria] = data;

  // pathname
  const pathname = useLocation().pathname;
  // use form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
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
      console.log(error);
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
      if (
        JSON.stringify(data) ===
        JSON.stringify({
          namaDokumen: dataKebutuhanDokumentasi?.data?.data?.namaDokumen,
          keterangan: dataKebutuhanDokumentasi?.data?.data?.keterangan,
          kriteriaId: dataKebutuhanDokumentasi?.data?.data?.kriteria.id,
          pendekatanId: dataKebutuhanDokumentasi?.data?.data?.pendekatan.id,
        })
      ) {
        navigate("/dashboard/kelola-kebutuhan-dokumentasi", {
          state: {
            status: "notUpdated",
          },
        });

        return;
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
    clearErrors,
    dataKriteria: dataKriteria?.data?.data,
    kriteriaController,
    pendekatanController,
  };
};

export default useFomulirKebutuhanDokumentasi;
