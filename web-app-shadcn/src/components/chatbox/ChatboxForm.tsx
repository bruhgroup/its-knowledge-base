"use client";

import ContactForm, {
  ContactFormSchema,
} from "@/components/chatbox/ContactForm";
import { useState } from "react";
import * as z from "zod";
import MessageForm from "@/components/chatbox/MessageForm";
import ChatMessage from "@/components/chatbox/ChatMessage";
import { ChatMessageType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { MessagesSquare } from "lucide-react";

export type UserInfoType = Omit<z.infer<typeof ContactFormSchema>, "question">;

export default function ChatboxForm() {
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [sessionId, setSessionId] = useState<string>();
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [answers, setAnswers] = useState<Array<{ id: string; text: string }>>(
    [],
  );
  const session = useSession();
  console.log(answers);

  return (
    <>
      <div
        className={
          "bg-green-800 h-[3em] flex items-center justify-center rounded-t"
        }
      >
        <div className={"flex flex-row font-semibold text-white gap-2"}>
          <MessagesSquare height={25} width={25} fill={"white"} />
          <p>How can we help you?</p>
        </div>
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
                  text={`Aloha, ${userInfo.name}🌺! I am a virtual assistant. What can I help you with today?`}
                  loaded={true}
                  allowRatings={false}
                />
              </div>
              {questions.map((question, index) => {
                return (
                  <div key={index} className={"space-y-2"}>
                    <div className={"scroller-item"}>
                      <ChatMessage
                        type={ChatMessageType.QUESTION}
                        name={userInfo.name}
                        text={question}
                        image={session.data?.user?.image}
                        loaded={true}
                      />
                    </div>
                    <div className={"scroller-item"}>
                      <ChatMessage
                        type={ChatMessageType.ANSWER}
                        name={"ITS"}
                        text={answers[index]?.text}
                        id={answers[index]?.id}
                        loaded={answers[index] !== undefined}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <MessageForm
            userInfo={userInfo}
            sessionId={sessionId}
            pushQuestion={(question: string) =>
              setQuestions([...questions, question])
            }
            pushAnswer={(answer: { id: string; text: string }) =>
              setAnswers([...answers, answer])
            }
          />
        </>
      ) : (
        <ContactForm
          setUserInfo={setUserInfo}
          pushQuestion={(question: string) =>
            setQuestions([...questions, question])
          }
          pushAnswer={(answer: { id: string; text: string }) =>
            setAnswers([...answers, answer])
          }
          setSessionId={setSessionId}
        />
      )}
    </>
  );
}
