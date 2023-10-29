import data from '@/public/data.json'
import AccordionList from "@/components/AccordionList";
import {Button} from "@nextui-org/button";
import {FaMessage} from "react-icons/fa6";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import Chatbox from "@/components/Chatbox";

export default function Home() {
    // TODO: fetch data from an API
    const askus = data as Record<string, Record<string, string>>;

    return (
        <main className={"relative p-3"}>
            <AccordionList data={askus}/>
            <div className={"fixed bottom-5 right-5"}>
                <Popover placement={"bottom"} offset={10}>
                    <PopoverTrigger>
                        <Button disableRipple startContent={<FaMessage/>}>Message Chatbot</Button>
                    </PopoverTrigger>
                    <PopoverContent className={"w-[240px] bg-gray-200"}>
                        <Chatbox/>
                    </PopoverContent>
                </Popover>
            </div>
        </main>
    )
}
