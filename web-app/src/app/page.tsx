import data from '@/public/data.json'
import AccordionList from "@/components/AccordionList";

export default function Home() {
    const askus = data as Record<string, Record<string, string>>;

    return (
        <main>
            <AccordionList data={askus}/>
        </main>
    )
}
