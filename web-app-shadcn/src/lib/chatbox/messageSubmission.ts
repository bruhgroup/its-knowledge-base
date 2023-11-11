"use server";

import * as z from "zod";
import prisma from "@/lib/prisma/prisma";
import { MessageFormSchema } from "@/components/chatbox/MessageForm";
import { ChatMessageType } from "@prisma/client";

export async function messageSubmission(
  data: z.infer<typeof MessageFormSchema>,
  email: string,
  session_id: string,
) {
  return prisma.user.update({
    where: { email: email },
    data: {
      updatedAt: new Date(),
      chatSessions: {
        update: {
          where: { id: session_id },
          data: {
            chatMessages: {
              create: {
                type: ChatMessageType.QUESTION,
                message: data.question,
              },
            },
          },
        },
      },
    },
  });
}
