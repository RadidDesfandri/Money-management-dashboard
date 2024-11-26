import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().required().email(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(7),
});
