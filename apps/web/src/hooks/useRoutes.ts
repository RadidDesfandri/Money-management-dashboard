import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { MdOutlineCategory, MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import { FaSquarePollVertical } from "react-icons/fa6";

export const useRoutes = () => {
  const pathname = usePathname();
  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalLogOutOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalLogOutOpen(false);
  }, []);

  const routes = useMemo(
    () => [
      {
        label: "Dasboard",
        href: "/dashboard",
        icon: LuLayoutDashboard,
        active: pathname == "/dashboard",
      },
      {
        label: "Transaksi",
        href: "/dashboard/transaction",
        icon: PiMoneyWavy,
        active: pathname == "/dashboard/transaction",
      },
      {
        label: "Kategori",
        href: "/dashboard/category",
        icon: MdOutlineCategory,
        active: pathname == "/dashboard/category",
      },
      {
        label: "Laporan",
        href: "/dashboard/report",
        icon: FaSquarePollVertical,
        active: pathname == "/dashboard/report",
      },
      {
        label: "Pengaturan",
        href: "/dashboard/setting",
        icon: IoSettingsOutline,
        active: pathname == "/dashboard/setting",
      },
      {
        label: "Logout",
        href: "#",
        icon: MdOutlineLogout,
        onClick: handleModalOpen,
      },
    ],
    [pathname],
  );

  return { routes, isModalLogOutOpen, handleModalOpen, handleModalClose };
};
