"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

const pages: Array<{ title: string; path: string }> = [
  {
    title: "History",
    path: "/history",
  },
  {
    title: "Chatbox",
    path: "/chatbox",
  },
  {
    title: "Demo",
    path: "/demo",
  },
];

export default function NavigationMenu() {
  const segment = useSelectedLayoutSegment();

  // TODO: Add authentication, and have different routes for users / admins
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
      {pages.map((page, index) => (
        <Link
          key={index}
          href={page.path}
          className={cn(
            "text-md font-medium transition-colors hover:underline",
            page.path.startsWith(`/${segment}`)
              ? "text-white/80"
              : "text-white",
          )}
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
}
