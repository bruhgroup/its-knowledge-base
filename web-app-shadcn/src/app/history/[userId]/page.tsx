import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getChatSessions } from "@/lib/prisma/getChatSessions";

export default async function SessionsPage({
  params,
}: {
  params: { userId: string };
}) {
  const sessions = await getChatSessions(params.userId, true);

  return (
    <div>
      <Table>
        <TableCaption>Your chat session history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Session ID</TableHead>
            <TableHead>Time Created</TableHead>
            <TableHead>Message Count</TableHead>
            <TableHead className="text-right">See Messages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{session.id}</TableCell>
              <TableCell>{session.createdAt.toISOString()}</TableCell>
              <TableCell>{session._count.chatMessages}</TableCell>
              <TableCell className="text-right">
                <a href={`/history/session/${session.id}`}>Arrow</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
