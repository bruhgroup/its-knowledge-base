import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessageType } from "@prisma/client";
import Image from "next/image";
import loadingIcon from "@/public/loadingIcon.svg";

export default function ChatMessage({
  type,
  loaded,
  name,
  text,
  image,
}: {
  type: ChatMessageType;
  loaded: boolean;
  name: string;
  text: string;
  image?: string | null;
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

  return (
    <div className={"flex items-end gap-2 justify-start"}>
      <Avatar>
        <AvatarFallback className={"bg-green-800 text-white"}>
          ITS
        </AvatarFallback>
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