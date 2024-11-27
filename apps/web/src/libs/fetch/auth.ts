import { LoginValues, RegisterValues, UserType } from "@/types/formAuth";
import { axiosInstance } from "../axios";
import { getCookie } from "../server";

export const registerFetch = async (payload: RegisterValues) => {
  const res = await axiosInstance.post(
    "/register",
    {
      email: payload.email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res;
};

export const verifyOtpFetch = async (payload: { otp: string }) => {
  const token = await getCookie("otp");
  const res = await axiosInstance.post(
    "/verify-otp",
    {
      otp: payload.otp,
    },
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return res;
};

export const resendOtpFetch = async () => {
  const token = await getCookie("otp");
  const res = await axiosInstance.post(
    "/resend-otp",
    {},
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );
  return res;
};

export const userFormFetch = async (payload: UserType) => {
  const token = await getCookie("otp");
  const res = await axiosInstance.patch(
    "/user-form",
    {
      firstname: payload.firstname,
      lastname: payload.lastname,
      password: payload.lastname,
    },
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  return res;
};

export const loginFetch = async (payload: LoginValues) => {
  const res = await axiosInstance.post(
    "/login",
    {
      email: payload.email,
      password: payload.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res;
};

export const forgotPasswordFetch = async () => {};
