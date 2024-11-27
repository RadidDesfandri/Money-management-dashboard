"use client";

import { Form, Formik, FormikHelpers } from "formik";
import Modal from "@/components/Modals/Modal";
import Input from "@/components/Input/Input";
import { useCallback, useState } from "react";
import {
  initialValueLogin,
  initialValueRegister,
} from "@/formiks/Initialvalue/initial";
import Button from "@/components/Button";
import { loginSchema, registerSchema } from "@/formiks/schema/validation";
import { LoginValues, RegisterValues } from "@/types/formAuth";
import AuthSocialButton from "./AuthSocialButton";
import {
  forgotPasswordFetch,
  loginFetch,
  registerFetch,
} from "@/libs/fetch/auth";
import { AxiosError } from "axios";
import { createCookie, navigate } from "@/libs/server";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/Redux/hooks";
import { setIsModalOpenOtp } from "@/Redux/slices/modalSlice";

interface ModalAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

type VariantAuth = "LOGIN" | "REGISTER" | "FORGOTPASSWORD";

const ModalAuth: React.FC<ModalAuthProps> = ({ isOpen, onClose }) => {
  const [isVariant, setIsVariant] = useState<VariantAuth>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const handleChangeVariant = useCallback(() => {
    if (isVariant == "LOGIN") {
      setIsVariant("REGISTER");
    } else {
      setIsVariant("LOGIN");
    }
  }, [isVariant]);

  const onSubmit = async (
    data: RegisterValues | LoginValues,
    action: FormikHelpers<RegisterValues | LoginValues>,
  ) => {
    setIsLoading(true);

    if (isVariant == "LOGIN") {
      try {
        const res = await loginFetch(data);
        createCookie("token", res.data.token);
        toast.success(res.data.msg);
        action.resetForm();
        navigate("/dashboard");
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (isVariant == "REGISTER") {
      try {
        const res = await registerFetch(data);
        createCookie("otp", res.data.token);
        toast.success(res.data.msg);
        dispatch(setIsModalOpenOtp(true));
        setIsVariant("LOGIN");
        action.resetForm();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (isVariant == "FORGOTPASSWORD") {
      try {
        const res = await forgotPasswordFetch();
        action.resetForm();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data);
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal backgroundClose isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={
          isVariant == "LOGIN" ? initialValueLogin : initialValueRegister
        }
        validationSchema={isVariant == "LOGIN" ? loginSchema : registerSchema}
        onSubmit={(value, action) => {
          onSubmit(value, action);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="text-slate-100">
              <div className="my-3 px-3">
                <h1 className="text-lg font-medium md:text-xl">
                  {isVariant == "LOGIN"
                    ? "Selamat Datang Kembali!"
                    : isVariant == "REGISTER"
                      ? "Bergabung dengan kami hari ini!"
                      : "Lupa Password?"}
                </h1>
                <p className="mt-1 w-80 text-[11px] text-gray-300">
                  {isVariant == "LOGIN"
                    ? "Masukkan detail kamu di bawah ini untuk masuk ke akun kamu"
                    : isVariant == "REGISTER"
                      ? "Daftarkan diri kamu dengan mengisi form di bawah ini untuk mulai menggunakan layanan kami."
                      : "Tidak bisa masuk? Atur ulang password kamu di sini."}
                </p>

                <div className="my-4 flex flex-col space-y-4">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    disabled={isLoading}
                    error={!!errors.email && touched.email}
                    placeholder="Masukkan email kamu"
                  />
                  {isVariant == "LOGIN" && (
                    <div>
                      <Input
                        id="password"
                        name="password"
                        type={isShowPassword ? "text" : "password"}
                        label="Password"
                        showPassword={isShowPassword}
                        setShowPassword={() =>
                          setIsShowPassword(!isShowPassword)
                        }
                        disabled={isLoading}
                        error={
                          !!(errors as any)?.password &&
                          (touched as any)?.password
                        }
                        placeholder="Masukkan password kamu"
                      />
                      <p
                        onClick={() => setIsVariant("FORGOTPASSWORD")}
                        className="cursor-pointer text-[11px] text-secondary hover:underline"
                      >
                        Lupa Password?
                      </p>
                    </div>
                  )}
                  <Button
                    secondary
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                  >
                    {isVariant == "LOGIN"
                      ? "Masuk"
                      : isVariant == "REGISTER"
                        ? "Daftar"
                        : "Kirim"}
                  </Button>
                </div>

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-hitam px-2 text-gray-300">atau</span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-x-2 ${isVariant == "FORGOTPASSWORD" ? "hidden" : "visible"}`}
                >
                  <AuthSocialButton
                    onClick={() => {}}
                    image="/auth/google.svg"
                  />
                  <AuthSocialButton
                    onClick={() => {}}
                    image="/auth/twitter.svg"
                  />
                </div>

                <p className="mt-4 text-center text-[11px] text-gray-300">
                  {isVariant == "LOGIN"
                    ? "Belum Memiliki Account?"
                    : "Sudah Memiliki Account?"}{" "}
                  <span
                    onClick={handleChangeVariant}
                    className="cursor-pointer text-secondary hover:underline"
                  >
                    {isVariant == "LOGIN"
                      ? "Daftar Sekarang!"
                      : "Masuk Sekarang!"}
                  </span>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ModalAuth;
