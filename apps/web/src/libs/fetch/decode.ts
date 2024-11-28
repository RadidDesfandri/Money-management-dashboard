import { axiosInstance } from "../axios";

export const decodeTokenFetch = async (token: string) => {
  try {
    const res = await axiosInstance.get("/decode", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};