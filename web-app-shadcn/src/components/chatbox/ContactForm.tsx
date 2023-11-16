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
import { UserInfoType } from "@/components/ChatboxForm";
import requestResponse from "@/lib/chatbox/requestResponse";
import { messageSubmission } from "@/lib/chatbox/messageSubmission";
import { ChatMessageType } from "@prisma/client";

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
  firstName: z
    .string()
    .trim()
    .min(1, "Your first name is too short!")
    .max(32, "Your first name is too long!"),
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
  pushAnswer: (answer: string) => void;
}) {
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const res = await contactSubmission(data);
          // TODO: show an error state to client
          if (!res)
            return console.error("An error occurred while submitting data");

          pushQuestion(data.question);
          setUserInfo({
            email: data.email,
            firstName: data.firstName,
          });
          setSessionId(res.chatSessions[0].id);

          await requestResponse(data.question).then((ans) => {
            if (!ans) {
              return pushAnswer(
                "Sorry, something went wrong. Try again later.",
              );
            }

            pushAnswer(ans.output);
            messageSubmission(
              res.chatSessions[0].id,
              data.email,
              ChatMessageType.ANSWER,
              ans.output,
            );
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
          name={"firstName"}
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
          Ask Question ✉️
        </Button>
      </form>
    </Form>
  );
}
