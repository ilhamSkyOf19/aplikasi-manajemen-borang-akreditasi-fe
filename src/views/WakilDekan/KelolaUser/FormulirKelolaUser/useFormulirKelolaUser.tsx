import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { UserService } from "../../../../services/user.service";
import type {
  CreateUserType,
  UpdateUserType,
} from "../../../../models/user.model";
import { UserValidation } from "../../../../validations/user.validation";
import { AxiosError } from "axios";

const useFormulirKelolaUser = () => {
  // navigate
  const navigate = useNavigate();
  // get id from params
  const { id } = useParams() as { id: string };

  // get query
  const { data: dataUser, isLoading } = useQuery({
    queryKey: ["formulir-kelola-user", id],
    queryFn: async () => UserService.readById(+id),
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
    control,
    setError,
    clearErrors,
  } = useForm<CreateUserType | UpdateUserType>({
    resolver: zodResolver(id ? UserValidation.UPDATE : UserValidation.CREATE),
  });

  // set default value
  useEffect(() => {
    if (
      id &&
      !isLoading &&
      dataUser?.meta.statusCode === 200 &&
      dataUser?.data
    ) {
      reset({
        nama: dataUser?.data?.nama,
        email: dataUser?.data?.email,
        role:
          dataUser?.data?.role === "wakil_dekan_1"
            ? undefined
            : dataUser?.data?.role,
      });
    }
  }, [id, dataUser?.meta.statusCode, dataUser?.data, isLoading]);

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateUserType | UpdateUserType) => {
      if (id) {
        return UserService.update(+id, data as UpdateUserType);
      } else {
        return UserService.create(data as CreateUserType);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/kelola-user", {
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
      if (error instanceof AxiosError) {
        if (error.response?.data.meta.statusCode === 409) {
          setError("email", {
            message: "email sudah ada",
          });
        }
      }

      console.log(error);
    },
  });

  // handle submit
  const onSubmit = async (data: CreateUserType | UpdateUserType) => {
    try {
      // check same data
      if (
        JSON.stringify(data) ===
        JSON.stringify({
          nama: dataUser?.data?.nama,
          email: dataUser?.data?.email,
          role:
            dataUser?.data?.role === "wakil_dekan_1"
              ? undefined
              : "tim_akreditasi",
        })
      ) {
        navigate("/dashboard/kelola-user", {
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

  //   controller
  const roleController = useController({
    name: "role",
    control,
  });

  //
  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
    pathname,
    dataUser: dataUser?.data,
    formulirUpdate: id,
    roleController,
    clearErrors,
  };
};

export default useFormulirKelolaUser;
