"use client";

import { Form, Formik } from "formik";
import Modal from "@/components/Modal";

interface ModalAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAuth: React.FC<ModalAuthProps> = ({ isOpen, onClose }) => {
  return (
    <Modal backgroundClose isOpen={isOpen} onClose={onClose}>
      <Formik
        initialValues={{}}
        validationSchema={{}}
        onSubmit={() => {
          alert("tes");
        }}
      >
        {() => {
          return (
            <Form className="text-white">
              <div>Formik here</div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ModalAuth;
