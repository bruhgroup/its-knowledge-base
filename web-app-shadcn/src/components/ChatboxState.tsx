"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatboxForm from "@/components/ChatboxForm";

export default function ChatboxState() {
  const [chatbox, setChatbox] = useState<boolean>(false);

  return (
    <div className={"absolute bottom-4 right-8 flex flex-col gap-3 items-end"}>
      {chatbox && (
        <div className={"shadow-2xl"}>
          <ChatboxForm />
          {/*<iframe*/}
          {/*  src={"/chatbox"}*/}
          {/*  allowFullScreen*/}
          {/*  className={"w-full h-full border-none"}*/}
          {/*/>*/}
        </div>
      )}
      <Button
        type={"button"}
        onClick={() => setChatbox(!chatbox)}
        className={"shadow-2xl max-w-fit"}
      >
        Contact Us
      </Button>
    </div>
  );
}
