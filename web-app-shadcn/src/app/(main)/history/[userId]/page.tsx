import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getChatSessions } from "@/lib/prisma/getChatSessions";
import { useServerSession } from "@/lib/authOptions";
import SessionRows from "@/components/history/SessionsRows";
import React from "react";
import DirectoryNavigator from "@/components/history/DirectoryNavigator";

export default async function SessionsPage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await useServerSession();
  const sessions = await getChatSessions(params.userId, session, true);

  return (
    <>
      <DirectoryNavigator userId={params.userId} />
      <p>You are currently viewing {sessions.length} chat sessions.</p>
      <p>
        You can click on the &quot;View Messages&quot; button to view your
        messages in that session.
      </p>{" "}
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
