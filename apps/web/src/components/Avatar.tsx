"use client";

import clsx from "clsx";
import Image from "next/image";
import { useAppSelector } from "@/Redux/hooks";
import CustomIconVerified from "./CustomIconVerified";

interface AvatarProps {
  image?: string | null;
  isScroll?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ image, isScroll }) => {
  const { email, username, firstname, lastname, phone, avatar } =
    useAppSelector((state) => state.user);

  return (
    <div className="relative">
      <div
        className={clsx(
          "relative inline-block h-9 w-9 overflow-hidden rounded-full transition-all duration-300",
          isScroll ? "ring-2 ring-secondary" : "ring-1 ring-secondaryhover",
        )}
      >
        <Image alt="Avatar" src={image || "/profileplaceholder.png"} fill />
      </div>
      {email && username && firstname && lastname && phone && avatar && (
        <div className="absolute -right-1 top-0">
          <CustomIconVerified small size={15} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
