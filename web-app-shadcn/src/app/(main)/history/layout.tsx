import React from "react";
import { useServerSession } from "@/lib/authOptions";
import { UserRole } from "@prisma/client";

export default async function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await useServerSession();

  return (
    <section className={"container"}>
      <div className={"flex flex-col my-5 items-center gap-5"}>
        {session?.user?.role === UserRole.ADMIN && (
          <h1 className={"font-bold border-b-2 border-b-gray-500"}>
            You are viewing as an admin user
          </h1>
        )}
        {children}
      </div>
    </section>
  );
}
