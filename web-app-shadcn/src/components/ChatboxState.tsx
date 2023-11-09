"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatboxModal from "@/components/ChatboxModal";

export default function ChatboxState() {
  const [chatbox, setChatbox] = useState<boolean>(false);

  if (chatbox) return <ChatboxModal closeModal={() => setChatbox(!chatbox)} />;
  return (
    <Button type={"button"} onClick={() => setChatbox(!chatbox)}>
      Ask Question
    </Button>
  );
}
