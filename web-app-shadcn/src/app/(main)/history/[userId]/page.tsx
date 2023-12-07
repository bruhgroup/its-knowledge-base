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
import { redirect } from "next/navigation";
import SessionRows from "@/components/history/SessionsRows";

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
            <TableHead className="text-right">View Messages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SessionRows userId={params.userId} sessions={sessions} />
        </TableBody>
      </Table>
    </>
  );
}
