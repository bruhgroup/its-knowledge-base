"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatboxForm from "@/components/chatbox/ChatboxForm";
import { MessagesSquare } from "lucide-react";

export default function ChatboxState() {
  const [chatbox, setChatbox] = useState<boolean>(false);

  return (
    <div className={"flex flex-col gap-3 items-end"}>
      {chatbox && (
        <div
          className={"shadow-2xl bg-white min-w-[24em] max-w-[24em] rounded"}
        >
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
        <div className={"flex flex-row gap-2"}>
          <MessagesSquare height={20} width={20} fill={"white"} />
          <p>Chat With Us</p>
        </div>
      </Button>
    </div>
  );
}
