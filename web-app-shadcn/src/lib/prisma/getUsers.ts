"use server";

import prisma from "@/lib/prisma/prisma";

export async function getUser(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUsersWithSessions(countSessions: boolean = false) {
  return prisma.user.findMany({
    where: { chatSessions: { some: {} } },
    include: { _count: { select: { chatSessions: countSessions } } },
  });
}
