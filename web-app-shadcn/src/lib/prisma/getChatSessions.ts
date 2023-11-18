"use server";

import prisma from "@/lib/prisma/prisma";
import { Session } from "next-auth";
import { UserRole } from "@prisma/client";

export async function getChatSessions(
  user_id: string,
  session: Session | null,
  countMessages: boolean = false,
) {
  return prisma.chatSession.findMany({
    where: {
      userId: user_id,
      user: {
        email:
          session?.user?.role === UserRole.USER
            ? session?.user.email
            : undefined,
      },
    },
    include: { _count: { select: { chatMessages: countMessages } } },
  });
}

export async function getAllChatSessions(countMessages: boolean = false) {
  return prisma.chatSession.findMany({
    include: {
      _count: { select: { chatMessages: countMessages } },
      user: true,
    },
  });
}

export async function getChatSessionMessages(
  session_id: string,
  session: Session | null,
) {
  return prisma.chatMessage.findMany({
    where: {
      chatSessionId: session_id,
      chatSession: {
        user: {
          email:
            session?.user?.role === UserRole.USER
              ? session?.user.email
              : undefined,
        },
      },
    },
  });
}
