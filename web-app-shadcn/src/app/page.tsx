"use client";

import data from "@/public/data.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatboxModal from "@/components/ChatboxModal";

export default function Home() {
  // TODO: fetch data from an API
  const askus = data as Record<string, Record<string, string>>;
  const [chatbox, setChatbox] = useState<boolean>(false);

  return (
    <main className={"container"}>
      <div className={"fixed bottom-0 right-0 p-5"}>
        {chatbox ? (
          <ChatboxModal closeModal={() => setChatbox(!chatbox)} />
        ) : (
          <Button type={"button"} onClick={() => setChatbox(!chatbox)}>
            Ask Question
          </Button>
        )}
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
