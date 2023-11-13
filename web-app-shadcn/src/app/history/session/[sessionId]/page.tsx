import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getChatSessionMessages } from "@/lib/prisma/getChatSessions";

export default async function SessionMessagesPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const messages = await getChatSessionMessages(params.sessionId);

  return (
    <div>
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
              <TableCell>{message.createdAt.toISOString()}</TableCell>
              <TableCell>{message.type}</TableCell>
              <TableCell>{message.message}</TableCell>
              <TableCell className="text-right">
                {message.rating ?? "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
