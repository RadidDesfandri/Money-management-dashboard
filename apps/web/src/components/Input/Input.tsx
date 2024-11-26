"use client";

import { ErrorMessage, Field } from "formik";
import clsx from "clsx";

interface InputProps {
  type: string;
  name: string;
  id?: string;
  label?: string;
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  label,
  children,
  error,
  disabled,
  placeholder,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-1 block text-sm">
          {label}
        </label>
      )}
      <Field
        id={id}
        type={type}
        name={name}
        disabled={disabled}
        autoComplete="email"
        placeholder={placeholder}
        className={clsx(
          `mb-1 w-full rounded-lg bg-transparent px-4 py-3 text-sm outline-none ring-1 ring-inset ring-secondaryhover ring-offset-secondaryhover transition-all duration-300 placeholder:text-sm placeholder:text-gray-500 hover:ring-secondary hover:placeholder:text-gray-400 focus:ring-offset-2 disabled:hover:ring-secondaryhover disabled:hover:placeholder:text-gray-500`,
          disabled && "opacity-55",
          error &&
            "ring-rose-500 ring-offset-rose-500 hover:ring-rose-500 hover:placeholder:text-gray-500",
        )}
      >
        {children}
      </Field>
      {error && (
        <ErrorMessage
          name={name}
          component={"div"}
          className="text-[11px] text-red-500"
        />
      )}
    </div>
  );
};

export default Input;
