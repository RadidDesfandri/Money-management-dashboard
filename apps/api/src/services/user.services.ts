import { generateOtp } from '@/helpers/generateOtp';
import handlebars from 'handlebars';
import prisma from '@/prisma';
import path from 'path';
import fs from 'fs';
import { transporter } from '@/helpers/nodemailer';
import { hashPassword } from '@/helpers/hashPassword';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { createToken } from '@/helpers/createToken';
import { checkExistingEmail, notFoundUser } from '@/helpers/userCheck';

export const registerService = async (email: string) => {
  try {
    await checkExistingEmail(email);

    const { otp, token } = generateOtp(email);
    const otpExpired = new Date();
    otpExpired.setMinutes(otpExpired.getMinutes() + 2);

    const newUser = await prisma.user.create({
      data: {
        email,
        otp,
        otpExpired,
      },
    });

    const templatePath = path.join(__dirname, '../templates', 'otp.hbs');
    const dataSendMail = {
      otp: newUser.otp,
      email: newUser.email,
    };

    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataSendMail);

    await transporter.sendMail({
      to: email,
      subject: 'Verification email',
      html,
    });

    return { newUser, token };
  } catch (error) {
    throw error;
  }
};

export const verivyOtpService = async (
  otp: string,
  email: string,
  otpToken: string,
) => {
  try {
    const user = await notFoundUser(email);

    if (user.otpExpired && new Date() > user.otpExpired)
      throw new Error('Otp code has expired');

    if (otp !== otpToken) throw new Error('Invalid otp code');

    const verifyUser = await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null,
        otpExpired: null,
      },
    });

    return verifyUser;
  } catch (error) {
    throw error;
  }
};

export const resendOtpService = async (email: string) => {
  try {
    await notFoundUser(email);

    const { otp, token } = generateOtp(email);
    const otpExpired = new Date();
    otpExpired.setMinutes(otpExpired.getMinutes() + 2);

    const newOtp = await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpired,
      },
    });

    const templatePath = path.join(__dirname, '../templates', 'otp.hbs');
    const dataSendMail = {
      otp: newOtp.otp,
      email: newOtp.email,
    };

    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataSendMail);

    await transporter.sendMail({
      to: email,
      subject: 'Verification email',
      html,
    });

    return { newOtp, token };
  } catch (error) {
    throw error;
  }
};

export const userFormService = async (email: string, body: User) => {
  try {
    const { password, username } = body;

    await notFoundUser(email);

    const hashPass = await hashPassword(password!);

    const updateUser = await prisma.user.update({
      where: { email },
      data: {
        username,
        password: hashPass,
      },
    });

    return updateUser;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (body: User) => {
  try {
    const { email, password } = body;

    const user = await notFoundUser(email);

    if (!user.isVerified)
      throw new Error('User not verify, please verify for login');

    const isValidPass = await compare(password!, user.password!);

    if (!isValidPass)
      throw new Error('Incorrect password, please enter the correct password');

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = createToken(payload, '1h');

    return { user, token };
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await notFoundUser(email);

    const now = new Date();
    if (
      user.resetPassReq &&
      now.getTime() - user.resetPassReq.getTime() < 24 * 60 * 60 * 1000
    ) {
      throw new Error('Password reset can only be done once every 24 hours.');
    }

    await prisma.user.update({
      where: { email },
      data: {
        resetPassReq: now,
      },
    });

    const payload = {
      email: user.email,
    };

    const token = createToken(payload, '1d');
    const link = process.env.BASE_URL_FE + `/forgot-password/${token}`;
    const templatePath = path.join(__dirname, '../templates', 'resetpass.hbs');

    const dataSendMail = {
      link,
      username: user.username || user.email,
    };

    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate(dataSendMail);

    await transporter.sendMail({
      to: email,
      subject: 'Reset password',
      html,
    });

    return { user, token };
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (email: string, password: string) => {
  try {
    await notFoundUser(email);
    const hashPass = await hashPassword(password);

    const newPass = await prisma.user.update({
      where: { email },
      data: {
        password: hashPass,
        resetPassReq: new Date(),
      },
    });

    return newPass;
  } catch (error) {
    throw error;
  }
};
