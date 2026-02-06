import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginUserType } from "../../../models/user.model";
import { UserValidation } from "../../../validations/user.validation";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../../services/auth.service";
import { AxiosError } from "axios";

const useLogin = () => {
  //  use form
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<LoginUserType>({
    resolver: zodResolver(UserValidation.LOGIN),
  });

  //   use mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginUserType) => {
      return AuthService.login(data);
    },
    onSuccess: (data) => {
      //   cek status
      if (data.meta.statusCode === 200) {
        window.location.href = "/";
        reset();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.status === 400) {
          // set error
          setError("identifier", {
            message: "Login gagal. Cek kembali data Anda.",
          });
          setError("password", {
            message: "Login gagal. Cek kembali data Anda.",
          });
        }
      }
    },
  });

  //   handle submit
  const onSubmit = async (data: LoginUserType) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { register, errors, handleSubmit, onSubmit, isPending };
};

export default useLogin;
