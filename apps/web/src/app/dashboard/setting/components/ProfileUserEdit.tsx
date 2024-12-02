"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import AvatarPrev from "./AvatarPrev";
import Button from "@/components/Button";
import { MdVerified } from "react-icons/md";
import Input from "@/components/Input/Input";
import ButtonUpAvatar from "./ButtonUpAvatar";
import { useAppSelector } from "@/Redux/hooks";
import ImageCropper from "@/components/ImageCropper";
import PhoneInput from "@/components/Input/PhoneInput";
import { editProfileUserFetch } from "@/libs/fetch/user";

interface FormValues {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  avatar: string | null;
}

const ProfileUserEdit = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { username, firstname, lastname, phone, avatar } = useAppSelector(
    (state) => state.user,
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValues: FormValues = {
    avatar: avatar,
    username: username,
    firstname: firstname,
    lastname: lastname,
    phone: phone,
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("phone", data.phone);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const res = await editProfileUserFetch(formData);
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      console.log(error,"ERROR BANGG!!!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value) => {
        value.avatar = croppedImage;
        // alert(JSON.stringify(value));
        onSubmit(value)
      }}
    >
      {({ dirty }) => {
        return (
          <Form>
            <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
              {/* Avatar user */}
              <div className="relative mb-8 flex items-center justify-center md:mb-0">
                <AvatarPrev image={avatar || croppedImage} />
                <div className="absolute bottom-12">
                  <ButtonUpAvatar handleImageUpload={handleImageUpload} />
                  <ImageCropper
                    image={image}
                    setImage={setImage}
                    onCropComplete={(cropped) => setCroppedImage(cropped)}
                  />
                </div>
              </div>

              {/* Data user */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-lg font-semibold md:text-xl">
                    Data diri
                  </h1>
                  <p className="flex items-center gap-x-1 text-xs text-neutral-300">
                    Lengkapi data diri kamu agar mendapatkan lencana verifikasi{" "}
                    <MdVerified className="text-blue-700" />
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="text-xs text-neutral-300"
                  >
                    Nama pengguna
                  </label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    autoComplete="off"
                    disabled={isLoading}
                    placeholder="Nama pengguna"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="text-xs text-neutral-300"
                  >
                    Nama depan {`(optional)`}
                  </label>
                  <Input
                    id="firstname"
                    type="text"
                    name="firstname"
                    autoComplete="off"
                    disabled={isLoading}
                    placeholder="Nama depan"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="text-xs text-neutral-300"
                  >
                    Nama belakang {`(optional)`}
                  </label>
                  <Input
                    id="lastname"
                    type="text"
                    name="lastname"
                    autoComplete="off"
                    disabled={isLoading}
                    placeholder="Nama belakang"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-xs text-neutral-300">
                    Nomor ponsel {`(optional)`}
                  </label>
                  <PhoneInput name="phone" disabled={isLoading} />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button type="submit" secondary disabled={isLoading || !dirty}>
                {isLoading ? "Loading..." : "Simpan"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileUserEdit;
