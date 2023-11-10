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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { handleChatboxSubmission } from "@/lib/chatbox/handleChatboxSubmission";

export const ChatboxFormSchema = z.object({
  question: z
    .string()
    .min(8, "Your question is too short!")
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

export default function ChatboxForm() {
  const form = useForm<z.infer<typeof ChatboxFormSchema>>({
    resolver: zodResolver(ChatboxFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
    },
  });

  // TODO: Make a different form page for ask question.
  return (
    <div className={"bg-white"}>
      <div className={"bg-blue-500 h-[3em] flex items-center justify-center"}>
        <span className={"font-semibold text-white"}>How can we help you?</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => handleChatboxSubmission(data))}
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
      </Form>{" "}
    </div>
  );
}
