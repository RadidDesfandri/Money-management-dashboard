import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
    
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `flex items-center gap-x-4 rounded-md px-2 py-2`,
        active
          ? "bg-abu text-white hover:bg-abu"
          : "text-neutral-400 hover:bg-gray-700/10",
      )}
    >
      <Icon size={18} className={`${active && "text-secondary"}`} />
      <p className="text-sm">{label}</p>
    </Link>
  );
};

export default SidebarItem;
