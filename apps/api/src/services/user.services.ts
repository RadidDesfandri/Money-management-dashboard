import { generateOtp } from '@/helpers/generateOtp';
import handlebars from 'handlebars';
import prisma from '@/prisma';
import path from 'path';
import fs from 'fs';
import { transporter } from '@/helpers/nodemailer';

export const registerService = async (email: string) => {
  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail)
      throw new Error('Email already exist, please change your email');

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
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error('User not found');

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
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new Error('User not found');
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
