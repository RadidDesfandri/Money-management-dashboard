import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const registerSchema = yup.object().shape({
  email: yup.string().required().email(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(7),
});

export const userFormSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(7),
  confirmpassword: yup
    .string()
    .required()
    .oneOf(
      [yup.ref("password")],
      "password and confirm password must be the same. please check again.",
    ),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required().min(7),
  confirmpassword: yup
    .string()
    .required()
    .oneOf(
      [yup.ref("password")],
      "password and confirm password must be the same. please check again.",
    ),
});
