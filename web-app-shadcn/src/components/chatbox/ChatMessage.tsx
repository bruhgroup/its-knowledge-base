import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessageType } from "@prisma/client";
import Image from "next/image";
import loadingIcon from "@/public/loadingIcon.svg";
import MessageRating from "@/components/chatbox/MessageRating";

export default function ChatMessage({
  type,
  loaded,
  name,
  text,
  image,
  id = "0",
  allowRatings = true,
}: {
  type: ChatMessageType;
  loaded: boolean;
  name: string;
  text: string;
  image?: string | null;
  id?: string;
  allowRatings?: boolean;
}) {
  if (type === ChatMessageType.QUESTION) {
    return (
      <div className={"flex items-end gap-2 justify-end"}>
        <div
          className={
            "bg-blue-400 rounded-s-2xl rounded-tr-2xl p-3 [word-break:break-word]"
          }
        >
          <p>{text}</p>
        </div>
        <Avatar className={"mb-1"}>
          {image && <AvatarImage src={image} />}
          <AvatarFallback className={"text-white bg-black"}>
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }

  const showMessageRating = allowRatings && id !== "0";

  return (
    <div className={"flex items-end gap-2 justify-start"}>
      <Avatar className={showMessageRating ? "mb-7" : ""}>
        <AvatarFallback className={"bg-green-800 text-white"}>
          ITS
        </AvatarFallback>
      </Avatar>
      <div className={"flex flex-col gap-0.5"}>
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
        {showMessageRating && <MessageRating id={id} />}
      </div>
    </div>
  );
}
