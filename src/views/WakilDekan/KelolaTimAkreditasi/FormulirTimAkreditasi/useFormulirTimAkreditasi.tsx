import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TimAkreditasiService } from "../../../../services/timAkreditasi.service";
import type {
  CreateTimAkreditasiType,
  UpdateTimAkreditasiType,
} from "../../../../models/timAkreditasi.model";
import { TimAkreditasivalidation } from "../../../../validations/timAkreditasi.validation";
import { useFilter } from "../../../../hooks/useFilter";
import { UserService } from "../../../../services/user.service";

const useFormulirTimAkreditasi = () => {
  // state choose anggota / user
  const [chooseUser, setChooseUser] = useState<{ id: number; nama: string }[]>(
    [],
  );
  // navigate
  const navigate = useNavigate();
  // get id from params
  const { id } = useParams() as { id: string };

  // use search
  const { filter: searchUsers, setFilter: handleSearchUsers } =
    useFilter("searchUsers");

  // use page
  const { filter: pageUsers, setFilter: setPageUsers } = useFilter("page");

  // get query
  const data = useQueries({
    queries: [
      {
        queryKey: ["formulir-tim-akreditasi", id],
        queryFn: async () => TimAkreditasiService.readById(+id),
        enabled: !!id,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["formulir-tim-akreditasi-users", searchUsers, pageUsers],
        queryFn: async () =>
          UserService.read({ search: searchUsers, page: pageUsers }),
        refetchOnWindowFocus: false,
      },
    ],
  });

  // destruct
  const [dataTimAkreditasi, dataUsers] = data;

  // pathname
  const pathname = useLocation().pathname;
  // use form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    clearErrors,
    setValue,
  } = useForm<CreateTimAkreditasiType | UpdateTimAkreditasiType>({
    resolver: zodResolver(
      id ? TimAkreditasivalidation.UPDATE : TimAkreditasivalidation.CREATE,
    ),
  });

  // set default value
  useEffect(() => {
    if (
      id &&
      !dataTimAkreditasi.isLoading &&
      dataTimAkreditasi?.data?.meta.statusCode === 200 &&
      dataTimAkreditasi?.data.data
    ) {
      reset({
        namaTimAkreditasi: dataTimAkreditasi?.data?.data?.namaTimAkreditasi,
        users: dataTimAkreditasi?.data?.data?.user.map((user) => user.id),
      });

      // set choose user
      setChooseUser(dataTimAkreditasi?.data?.data?.user);
    }
  }, [
    id,
    dataTimAkreditasi?.data?.meta.statusCode,
    dataTimAkreditasi?.data?.data,
    dataTimAkreditasi.isLoading,
  ]);

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      data: CreateTimAkreditasiType | UpdateTimAkreditasiType,
    ) => {
      if (id) {
        return TimAkreditasiService.update(
          +id,
          data as UpdateTimAkreditasiType,
        );
      } else {
        return TimAkreditasiService.create(data as CreateTimAkreditasiType);
      }
    },
    onSuccess: () => {
      // navigate
      navigate("/dashboard/kelola-tim-akreditasi", {
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

  // handle submit
  const onSubmit = async (
    data: CreateTimAkreditasiType | UpdateTimAkreditasiType,
  ) => {
    try {
      // check same data
      if (
        JSON.stringify(data) ===
        JSON.stringify({
          namaTimAkreditasi: dataTimAkreditasi?.data?.data?.namaTimAkreditasi,
          users: dataTimAkreditasi?.data?.data?.user.map((user) => user.id),
        })
      ) {
        navigate("/dashboard/kelola-tim-akreditasi", {
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
  const usersController = useController({
    name: "users",
    control,
  });

  // handle choose anggota / user
  const handleChooseUser = (id: number) => {
    if (!dataUsers.data) return;

    const user = dataUsers?.data?.data?.data?.find((user) => user.id === id);

    if (!user) return;

    // clear error
    clearErrors("users");

    setChooseUser([...chooseUser, user]);
  };

  // handle remove
  const handleRemoveUser = (id: number) => {
    setChooseUser(chooseUser.filter((user) => user.id !== id));
  };

  // set value
  useEffect(() => {
    // debounce
    const timer = setTimeout(() => {
      setValue(
        "users",
        chooseUser.map((user) => user.id),
      );
    }, 500);

    // clear
    return () => clearTimeout(timer);
  }, [chooseUser]);

  //
  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
    pathname,
    dataTimAkreditasi: dataTimAkreditasi?.data?.data,
    formulirUpdate: id,
    usersController,
    handleSearchUsers,
    dataUsers: dataUsers?.data?.data,
    handleChooseUser,
    handleRemoveUser,
    chooseUser,
    setPageUsers,
    loadingDataTimAkreditasi: dataTimAkreditasi.isLoading,
  };
};

export default useFormulirTimAkreditasi;
