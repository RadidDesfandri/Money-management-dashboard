"use client";

import Image from "next/image";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  onClick: () => void;
  image: string;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  onClick,
  image,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full justify-center rounded-full px-4 py-2 shadow-sm ring-1 ring-inset ring-secondary transition-all duration-150"
    >
      <Image
        src={image}
        alt="Button-auth"
        width={30}
        height={30}
        className="h-6 w-6 object-cover"
      />
    </button>
  );
};

export default AuthSocialButton;
