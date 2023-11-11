"use client";

import ContactForm, {
  ContactFormSchema,
} from "@/components/chatbox/ContactForm";
import { useState } from "react";
import * as z from "zod";
import MessageForm from "@/components/chatbox/MessageForm";
import ChatMessage from "@/components/ChatMessage";
import { ChatMessageType } from "@prisma/client";

export type UserInfoType = Omit<z.infer<typeof ContactFormSchema>, "question">;

export default function ChatboxForm() {
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [questions, setQuestions] = useState<Array<string>>([]);

  return (
    <>
      <div className={"bg-blue-500 h-[3em] flex items-center justify-center"}>
        <span className={"font-semibold text-white"}>How can we help you?</span>
      </div>
      {userInfo ? (
        <>
          <div className={"scroller p-3 min-h-[20em] max-h-[20em]"}>
            <div className={"scroller-content space-y-2"}>
              {questions.map((question, index) => (
                <div key={index} className={"scroller-item"}>
                  <ChatMessage
                    type={ChatMessageType.QUESTION}
                    name={userInfo.firstName}
                    text={question}
                  />
                </div>
              ))}
            </div>
          </div>

          {/*TODO: handle if question is not set*/}
          {/*TODO: handle if question is only spaces*/}
          <MessageForm
            userInfo={userInfo}
            pushQuestion={(question: string) =>
              setQuestions([...questions, question])
            }
          />
        </>
      ) : (
        <ContactForm
          setUserInfo={setUserInfo}
          pushQuestion={(question: string) =>
            setQuestions([...questions, question])
          }
        />
      )}
    </>
  );
}
