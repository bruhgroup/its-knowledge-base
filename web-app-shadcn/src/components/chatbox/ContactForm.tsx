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

export const ContactFormSchema = z.object({
  question: z
    .string()
    .min(6, "Your question is too short!")
    .max(128, "Your question is too long!"),
  email: z
    .string()
    .min(6, "Your email is too short!")
    .max(64, "Your email is too long!"),
  firstName: z
    .string()
    .min(1, "Your first name is too short!")
    .max(32, "Your first name is too long!"),
});

export default function ContactForm({
  setUserInfo,
  setQuestion,
}: {
  setUserInfo: Dispatch<SetStateAction<UserInfoType | undefined>>;
  setQuestion: Dispatch<SetStateAction<string | undefined>>;
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
          if (!res) {
            return console.error("An error occurred while submitting data");
          }

          setUserInfo({
            email: data.email,
            firstName: data.firstName,
          });
          setQuestion(data.question);
        })}
        className={"container w-full p-3 space-y-4"}
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
              <FormLabel>Ask your question</FormLabel>
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
        <Button type={"submit"} className={"w-full"}>
          Ask Question
        </Button>
      </form>
    </Form>
  );
}