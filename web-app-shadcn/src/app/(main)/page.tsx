import data from "@/public/data.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChatboxState from "@/components/ChatboxState";

export default function HomePage() {
  // TODO: fetch data from an API
  const askus = data as Record<string, Record<string, string>>;

  return (
    <>
      <div className={"fixed bottom-4 right-8"}>
        <ChatboxState />
      </div>

      <main className={"container"}>
        {/*<iframe*/}
        {/*  src={"https://www.hawaii.edu/help/chat/"}*/}
        {/*  className={"h-screen"}*/}
        {/*></iframe>*/}
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
    </>
  );
}
