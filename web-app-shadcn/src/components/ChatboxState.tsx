"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatboxForm from "@/components/ChatboxForm";
import messageIcon from "@/public/chat-fill.svg";
import Image from "next/image";


export default function ChatboxState() {
  const [chatbox, setChatbox] = useState<boolean>(false);

  return (
    <div className={"flex flex-col gap-3 items-end"}>
      {chatbox && (
        <div className={"shadow-2xl bg-white min-w-[24em] max-w-[24em] rounded"}>
          <ChatboxForm />
          {/*<iframe*/}
          {/*  src={"/chatbox"}*/}
          {/*  allowFullScreen*/}
          {/*  width={"400px"}*/}
          {/*  height={"500px"}*/}
          {/*  className={"border-none"}*/}
          {/*/>*/}
        </div>
      )}
      <Button
        type={"button"}
        onClick={() => setChatbox(!chatbox)}
        className={"shadow-2xl max-w-fit rounded bg-green-800"}
      >
        <Image src={messageIcon} className={"invert pr-1"} width={20} height={20} alt={"message icon"} /> Chat With Us
      </Button>
    </div>
  );
}
