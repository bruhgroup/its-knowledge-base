"use client"

import React, {useState} from 'react';
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default function ChatWindow() {
    const [question, setQuestion] = useState<string>()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(question)
    }

    return (
        <div className={"px-1 py-2 w-full"}>
            <div className={"flex-row"}>
                <div className={"text-small font-bold"}>Need help?</div>
                <form onSubmit={handleSubmit}>
                    <Textarea
                        placeholder={"Ask a question"}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button className={"w-full"} type={"submit"}>Send Question</Button>
                </form>
            </div>
        </div>
    );
}
