"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { ContactFormSchema } from "@/components/chatbox/ContactForm";
import { ChatMessageType } from "@prisma/client";

export async function contactSubmission(
  data: z.infer<typeof ContactFormSchema>,
) {
  const _where = { email: data.email };
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

  const user = await prisma.user.findUnique({ where: _where });

  if (!user) {
    return prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        chatSessions: _chatSession,
      },
    });
  }

  return prisma.user.update({
    where: _where,
    data: {
      updatedAt: new Date(),
      chatSessions: _chatSession,
    },
  });
}
