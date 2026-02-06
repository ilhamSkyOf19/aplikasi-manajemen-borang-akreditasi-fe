import { type FC } from "react";
import logoFikom from "../../../assets/logos/logo-fikom.webp";
import InputFieldText from "../../../components/InputFieldText";
import InputFieldPassword from "../../../components/InputFieldPassword";
import ButtonSubmit from "../../../components/ButtonSubmit";
import useLogin from "./useLogin";
import { cn } from "../../../utils/cn";

const Login: FC = () => {
  // use login
  const { errors, register, handleSubmit, isPending, onSubmit } = useLogin();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 lg:flex-row">
      {/* header */}
      <div className="w-full py-4 flex flex-row justify-center items-center gap-4 lg:flex-col">
        {/* icon */}
        <img
          src={logoFikom}
          alt="logo fikom"
          loading="lazy"
          className="w-24 lg:w-70"
        />

        {/* title */}
        <div className="flex flex-col justify-start items-center gap-1">
          {/* big title */}
          <h1 className="text-lg font-semibold w-full lg:text-2xl">
            Aplikasi Manajemen Borang Akreditasi
          </h1>

          {/* small title */}
          <h2 className="text-xs font-medium w-full lg:text-base lg:text-center">
            Fakultas Ilmu Komputer <br /> Universitas Muhammadiyah Metro
          </h2>
        </div>
      </div>

      {/* from */}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-start items-center lg:w-md lg:card lg:shadow-sm lg:py-14 lg:px-8">
          {/* header */}
          <div className="w-full flex flex-col justify-start items-start">
            <h2 className="text-lg font-semibold lg:text-2xl">
              Selamat Datang,
            </h2>

            <h2 className="text-xs lg:text-sm">
              Masuk ke akun Anda untuk melanjutkan
            </h2>
          </div>

          {/* input field */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-start items-start mt-5 gap-4 lg:mt-6"
          >
            <div
              className={cn(
                "w-full flex flex-col justify-start items-start",
                errors.identifier || errors.password
                  ? "gap-6"
                  : "gap-1 lg:gap-2",
              )}
            >
              {/* input identifier */}
              <InputFieldText
                register={register("identifier")}
                errorMessage={errors.identifier?.message}
                name="identifier"
                placeholder="Masukkan Email atau Nama"
              />

              {/* input password  */}
              <InputFieldPassword
                register={register("password")}
                errorMessage={errors.password?.message}
                name="password"
                placeholder="Masukkan Password"
              />
            </div>

            {/* button submit */}
            <div className="w-full mt-8 lg:mt-4 flex flex-col justify-center items-center gap-4">
              {/* forget password */}
              <button
                type="button"
                className="text-xs text-primary-black/70 hover:text-primary-black transition-colors duration-300 ease-in-out"
              >
                Lupa Password?
              </button>
              <ButtonSubmit isLoading={isPending} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
