"use client";

import Link from "next/link";
import { useState } from "react";
import ModalAuth from "./ModalAuth";
import Button from "@/components/Button";

const Navbar = () => {
  const [isActiveModal, setIsActiveModal] = useState(false);

  return (
    <nav>
      <div className="mx-auto flex max-w-7xl justify-between px-4 py-5 md:px-12">
        <Link href={"/"}>Logo</Link>
        <Button
          type="button"
          secondary
          roundedFull
          onClick={() => setIsActiveModal(true)}
        >
          Masuk
        </Button>
        <ModalAuth
          isOpen={isActiveModal}
          onClose={() => setIsActiveModal(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
