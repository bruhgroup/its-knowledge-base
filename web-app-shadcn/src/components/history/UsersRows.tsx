"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";
import { UserRole } from "@prisma/client";

export default function UsersRows({
  users,
}: {
  users: ({ _count: { chatSessions: number } } & {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    role: UserRole | null;
    createdAt: Date;
    updatedAt: Date;
  })[];
}) {
  const router = useRouter();

  return users.map((user, index) => {
    const path = `/history/${user.id}`;
    return (
      <TableRow
        key={index}
        onClick={() => router.push(path)}
        className={"cursor-pointer"}
      >
        <TableCell className="font-medium">{user.id}</TableCell>
        <TableCell>{user.createdAt.toUTCString()}</TableCell>
        <TableCell>{user.updatedAt.toUTCString()}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user._count.chatSessions}</TableCell>
        <TableCell>
          <Link href={path} className={"flex justify-end"}>
            <ChevronRightCircle />
          </Link>
        </TableCell>
      </TableRow>
    );
  });
}
