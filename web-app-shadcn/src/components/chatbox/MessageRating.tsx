"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { updateMessageRating } from "@/lib/prisma/queries/messageRating";
import { MessageRatingEnum } from "@/lib/utils";

export default function MessageRating({ id }: { id: string }) {
  const [rating, setRating] = useState<Number>(-1);

  return (
    <div className={"flex"}>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={"h-6 w-6 p-1"}
        onClick={() => {
          setRating(MessageRatingEnum.POSITIVE);
          updateMessageRating(id, MessageRatingEnum.POSITIVE);
        }}
      >
        <ThumbsUp
          color={rating === MessageRatingEnum.POSITIVE ? "#329650" : "gray"}
        />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={"h-6 w-6 p-1"}
        onClick={() => {
          setRating(MessageRatingEnum.NEGATIVE);
          updateMessageRating(id, MessageRatingEnum.NEGATIVE);
        }}
      >
        <ThumbsDown
          color={rating === MessageRatingEnum.NEGATIVE ? "#e14b4b" : "gray"}
        />
      </Button>
    </div>
  );
}
