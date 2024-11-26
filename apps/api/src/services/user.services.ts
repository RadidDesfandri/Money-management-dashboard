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
    otpExpired.setMinutes(otpExpired.getMinutes() + 5);

    const newUser = await prisma.user.create({
      data: {
        email,
        otp,
        otpExpired,
      },
    });

    const templatePath = path.join(__dirname, '../templates', 'otp.hbs');
    console.log('Template path:', templatePath);

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

    if (otp !== otpToken) throw new Error('Invalid otp code');

    if (user.otpExpired && new Date() > user.otpExpired)
      throw new Error('Otp code has expired');

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
