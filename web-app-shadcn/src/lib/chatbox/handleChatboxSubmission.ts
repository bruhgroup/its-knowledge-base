"use server";

import * as z from "zod";
import { ChatboxFormSchema } from "@/components/ChatboxForm";
import prisma from "@/lib/prisma";

export async function handleChatboxSubmission(
  data: z.infer<typeof ChatboxFormSchema>,
) {
  const _where = { email: data.email };
  const _questions = { create: { question: data.question, answer: "Answer" } };

  const user = await prisma.user.findUnique({ where: _where });

  if (!user) {
    const create = prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        questions: _questions,
      },
    });
    console.log(await create);
    return;
  }

  const update = prisma.user.update({
    where: _where,
    data: { updatedAt: new Date(), questions: _questions },
  });
  console.log(await update);
  return;
}
