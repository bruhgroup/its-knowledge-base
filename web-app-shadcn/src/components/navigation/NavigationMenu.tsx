import Link from "next/link";
import React from "react";
import NavigationLinks from "@/components/navigation/NavigationLinks";
import { useServerSession } from "@/lib/authOptions";
import { UserRole } from "@prisma/client";

export default async function NavigationMenu() {
  const session = await useServerSession();
  return (
    <nav className={"flex items-center space-x-4 lg:space-x-6 mx-6"}>
      <Link
        href={"/"}
        className={
          "text-3xl font-medium transition-colors text-white hover:underline"
        }
      >
        AskUs🌈
      </Link>
      <NavigationLinks isAdmin={session?.user?.role === UserRole.ADMIN} />
    </nav>
  );
}
