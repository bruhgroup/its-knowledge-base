import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getChatSessionMessages } from "@/lib/prisma/queries/chatSessions";
import { useServerSession } from "@/lib/authOptions";
import { MessageRatingEnum } from "@/lib/utils";
import React from "react";
import DirectoryNavigator from "@/components/history/DirectoryNavigator";

export default async function SessionMessagesPage({
  params,
}: {
  params: { userId: string; sessionId: string };
}) {
  const session = await useServerSession();
  const messages = await getChatSessionMessages(params.sessionId, session);

  return (
    <>
      <DirectoryNavigator userId={params.userId} sessionId={params.sessionId} />
      <p>
        You are currently viewing {messages.length} messages from session{" "}
        {params.sessionId}
      </p>
      <Table>
        <TableCaption>
          Your chat messages for session {params.sessionId}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Session ID</TableHead>
            <TableHead>Time Created</TableHead>
            <TableHead>Message Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((message, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{message.id}</TableCell>
              <TableCell>{message.createdAt.toUTCString()}</TableCell>
              <TableCell>{message.type}</TableCell>
              <TableCell>{message.message}</TableCell>
              <TableCell className="text-right">
                {message.rating !== null
                  ? MessageRatingEnum[message.rating]
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
