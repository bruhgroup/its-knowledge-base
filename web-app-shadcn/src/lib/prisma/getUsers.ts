"use server";

import prisma from "@/lib/prisma/prisma";
import { Session } from "next-auth";
import { Prisma, UserRole } from "@prisma/client";
import UserWhereInput = Prisma.UserWhereInput;

export async function getUser(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUsersWithSessions(
  session: Session | null,
  countSessions: boolean = false,
) {
  const where: UserWhereInput = { chatSessions: { some: {} } };
  if (session?.user?.role === UserRole.USER) {
    where.email = session.user.email;
  }

  return prisma.user.findMany({
    where,
    include: { _count: { select: { chatSessions: countSessions } } },
    orderBy: { updatedAt: "asc" },
  });
}
