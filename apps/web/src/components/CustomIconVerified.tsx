import clsx from "clsx";
import React from "react";
import { MdVerified } from "react-icons/md";

interface CustomIconVerifiedProps {
  size?: string | number | undefined;
  large?: boolean;
  small?: boolean;
}

const CustomIconVerified: React.FC<CustomIconVerifiedProps> = ({
  size,
  large,
  small,
}) => {
  return (
    <div className="relative w-fit">
      <div
        className={clsx(
          "absolute z-0 bg-white",
          small && "right-1 top-1 h-2 w-2",
          large && "right-2 top-3 h-4 w-[22px]",
        )}
      />
      <MdVerified size={size} className="relative z-10 text-blue-700" />
    </div>
  );
};

export default CustomIconVerified;
