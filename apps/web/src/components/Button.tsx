"use client";

import clsx from "clsx";

interface ButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  roundedFull?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  disabled,
  danger,
  fullWidth,
  onClick,
  secondary,
  roundedFull,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `flex justify-center px-3 py-1 text-hitam transition-all duration-300 md:px-6 md:py-2`,
        fullWidth && "w-full",
        roundedFull ? "rounded-full" : "rounded-lg",
        disabled &&
          "cursor-default text-gray-700 opacity-50 hover:bg-secondary",
        secondary && "bg-secondary hover:bg-secondaryhover",
        danger && "bg-rose-500 text-white hover:bg-rose-600",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
