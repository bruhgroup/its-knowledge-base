import data from '@/public/data.json'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default function Home() {
    // TODO: fetch data from an API
    const askus = data as Record<string, Record<string, string>>;

    return (
        <main className={"relative p-3"}>
            <Accordion type="single" collapsible className={"w-full"}>
                {Object.keys(askus).map((id, index) => {
                    return (
                        <AccordionItem key={index} value={`question-${id}`}>
                            <AccordionTrigger>Question {id} - {askus[id].question}</AccordionTrigger>
                            <AccordionContent>{askus[id].answer}</AccordionContent>
                        </AccordionItem>)
                })}
            </Accordion>
        </main>
    )
}
