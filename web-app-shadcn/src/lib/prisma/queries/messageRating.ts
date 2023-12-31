"use server";

import prisma from "@/lib/prisma/prisma";
import { MessageRatingEnum } from "@/lib/utils";
import { ChatMessageType } from "@prisma/client";

export async function updateMessageRating(
  message_id: string,
  rating: MessageRatingEnum,
) {
  return prisma.chatMessage.update({
    where: { id: message_id },
    data: { rating },
  });
}

export async function statsMessageRatings() {
  return prisma.chatMessage.groupBy({
    by: ["rating"],
    _count: true,
    where: {
      type: ChatMessageType.ANSWER,
      OR: [
        { rating: { in: [0, 1] } }, // messages with upvote or downvote
        { rating: null }, // messages with no votes
      ],
    },
  });
}
