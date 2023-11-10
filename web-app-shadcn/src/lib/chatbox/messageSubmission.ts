"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { MessageFormSchema } from "@/components/chatbox/MessageForm";

export async function messageSubmission(
  data: z.infer<typeof MessageFormSchema>,
  email: string,
) {
  const _where = { email: email };
  const _questions = { create: { question: data.question, answer: "Answer" } };

  return prisma.user.update({
    where: _where,
    data: { updatedAt: new Date(), questions: _questions },
  });
}
