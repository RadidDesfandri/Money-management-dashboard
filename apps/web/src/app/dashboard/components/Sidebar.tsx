"use client";

import clsx from "clsx";
import SidebarItem from "./SidebarItem";
import ModalLogout from "./ModalLogout";
import Avatar from "@/components/Avatar";
import { useRoutes } from "@/hooks/useRoutes";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/Redux/hooks";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { routes, isModalLogOutOpen, handleModalClose } = useRoutes();
  const { firstname, lastname, avatar, createdAt } = useAppSelector(
    (state) => state.user,
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      if (scrollContainer) {
        setIsScrolled(scrollContainer.scrollTop > 10);
      }
    };

    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const general = routes.slice(0, 2);
  const manage = routes.slice(2, 4);
  const settings = routes.slice(4, 6);

  return (
    <div
      className={clsx(
        `mx-auto flex w-full flex-1 flex-col overflow-hidden bg-abu text-slate-50 md:flex-row`,
        "h-screen",
      )}
    >
      {/* Body sidebar */}
      <div className="hidden h-full flex-shrink-0 flex-col bg-hitam px-5 py-7 md:flex md:w-[190px] lg:w-[230px]">
        <p>Logo</p>

        <div className="mt-7 flex flex-col space-y-10">
          <div className="flex flex-col space-y-1">
            <h1 className="text-sm font-semibold">Utama</h1>
            {general.map((item) => {
              return (
                <SidebarItem
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                  onClick={item.onClick}
                />
              );
            })}
          </div>

          <div className="flex flex-col space-y-1">
            <h1 className="text-sm font-semibold">Manajemen Data</h1>
            {manage.map((item) => {
              return (
                <SidebarItem
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                  onClick={item.onClick}
                />
              );
            })}
          </div>

          <div className="flex flex-col space-y-1">
            <h1 className="text-sm font-semibold">Pengaturan dan Akun</h1>
            {settings.map((item) => {
              return (
                <SidebarItem
                  key={item.label}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                  onClick={item.onClick}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="w-full overflow-y-scroll md:overflow-hidden">
        <div
          className={clsx(
            "flex w-full items-center transition-all duration-300",
            isScrolled
              ? "rounded-b-2xl bg-neutral-800 text-slate-50"
              : "bg-transparent text-slate-50",
          )}
        >
          <div
            className={clsx(
              "flex w-full items-center justify-between px-5 py-3",
              isScrolled ? "border-0" : "border-b border-neutral-600",
            )}
          >
            <p>ppp</p>
            <div className="flex items-center gap-x-3">
              <div>
                <p className="font-semibold">
                  {firstname} {lastname}
                </p>
                <p className="text-end text-xs text-neutral-400">{createdAt}</p>
              </div>
              <Avatar isScroll={isScrolled} avatar={avatar} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-none h-full w-full overflow-auto px-6 pt-4"
        >
          {children}
        </div>
      </div>
      <ModalLogout isOpen={isModalLogOutOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Sidebar;