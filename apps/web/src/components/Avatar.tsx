"use client";

import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  avatar?: string | null;
  isScroll?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, isScroll }) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          "relative inline-block h-9 w-9 overflow-hidden rounded-full transition-all duration-300",
          isScroll ? "ring-2 ring-secondary" : "ring-1 ring-secondaryhover",
        )}
      >
        <Image alt="Avatar" src={avatar || "/profileplaceholder.png"} fill />
      </div>
      <span className="absolute right-0 top-0 block h-[10px] w-[10px] rounded-full bg-green-500 ring-2 ring-white" />
    </div>
  );
};

export default Avatar;
