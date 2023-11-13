import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessageType } from "@prisma/client";

export default function ChatMessage({
  type,
  name,
  text,
}: {
  type: ChatMessageType;
  name: string;
  text: string;
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
    <div className={"flex items-end gap-2 justify-end"}>
      <Avatar>
        <AvatarFallback>ITS</AvatarFallback>
      </Avatar>
      <div
        className={
          "bg-gray-300 rounded-s-2xl rounded-tr-2xl p-3 [word-break:break-word]"
        }
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
