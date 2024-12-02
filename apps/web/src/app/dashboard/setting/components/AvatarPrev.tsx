"use client";

import clsx from "clsx";
import Image from "next/image";
import { useAppSelector } from "@/Redux/hooks";
import CustomIconVerified from "@/components/CustomIconVerified";

interface AvatarPrevProps {
  image?: string | null;
}

const AvatarPrev: React.FC<AvatarPrevProps> = ({ image }) => {
  const { email, username, firstname, lastname, phone, avatar } =
    useAppSelector((state) => state.user);

  return (
    <div className="relative">
      <div
        className={clsx(
          "relative inline-block h-72 w-72 overflow-hidden rounded-full ring-4 ring-secondaryhover transition-all duration-300",
        )}
      >
        <Image alt="Avatar" src={image || "/profileplaceholder.png"} fill />
      </div>
      {email && username && firstname && lastname && phone && avatar && (
        <div className="absolute right-4 top-4">
          <CustomIconVerified large size={40} />
        </div>
      )}
    </div>
  );
};

export default AvatarPrev;
