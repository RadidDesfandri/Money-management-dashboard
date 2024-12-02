"use client";

import { IoImageOutline } from "react-icons/io5";

interface ButtonUpAvatarProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ButtonUpAvatar: React.FC<ButtonUpAvatarProps> = ({
  handleImageUpload,
}) => {
  return (
    <label htmlFor="avatar">
      <div className="flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-hitam px-7 py-2 text-slate-100 ring-2 ring-secondary">
        <IoImageOutline />
        <p className="font-medium">Ganti Avatar</p>
      </div>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>
  );
};

export default ButtonUpAvatar;
