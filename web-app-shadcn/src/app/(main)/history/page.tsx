import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsersWithSessions } from "@/lib/prisma/getUsers";
import { useServerSession } from "@/lib/authOptions";

export default async function HistoryPage() {
  const session = await useServerSession();
  const users = await getUsersWithSessions(session, true);

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
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.createdAt.toUTCString()}</TableCell>
              <TableCell>{user.updatedAt.toUTCString()}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user._count.chatSessions}</TableCell>
              <TableCell className="text-right">
                <a href={`/history/${user.id}`}>View</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
