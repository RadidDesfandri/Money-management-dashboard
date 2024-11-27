"use client";

import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import ModalClose from "@/components/Modals/ModalnClose";
import { initialValueFormUser } from "@/formiks/Initialvalue/initial";
import { userFormSchema } from "@/formiks/schema/validation";
import { userFormFetch } from "@/libs/fetch/auth";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setIsModalOpenUser } from "@/Redux/slices/modalSlice";
import { UserType } from "@/types/formAuth";
import { AxiosError } from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FormikHelp {
  firstname: string;
  lastname: string;
  password: string;
  confirmpassword: string;
}

const UserForm = () => {
  const { isOpenFormUser } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isPassword, setShowPassword] = useState(false);
  const [isPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onSubmit = async (
    data: UserType,
    action: FormikHelpers<FormikHelp>,
  ) => {
    setIsLoading(true);
    try {
      const res = await userFormFetch(data);
      toast.success(res.data.msg);
      action.resetForm();
      dispatch(setIsModalOpenUser(false));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalClose isOpen={isOpenFormUser}>
      <Formik
        initialValues={initialValueFormUser}
        validationSchema={userFormSchema}
        onSubmit={(value, action) => {
          onSubmit(value, action);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="px-3 py-1 text-white">
                <h1 className="text-lg font-medium md:text-xl">
                  Form data diri
                </h1>
                <p className="mt-1 w-80 text-[11px] text-gray-300">
                  Isi form dibawah ini untuk melengkapi data account kamu
                </p>
                <div className="my-3 space-y-2">
                  <Input
                    name="firstname"
                    type="text"
                    error={!!errors.firstname && touched.firstname}
                    disabled={isLoading}
                    label="Nama depan"
                    autoComplete="off"
                    placeholder="Masukkan nama depan"
                  />
                  <Input
                    name="lastname"
                    type="text"
                    disabled={isLoading}
                    error={!!errors.lastname && touched.lastname}
                    label="Nama belakang"
                    autoComplete="off"
                    placeholder="Masukkan nama belakang"
                  />
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
                <div className="mt-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    secondary
                    fullWidth
                  >
                    {isLoading ? "Loading" : "Simpan"}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </ModalClose>
  );
};

export default UserForm;
