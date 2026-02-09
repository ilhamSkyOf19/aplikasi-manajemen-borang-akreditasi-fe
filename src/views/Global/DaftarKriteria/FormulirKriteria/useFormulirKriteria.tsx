import { useForm } from "react-hook-form";
import type {
  CreateKriteriaType,
  UpdateKriteriaType,
} from "../../../../models/kriteria.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { KriteriaValidation } from "../../../../validations/kriteria.validation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KriteriaService } from "../../../../services/kriteria.service";
import { useEffect } from "react";

const useFormulirKriteria = () => {
  // navigate
  const navigate = useNavigate();
  // get id from params
  const { id } = useParams() as { id: string };

  // get query
  const { data: dataKriteria, isLoading } = useQuery({
    queryKey: ["formulir-kriteria", id],
    queryFn: async () => KriteriaService.readById(+id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  // pathname
  const pathname = useLocation().pathname;
  // use form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateKriteriaType | UpdateKriteriaType>({
    resolver: zodResolver(
      id ? KriteriaValidation.UPDATE : KriteriaValidation.CREATE,
    ),
  });

  // set default value
  useEffect(() => {
    if (
      id &&
      !isLoading &&
      dataKriteria?.meta.statusCode === 200 &&
      dataKriteria?.data
    ) {
      reset({
        kriteria: dataKriteria?.data.kriteria,
        namaKriteria: dataKriteria?.data.namaKriteria,
      });
    }
  }, [id, dataKriteria?.meta.statusCode, dataKriteria?.data, isLoading]);

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateKriteriaType | UpdateKriteriaType) => {
      if (id) {
        return KriteriaService.update(+id, data as UpdateKriteriaType);
      } else {
        return KriteriaService.create(data as CreateKriteriaType);
      }
    },
    onSuccess: (data) => {
      console.log(data);

      reset();

      //   navigate
      navigate("/dashboard/daftar-kriteria");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // handle submit
  const onSubmit = async (data: CreateKriteriaType | UpdateKriteriaType) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  //
  return { register, errors, handleSubmit, onSubmit, isPending, pathname };
};

export default useFormulirKriteria;
