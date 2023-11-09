import data from "@/public/data.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChatboxState from "@/components/ChatboxState";

export default function Home() {
  // TODO: fetch data from an API
  const askus = data as Record<string, Record<string, string>>;

  return (
    <main className={"container"}>
      <div className={"fixed bottom-0 right-0 p-5"}>
        <ChatboxState />
      </div>
      <Accordion type="single" collapsible className={"w-full"}>
        {Object.keys(askus).map((id, index) => {
          return (
            <AccordionItem key={index} value={`question-${id}`}>
              <AccordionTrigger>
                Question {id} - {askus[id].question}
              </AccordionTrigger>
              <AccordionContent>{askus[id].answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}
