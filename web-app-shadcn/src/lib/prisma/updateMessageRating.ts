"use server";

import prisma from "@/lib/prisma/prisma";
import { MessageRatingEnum } from "@/lib/utils";

export default async function updateMessageRating(
  message_id: string,
  rating: MessageRatingEnum,
) {
  return prisma.chatMessage.update({
    where: { id: message_id },
    data: { rating },
  });
}
