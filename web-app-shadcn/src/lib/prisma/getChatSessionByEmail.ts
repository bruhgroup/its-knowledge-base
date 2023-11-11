"use server";

import prisma from "@/lib/prisma/prisma";

export default async function getChatSessionByEmail(
  email: string,
  includeMessages: boolean = false,
) {
  return prisma.chatSession.findMany({
    where: { author: { is: { email } } },
    include: { chatMessages: includeMessages },
  });
}
