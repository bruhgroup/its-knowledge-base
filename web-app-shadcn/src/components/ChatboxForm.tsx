"use client";

import ContactForm, {
  ContactFormSchema,
} from "@/components/chatbox/ContactForm";
import { useState } from "react";
import * as z from "zod";
import MessageForm from "@/components/chatbox/MessageForm";

export default function ChatboxForm() {
  const [userInfo, setUserInfo] = useState<z.infer<typeof ContactFormSchema>>();

  console.log(userInfo);
  return (
    <>
      <div className={"bg-blue-500 h-[3em] flex items-center justify-center"}>
        <span className={"font-semibold text-white"}>How can we help you?</span>
      </div>
      {userInfo ? (
        <MessageForm userInfo={userInfo} />
      ) : (
        <ContactForm setUserInfo={setUserInfo} />
      )}
    </>
  );
}
