"use client";

import Button from "@/components/Button";
import ModalClose from "@/components/Modals/ModalnClose";
import { resendOtpFetch, verifyOtpFetch } from "@/libs/fetch/auth";
import { createCookie } from "@/libs/server";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  setIsLoadingSlice,
  setIsModalOpenOtp,
  setIsModalOpenUser,
} from "@/Redux/slices/modalSlice";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OtpForm = () => {
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(120);

  const { isOpenOtp } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const minutes = Math.floor(time / 60);
  const second = time % 60;

  const isOtpComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  const handleChangeOtp = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let value = e.target.value.toUpperCase();
    if (/^[a-zA-Z0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 4) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    dispatch(setIsLoadingSlice(true));
    try {
      const otpValue = otp.join("");
      if (isOtpComplete) {
        const res = await verifyOtpFetch({ otp: otpValue });
        toast.success(res.data.msg);
        setOtp(new Array(5).fill(""));
        dispatch(setIsModalOpenOtp(false));

        setTimeout(() => {
          dispatch(setIsLoadingSlice(false));
          dispatch(setIsModalOpenUser(true));
        }, 5000);
      } else {
        toast.error("Please enter your otp code");
        dispatch(setIsLoadingSlice(false));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      dispatch(setIsLoadingSlice(false));
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const res = await resendOtpFetch();
      toast.success(res.data.msg);
      createCookie("otp", res.data.token);
      setOtp(new Array(5).fill(""));
      setTime(120);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    }
  };

  return (
    <ModalClose isOpen={isOpenOtp}>
      <div className="flex flex-col items-center px-3 py-3 text-white">
        <Image src={"/otp.svg"} alt="Otp-character" width={180} height={180} />
        <h1 className="mb-1 mt-4 text-4xl font-semibold text-secondary">OTP</h1>
        <h1 className="text-center text-xs text-gray-200">
          Kode OTP sudah dikirim ke Email kamu, mohon check email kamu untuk
          mendapatkan kode OTP,{" "}
          <span>
            waktu verifikasi {minutes}:{second < 10 ? `0${second}` : second}
          </span>
        </h1>
        <div className="my-5 flex justify-center space-x-5 md:space-x-10">
          {otp.map((it, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index]}
                id={`otp-${index}`}
                disabled={isLoading}
                autoComplete="off"
                onChange={(e) => handleChangeOtp(e, index)}
                className="h-12 w-12 rounded-md bg-transparent text-center text-lg text-white ring-1 ring-secondaryhover focus:outline-none focus:ring-2 focus:ring-secondary disabled:cursor-default disabled:opacity-50"
              />
            );
          })}
        </div>

        <div className="mb-4 flex flex-col items-center">
          <p className="text-xs text-gray-200 md:text-sm">
            Belum mendapatkan code otp?
          </p>
          <button
            onClick={resendOtp}
            className="text-xs text-secondaryhover hover:underline md:text-sm"
          >
            Kirim Ulang
          </button>
        </div>

        <Button
          fullWidth
          secondary
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Verifikasi"}
        </Button>
      </div>
    </ModalClose>
  );
};

export default OtpForm;
