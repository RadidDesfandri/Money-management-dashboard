import { axiosInstance } from "../axios";
import { getCookie } from "../server";

export const editProfileUserFetch = async (payload: FormData) => {
  const token = await getCookie("token");
  const res = await axiosInstance.patch("/edit-profile", payload, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};
