"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRightCircle } from "lucide-react";
import { UserRole } from "@prisma/client";

export default function QuestionsRows({
  questions,
}: {
  questions: {
    createdAt: Date;
    message: string;
    chatSession: { id: string; user: { id: string } };
  }[];
}) {
  const router = useRouter();

  return questions.map((question, index) => {
    const userId = question.chatSession.user.id;
    const sessionId = question.chatSession.id;
    const path = `/history/${userId}/${sessionId}`;
    return (
      <TableRow
        key={index}
        onClick={() => router.push(path)}
        className={"cursor-pointer"}
      >
        <TableCell className="font-medium">{userId}</TableCell>
        <TableCell>{sessionId}</TableCell>
        <TableCell>{question.createdAt.toUTCString()}</TableCell>
        <TableCell>{question.message}</TableCell>
        <TableCell>
          <Link href={path} className={"flex justify-end"}>
            <ChevronRightCircle />
          </Link>
        </TableCell>
      </TableRow>
    );
  });
}
