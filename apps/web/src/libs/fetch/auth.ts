import { LoginValues, RegisterValues } from "@/types/formAuth";
import { axiosInstance } from "../axios";

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

export const verifyOtpFetch = async () => {};

export const updateDataFetch = async () => {};

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

export const forgotPasswordFetch = async () => {}