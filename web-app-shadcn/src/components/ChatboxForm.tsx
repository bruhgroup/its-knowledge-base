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
  const [sessionId, setSessionId] = useState<string>();
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [answers, setAnswers] = useState<Array<string>>([]);

  return (
    <>
      <div className={"bg-blue-500 h-[3em] flex items-center justify-center"}>
        <span className={"font-semibold text-white"}>How can we help you?</span>
      </div>
      {/*TODO: handle when userInfo / sessionId is invalid*/}
      {userInfo && sessionId ? (
        <>
          <div className={"scroller p-3 min-h-[20em] max-h-[20em]"}>
            <div className={"scroller-content space-y-2"}>
              {questions.map((question, index) => {
                return (
                  <div key={index} className={"space-y-2"}>
                    <div className={"scroller-item"}>
                      <ChatMessage
                        type={ChatMessageType.QUESTION}
                        name={userInfo.firstName}
                        text={question}
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
