"use client";

import Link from "next/link";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

const pages: Array<{ title: string; path: string }> = [
  {
    title: "History",
    path: "/history",
  },
  {
    title: "Chatbox",
    path: "/chatbox",
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
          "text-lg font-medium transition-colors text-black hover:text-black/80"
        }
      >
        AskUs
      </Link>
      {pages.map((page, index) => (
        <Link
          key={index}
          href={page.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black/80",
            page.path.startsWith(`/${segment}`)
              ? "text-black"
              : "text-black/60",
          )}
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
}
