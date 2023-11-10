"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { ContactFormSchema } from "@/components/chatbox/ContactForm";

export async function contactSubmission(
  data: z.infer<typeof ContactFormSchema>,
) {
  const _where = { email: data.email };
  const _questions = { create: { question: data.question, answer: "Answer" } };

  const user = await prisma.user.findUnique({ where: _where });

  if (!user) {
    return prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        questions: _questions,
      },
    });
  }

  return prisma.user.update({
    where: _where,
    data: { updatedAt: new Date(), questions: _questions },
  });
}
