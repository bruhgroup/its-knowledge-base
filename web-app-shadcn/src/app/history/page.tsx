import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getChatSessionByEmail from "@/lib/prisma/getChatSessionByEmail";

export default async function HistoryPage() {
  const sessions = await getChatSessionByEmail("hello@gmail.com", true);
  console.log(sessions[0].chatMessages);
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
              <TableCell>{session.chatMessages.length}</TableCell>
              <TableCell className="text-right">Arrow</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
