"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UserInfoType } from "@/components/chatbox/ChatboxForm";
import { messageSubmission } from "@/lib/chatbox/messageSubmission";
import requestResponse from "@/lib/chatbox/requestResponse";
import { ChatMessageType } from "@prisma/client";
import { SendHorizontal } from "lucide-react";

export const MessageFormSchema = z.object({
  question: z
    .string()
    .trim()
    .min(6, "Your question is too short!")
    .max(128, "Your question is too long!"),
});

export default function MessageForm({
  userInfo,
  sessionId,
  pushQuestion,
  pushAnswer,
}: {
  userInfo: UserInfoType;
  sessionId: string;
  pushQuestion: (question: string) => void;
  pushAnswer: (answer: { id: string; text: string }) => void;
}) {
  const form = useForm<z.infer<typeof MessageFormSchema>>({
    resolver: zodResolver(MessageFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const res = await messageSubmission(
            sessionId,
            userInfo.email,
            ChatMessageType.QUESTION,
            data.question,
          );
          // TODO: show an error state to client
          if (!res) {
            return console.error("An error occurred while submitting data");
          }

          pushQuestion(data.question);
          form.reset({ question: "" });

          const response = await requestResponse(data.question);
          if (!response) {
            return pushAnswer({
              id: "0",
              text: "Sorry, something went wrong. Try again later.",
            });
          }

          const userUpdate = await messageSubmission(
            sessionId,
            userInfo.email,
            ChatMessageType.ANSWER,
            response.output,
          );
          pushAnswer({
            id: userUpdate.chatSessions[0].chatMessages[0].id,
            text: response.output,
          });
        })}
        className={"container w-full p-3 space-y-4"}
      >
        <FormField
          control={form.control}
          name={"question"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={"Enter your question here"}
                  className={"resize-none rounded"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your messages may be monitored and reviewed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={"submit"} className={"w-full bg-green-800"}>
          <SendHorizontal width={20} height={20} />
        </Button>
      </form>
    </Form>
  );
}
