"use server";

import prisma from "@/lib/prisma/prisma";

export default async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
