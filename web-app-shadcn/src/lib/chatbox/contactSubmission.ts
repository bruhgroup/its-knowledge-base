"use server";

import * as z from "zod";
import prisma from "@/lib/prisma/prisma";
import { ContactFormSchema } from "@/components/chatbox/ContactForm";
import { ChatMessageType } from "@prisma/client";
import { getUser } from "@/lib/prisma/getUsers";

export async function contactSubmission(
  data: z.infer<typeof ContactFormSchema>,
) {
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

  // Selects the most recently added ChatSession object.
  const _select = { chatSessions: { take: -1 } };

  const user = await getUser(data.email);

  if (!user) {
    return prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        chatSessions: _chatSession,
      },
      select: _select,
    });
  }

  return prisma.user.update({
    where: { email: data.email },
    data: {
      updatedAt: new Date(),
      chatSessions: _chatSession,
    },
    select: _select,
  });
}
