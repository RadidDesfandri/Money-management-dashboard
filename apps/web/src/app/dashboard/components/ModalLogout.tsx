"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modals/Modal";
import { deleteCookie, navigate } from "@/libs/server";
import { useCallback } from "react";

interface ModalLogoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLogout: React.FC<ModalLogoutProps> = ({ isOpen, onClose }) => {
  const handleLogOut = useCallback(() => {
    deleteCookie("token");
    navigate("/");
    localStorage.clear();
  }, []);

  return (
    <Modal backgroundClose isOpen={isOpen} onClose={onClose}>
      <div className="text-white">
        <h1 className="text-lg font-medium md:text-xl">
          Kamu Yakin Ingin Keluar?
        </h1>
        <p className="mt-2 text-[11px] text-gray-300">
          Kamu akan keluar dari akun kamu. Pastikan untuk menyimpan pekerjaan
          kamu sebelum melanjutkan. Apakah kamu ingin melanjutkan?
        </p>
        <div className="mt-10 flex justify-end border-t gap-x-2 border-neutral-700 pt-6">
          <Button type="button" onClick={onClose}>
            <p className="text-white">Batal</p>
          </Button>
          <Button danger type="button" onClick={handleLogOut}>
            Keluar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogout;
