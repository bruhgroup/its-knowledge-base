"use server";

import prisma from "@/lib/prisma/prisma";
import { Session } from "next-auth";
import { UserRole } from "@prisma/client";

export async function chatSessions(
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
    orderBy: { createdAt: "asc" },
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
    orderBy: { createdAt: "asc" },
  });
}

export async function getLatestQuestions(take: number) {
  return prisma.chatMessage.findMany({
    take,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      type: "QUESTION",
    },
    select: {
      createdAt: true,
      message: true,
      chatSession: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
}

export async function getSessionElapsedTimes() {
  // Select every first message in each session.
  const firstMessageInSessions = await prisma.chatSession.findMany({
    select: {
      id: true,
      chatMessages: {
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        take: 1,
      },
    },
  });

  const elapsedTime = firstMessageInSessions.map(async (session) => {
    const firstMessageTime = session.chatMessages[0]?.createdAt;

    // Subquery to get the last message's createdAt for the session
    const lastMessageTime = await prisma.chatMessage.findFirst({
      where: {
        chatSessionId: session.id,
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // getTime() is in milliseconds, so convert it to seconds by dividing 1000.
    return firstMessageTime && lastMessageTime?.createdAt
      ? (lastMessageTime.createdAt.getTime() - firstMessageTime.getTime()) /
          1000
      : null;
  });

  return Promise.all(elapsedTime);
}
