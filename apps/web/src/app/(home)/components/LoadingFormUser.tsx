"use client";

import Loading from "@/components/Loading/LoadingSpinner";
import { useAppSelector } from "@/Redux/hooks";

const LoadingFormUser = () => {
  const { isLoadingSlice } = useAppSelector((state) => state.modal);
  return <Loading isOpen={isLoadingSlice} />;
};

export default LoadingFormUser;
