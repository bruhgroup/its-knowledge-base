"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import response from "../../lib/chatbox/requestResponse"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { contactSubmission } from "@/lib/chatbox/contactSubmission";
import { UserInfoType } from "@/components/ChatboxForm";
import { useEffect } from "react";
import { messageSubmission } from "@/lib/chatbox/messageSubmission";
import ChatMessage from "@/components/ChatMessage";
import {ChatMessageType} from "@prisma/client";
import requestResponse from "@/lib/chatbox/requestResponse";

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
  pushMessages
}: {
  userInfo: UserInfoType;
  sessionId: string;
  pushMessages: (question: string, answer : string) => void;
}) {
  const form = useForm<z.infer<typeof MessageFormSchema>>({
    resolver: zodResolver(MessageFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const res = await messageSubmission(data, userInfo.email, sessionId);
          // TODO: show an error state to client
          if (!res) {
            return console.error("An error occurred while submitting data");
          }
          form.reset({ question: "" });
            requestResponse(data.question).then(ans => {
                if (ans) {
                    pushMessages(data.question, ans);
                } else {
                    pushMessages(data.question, "Sorry, I don't understand your question.");
                }
            })
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
                  className={"resize-none"}
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
        <Button type={"submit"} className={"w-full"}>
          Ask Question
        </Button>
      </form>
    </Form>
  );
}
