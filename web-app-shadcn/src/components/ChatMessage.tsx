import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessageType } from "@prisma/client";
import Image from "next/image";
import loadingIcon from "@/public/loadingIcon.svg";

export default function ChatMessage({
  type,
  loaded,
  name,
  text,
}: {
  type: ChatMessageType;
  name: string;
  text: string;
  loaded: boolean;
}) {
  if (type === ChatMessageType.QUESTION) {
    return (
      <div className={"flex items-end gap-2 justify-end"}>
        <div
          className={
            "bg-gray-300 rounded-s-2xl rounded-tr-2xl p-3 [word-break:break-word]"
          }
        >
          <p>{text}</p>
        </div>
        <Avatar className={"mb-1"}>
          <AvatarFallback className={"text-white bg-black"}>
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className={"flex items-end gap-2 justify-start"}>
      <Avatar>
        <AvatarFallback>ITS</AvatarFallback>
      </Avatar>
      <div
        className={
          "bg-gray-300 rounded-e-2xl rounded-tl-2xl p-3 [word-break:break-word]"
        }
      >
        {loaded ? (
          <p>{text}</p>
        ) : (
          <Image src={loadingIcon} alt={"Loading..."} />
        )}
      </div>
    </div>
  );
}
