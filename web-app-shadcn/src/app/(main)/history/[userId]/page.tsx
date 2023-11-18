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
import { useServerSession } from "@/lib/authOptions";

export default async function SessionsPage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await useServerSession();
  const sessions = await getChatSessions(params.userId, session, true);

  return (
    <>
      <p>
        You are currently viewing {sessions.length} sessions from user{" "}
        {params.userId}
      </p>
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
    </>
  );
}
