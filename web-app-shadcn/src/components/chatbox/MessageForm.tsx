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
import { ContactFormSchema } from "@/components/chatbox/ContactForm";
import { contactSubmission } from "@/lib/chatbox/contactSubmission";

export const MessageFormSchema = z.object({
  question: z
    .string()
    .min(6, "Your question is too short!")
    .max(128, "Your question is too long!"),
});

export default function MessageForm({
  userInfo,
}: {
  userInfo: z.infer<typeof ContactFormSchema>;
}) {
  const form = useForm<z.infer<typeof MessageFormSchema>>({
    resolver: zodResolver(MessageFormSchema),
  });

  // TODO: Add ai/human chat exchange
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          contactSubmission({
            email: userInfo.email,
            firstName: userInfo.firstName,
            question: userInfo.question,
          }),
        )}
        className={"container w-full p-3 space-y-4"}
      >
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
