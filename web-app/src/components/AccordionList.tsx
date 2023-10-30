'use client'

import {Accordion, AccordionItem} from "@nextui-org/accordion";

export default function AccordionList({data}: { data: Record<string, Record<string, string>> }) {
    return <Accordion isCompact>
        {Object.keys(data).map(id => {
            return <AccordionItem key={id} aria-label={id} title={`${id} - ${data[id].question}`}>
                {data[id].answer}
            </AccordionItem>
        })}
    </Accordion>
}