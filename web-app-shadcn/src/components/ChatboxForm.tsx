"use client";

import ContactForm, {
  ContactFormSchema,
} from "@/components/chatbox/ContactForm";
import { useState } from "react";
import * as z from "zod";
import MessageForm from "@/components/chatbox/MessageForm";

export type UserInfoType = Omit<z.infer<typeof ContactFormSchema>, "question">;

export default function ChatboxForm() {
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [question, setQuestion] = useState<string>();

  return (
    <>
      <div className={"bg-blue-500 h-[3em] flex items-center justify-center"}>
        <span className={"font-semibold text-white"}>How can we help you?</span>
      </div>
      {userInfo ? (
        // TODO: handle if question is not set
        // TODO: handle if question is only spaces
        <MessageForm userInfo={userInfo} initialQuestion={question ?? ""} />
      ) : (
        <ContactForm setUserInfo={setUserInfo} setQuestion={setQuestion} />
      )}
    </>
  );
}
