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

const FormSchema = z.object({
  question: z
    .string()
    .min(8, "Your question is too short!")
    .max(128, "Your question is too long!"),
  email: z.string().min(3, "Your email is too short!"),
});

export default function ChatboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container w-full p-3 space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Email</FormLabel>
              <FormControl>
                <Input
                  type={"email"}
                  placeholder={"email@hawaii.edu"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We may contact you in the future.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ask your question</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I need help with..."
                  className="resize-none"
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
        <Button type="submit" className={"w-full"}>
          Ask Question
        </Button>
      </form>
    </Form>
  );
}
