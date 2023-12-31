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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";
import { contactSubmission } from "@/lib/chatbox/contactSubmission";
import { UserInfoType } from "@/components/chatbox/ChatboxForm";
import requestResponse from "@/lib/chatbox/requestResponse";
import { messageSubmission } from "@/lib/chatbox/messageSubmission";
import { ChatMessageType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SendHorizontal } from "lucide-react";

export const ContactFormSchema = z.object({
  question: z
    .string()
    .trim()
    .min(6, "Your question is too short!")
    .max(128, "Your question is too long!"),
  email: z
    .string()
    .trim()
    .min(6, "Your email is too short!")
    .max(64, "Your email is too long!"),
  name: z
    .string()
    .trim()
    .min(1, "Your name is too short!")
    .max(32, "Your name is too long!"),
});

export default function ContactForm({
  setUserInfo,
  setSessionId,
  pushQuestion,
  pushAnswer,
}: {
  setUserInfo: Dispatch<SetStateAction<UserInfoType | undefined>>;
  setSessionId: (session_id: string) => void;
  pushQuestion: (question: string) => void;
  pushAnswer: (answer: { id: string; text: string }) => void;
}) {
  const session = useSession();
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: session.data?.user?.email ?? "",
      name: session.data?.user?.name ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const res = await contactSubmission(data);
          // TODO: show an error state to client
          if (!res) {
            return console.error("An error occurred while submitting data");
          }

          pushQuestion(data.question);
          setUserInfo({
            email: data.email,
            name: data.name,
          });
          setSessionId(res.chatSessions[0].id);

          const response = await requestResponse(data.question);
          if (!response) {
            return pushAnswer({
              id: "0",
              text: "Sorry, something went wrong. Try again later.",
            });
          }

          const userUpdate = await messageSubmission(
            res.chatSessions[0].id,
            data.email,
            ChatMessageType.ANSWER,
            response.output,
          );
          pushAnswer({
            id: userUpdate.chatSessions[0].chatMessages[0].id,
            text: response.output,
          });
        })}
        className={"container w-full p-5 space-y-4"}
      >
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type={"email"}
                  placeholder={"email@hawaii.edu"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type={"text"} placeholder={"John"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"question"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={"I need help with..."}
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
        <Button type={"submit"} className={"w-full bg-green-800"}>
          <SendHorizontal width={20} height={20} />
        </Button>
      </form>
    </Form>
  );
}
