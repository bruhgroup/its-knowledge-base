"use client";

import ContactForm, {
  ContactFormSchema,
} from "@/components/chatbox/ContactForm";
import { useState } from "react";
import * as z from "zod";
import MessageForm from "@/components/chatbox/MessageForm";
import ChatMessage from "@/components/ChatMessage";
import { ChatMessageType } from "@prisma/client";
import messageIcon from "@/public/chat-fill.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";

export type UserInfoType = Omit<z.infer<typeof ContactFormSchema>, "question">;

export default function ChatboxForm() {
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [sessionId, setSessionId] = useState<string>();
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [answers, setAnswers] = useState<Array<string>>([]);
  const session = useSession();

  return (
    <>
      <div
        className={
          "bg-green-800 h-[3em] flex items-center justify-center rounded-t"
        }
      >
        <span className={"font-semibold text-white"}>
          <Image
            src={messageIcon}
            className={"invert pr-1 inline"}
            width={25}
            height={25}
            alt={"message icon"}
          />
          How can we help you?
        </span>
      </div>
      {/*TODO: handle when userInfo / sessionId is invalid*/}
      {userInfo && sessionId ? (
        <>
          <div className={"scroller p-3 min-h-[20em] max-h-[20em]"}>
            <div className={"scroller-content space-y-2"}>
              <div className={"scroller-item"}>
                <ChatMessage
                  type={ChatMessageType.ANSWER}
                  name={"ITS"}
                  text={`Aloha, ${userInfo.firstName}🌺! I am a virtual assistant. What can I help you with today?`}
                  loaded={true}
                />
              </div>
              {questions.map((question, index) => {
                return (
                  <div key={index} className={"space-y-2"}>
                    <div className={"scroller-item"}>
                      <ChatMessage
                        type={ChatMessageType.QUESTION}
                        name={userInfo.firstName}
                        text={question}
                        image={session.data?.user?.image}
                        loaded={true}
                      />
                    </div>
                    <div className={"scroller-item"}>
                      <ChatMessage
                        type={ChatMessageType.ANSWER}
                        name={"ITS"}
                        text={answers[index]}
                        loaded={answers[index] !== undefined}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/*TODO: handle if question is not set*/}
          {/*TODO: handle if question is only spaces*/}
          <MessageForm
            userInfo={userInfo}
            sessionId={sessionId}
            pushQuestion={(question: string) =>
              setQuestions([...questions, question])
            }
            pushAnswer={(answer: string) => setAnswers([...answers, answer])}
          />
        </>
      ) : (
        <ContactForm
          setUserInfo={setUserInfo}
          pushQuestion={(question: string) =>
            setQuestions([...questions, question])
          }
          pushAnswer={(answer: string) => setAnswers([...answers, answer])}
          setSessionId={setSessionId}
        />
      )}
    </>
  );
}
