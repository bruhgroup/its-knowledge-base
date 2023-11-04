"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"

const FormSchema = z.object({
    question: z.string(),
})

export default function TextareaForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container w-full p-3 space-y-6">
                <FormField
                    control={form.control}
                    name="question"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Need help?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ask a question"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Your messages may be monitored and reviewed.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className={"w-full"}>Ask Question</Button>
            </form>
        </Form>
    )
}
