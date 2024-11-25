"use client";

import Image from "next/image";
import { useState } from "react";
import ModalAuth from "./ModalAuth";
import Button from "@/components/Button";
import { BsArrowRight } from "react-icons/bs";

const HeroSection = () => {
  const [isActiveModal, setIsActiveModal] = useState(false);
  return (
    <div className="flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-abu px-9 py-8 text-white md:flex-row md:px-20">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">
          Kelola Keuangan Anda dengan Cerdas, Raih Kebebasan Finansial
        </h1>
        <p className="mt-1 w-[90%] text-[11px] text-gray-300 md:mt-2 md:text-xs">
          Mulailah merencanakan masa depan keuangan Anda dengan alat pengelolaan
          yang mudah digunakan. Kontrol anggaran, pantau pengeluaran, dan capai
          tujuan finansial Anda.
        </p>

        <div className="my-7">
          <Button
            type="button"
            secondary
            roundedFull
            onClick={() => setIsActiveModal(true)}
          >
            <div className="flex items-center gap-x-2">
              <p>Mulai Gratis</p>
              <BsArrowRight size={20} />
            </div>
          </Button>
        </div>

        <div className="flex gap-x-10">
          <div>
            <h3 className="text-xl font-semibold">4.8</h3>
            <p className="text-sm">Rating on web</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">400k</h3>
            <p className="text-sm">Active User</p>
          </div>
        </div>
      </div>
      <div className="relative flex h-[420px] w-full items-center justify-end md:w-[70%]">
        <Image
        src={"/herosection.svg"}
          alt="Hero Section"
          width={370}
          height={370}
          className="absolute z-20 object-cover"
        />
        <div className="absolute h-80 w-72 rounded-3xl bg-gray-600 p-5 opacity-30 blur-3xl md:right-32" />
      </div>
      <ModalAuth
        isOpen={isActiveModal}
        onClose={() => setIsActiveModal(false)}
      />
    </div>
  );
};

export default HeroSection;
