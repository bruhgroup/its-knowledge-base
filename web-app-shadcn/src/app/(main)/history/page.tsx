import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsersWithSessions } from "@/lib/prisma/getUsers";
import { useServerSession } from "@/lib/authOptions";
import UsersRows from "@/components/history/UsersRows";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const session = await useServerSession();
  const users = await getUsersWithSessions(session, true);

  if (session?.user?.role === UserRole.USER) {
    if (users.length === 0)
      return (
        <p>You have not started a chat yet. Try again after creating one.</p>
      );
    else redirect(`/history/${users[0].id}`);
  }

  return (
    <>
      <p>You are currently viewing {users.length} users with chat sessions</p>
      <p>
        You can click on the &quot;View User&quot; button to view specific user
        sessions and inspect their messages
      </p>
      <Table>
        <TableCaption>All users with chat sessions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>Time Registered</TableHead>
            <TableHead>Time Updated</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Session Count</TableHead>
            <TableHead className="text-right">View User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <UsersRows users={users} />
        </TableBody>
      </Table>
    </>
  );
}
