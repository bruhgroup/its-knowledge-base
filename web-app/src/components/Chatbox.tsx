'use client'

import React, {useState} from 'react';
import {Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {FaPaperPlane} from "react-icons/fa6";

export default function Chatbox() {
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
                        variant={"bordered"}
                        placeholder={"Ask a question"}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button disableRipple className={"w-full"} startContent={<FaPaperPlane/>}
                            type={"submit"}>Send Question</Button>
                </form>
            </div>
        </div>
    );
}
