"use client";

import clsx from "clsx";
import { ErrorMessage, useField } from "formik";

interface PhoneInputProps {
  name: string;
  disabled?: boolean;
  error?: boolean;
}

const formatPhoneNumber = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");

  const noLeadingZero = numericValue.startsWith("0")
    ? numericValue.slice(1)
    : numericValue;

  const trimmedValue = noLeadingZero.slice(0, 13);

  return trimmedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const PhoneInput: React.FC<PhoneInputProps> = ({ name, disabled, error }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatedValue = formatPhoneNumber(e.target.value);

    helpers.setValue(formatedValue);
  };

  return (
    <div className="flex items-center">
      <div
        className={clsx(
          "rounded-l-lg px-4 py-3 text-sm ring-1",
          error ? "ring-rose-500 ring-offset-rose-500" : "ring-secondaryhover",
        )}
      >
        +62
      </div>
      <input
        type="text"
        id={name}
        {...field}
        onChange={handleChange}
        autoComplete="off"
        placeholder="Masukkan nomor ponsel"
        disabled={disabled}
        className={clsx(
          "w-full rounded-r-lg bg-transparent px-4 py-3 text-sm outline-none ring-1 placeholder:text-gray-500",
          disabled && "opacity-55",
          error
            ? "ring-rose-500 ring-offset-rose-500"
            : "ring-secondaryhover placeholder:text-gray-500 hover:ring-secondary hover:placeholder:text-gray-400",
        )}
      />
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

export default PhoneInput;
