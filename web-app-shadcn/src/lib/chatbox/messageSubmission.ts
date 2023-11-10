"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { MessageFormSchema } from "@/components/chatbox/MessageForm";
import { ChatMessageType } from "@prisma/client";

export async function messageSubmission(
  data: z.infer<typeof MessageFormSchema>,
  email: string,
) {
  const _where = { email: email };
  const _chatSession = {
    create: {
      chatMessages: {
        create: {
          type: ChatMessageType.QUESTION,
          message: data.question,
        },
      },
    },
  };

  return prisma.user.update({
    where: _where,
    data: {
      updatedAt: new Date(),
      chatSessions: _chatSession,
    },
  });
}
