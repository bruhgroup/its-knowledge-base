"use server";

import prisma from "@/lib/prisma/prisma";
import { ChatMessageType } from "@prisma/client";

export async function messageSubmission(
  session_id: string,
  email: string,
  type: ChatMessageType,
  message: string,
) {
  return prisma.user.update({
    where: { email },
    data: {
      updatedAt: new Date(),
      chatSessions: {
        update: {
          where: { id: session_id },
          data: {
            chatMessages: {
              create: {
                type,
                message,
              },
            },
          },
        },
      },
    },
    select: {
      chatSessions: {
        take: -1,
        select: {
          chatMessages: { take: -1 },
        },
      },
    },
  });
}
