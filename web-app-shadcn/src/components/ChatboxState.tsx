"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatboxForm from "@/components/ChatboxForm";

export default function ChatboxState() {
  const [chatbox, setChatbox] = useState<boolean>(false);

  return (
    <div className={"flex flex-col gap-3 items-end"}>
      {chatbox && (
        <div className={"shadow-2xl bg-white min-w-[24em] max-w-[24em]"}>
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
        className={"shadow-2xl max-w-fit"}
      >
        Contact Us
      </Button>
    </div>
  );
}
