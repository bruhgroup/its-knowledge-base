"use server";

import prisma from "@/lib/prisma/prisma";

export async function getChatSessions(
  user_id: string,
  countMessages: boolean = false,
) {
  return prisma.chatSession.findMany({
    where: { authorId: user_id },
    include: { _count: { select: { chatMessages: countMessages } } },
  });
}

export async function getAllChatSessions(countMessages: boolean = false) {
  return prisma.chatSession.findMany({
    include: {
      _count: { select: { chatMessages: countMessages } },
      author: true,
    },
  });
}

export async function getChatSessionMessages(session_id: string) {
  return prisma.chatMessage.findMany({
    where: { chatSessionId: session_id },
  });
}
