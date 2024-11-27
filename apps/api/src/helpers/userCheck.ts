import prisma from '@/prisma';

export const checkExistingEmail = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (user) throw new Error('Email already exist, please change your email');

  return user;
};

export const notFoundUser = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) throw new Error('User notfound!');

  return user;
};

