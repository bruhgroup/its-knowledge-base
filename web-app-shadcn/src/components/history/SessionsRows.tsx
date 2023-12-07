"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";

export default function SessionRows({
  userId,
  sessions,
}: {
  userId: string;
  sessions: ({ _count: { chatMessages: number } } & {
    id: string;
    createdAt: Date;
    userId: string;
  })[];
}) {
  const router = useRouter();

  return sessions.map((session, index) => {
    const path = `/history/${userId}/${session.id}`;
    return (
      <TableRow
        key={index}
        onClick={() => router.push(path)}
        className={"cursor-pointer"}
      >
        <TableCell className="font-medium">{session.id}</TableCell>
        <TableCell>{session.createdAt.toUTCString()}</TableCell>
        <TableCell>{session._count.chatMessages}</TableCell>
        <TableCell>
          <Link href={path} className={"flex justify-end"}>
            <ChevronRightCircle />
          </Link>
        </TableCell>
      </TableRow>
    );
  });
}
