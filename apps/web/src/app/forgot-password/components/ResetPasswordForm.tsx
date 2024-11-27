"use client";

import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import { initialValueResetPassword } from "@/formiks/Initialvalue/initial";
import { resetPasswordSchema } from "@/formiks/schema/validation";
import { resetPasswordFetch } from "@/libs/fetch/auth";
import { navigate } from "@/libs/server";
import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";

interface ResetPasswordProps {
  token: string;
}

interface DataSubmit {
  password: string;
  confirmpassword: string;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setShowPassword] = useState(false);
  const [isPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onSubmit = async (
    password: string,
    action: FormikHelpers<DataSubmit>,
    token: string,
  ) => {
    setIsLoading(true);
    try {
      const res = await resetPasswordFetch(password, token);
      navigate("/");
      toast.success(res.data.msg);
      action.resetForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full transform overflow-hidden rounded-lg bg-hitam p-6 px-7 text-left shadow-xl transition-all sm:max-w-lg">
      <h1 className="text-lg font-medium md:text-xl">
        Atur ulang password kamu!
      </h1>
      <p className="mt-1 w-80 text-[11px] text-gray-300">
        Silahkan masukkan password baru dan konfirmasi password kamu
      </p>
      <Formik
        initialValues={initialValueResetPassword}
        validationSchema={resetPasswordSchema}
        onSubmit={(value, action) => {
          onSubmit(value.password, action, token);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="my-3 space-y-2">
                <Input
                  name="password"
                  disabled={isLoading}
                  label="Password"
                  error={!!errors.password && touched.password}
                  type={isPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  showPassword={isPassword}
                  setShowPassword={() => setShowPassword(!isPassword)}
                />
                <Input
                  name="confirmpassword"
                  disabled={isLoading}
                  label="Konfirmasi password"
                  error={!!errors.confirmpassword && touched.confirmpassword}
                  type={isPasswordConfirm ? "text" : "password"}
                  placeholder="Masukkan konfirmasi password"
                  showPassword={isPasswordConfirm}
                  setShowPassword={() =>
                    setShowPasswordConfirm(!isPasswordConfirm)
                  }
                />
              </div>

              <div className="mt-7">
                <Button type="submit" disabled={isLoading} secondary fullWidth>
                  {isLoading ? "Loading" : "Simpan"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
