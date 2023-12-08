"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

const pages: Array<{ title: string; path: string; auth?: boolean }> = [
  { title: "History", path: "/history" },
  { title: "Chatbox", path: "/chatbox" },
  { title: "Demo", path: "/demo" },
  { title: "Analytics", path: "/analytics", auth: true },
];

export default function NavigationLinks({ isAdmin }: { isAdmin: boolean }) {
  const segment = useSelectedLayoutSegment();

  return pages.map((page, index) => {
    if (page.auth && !isAdmin) return;
    return (
      <Link
        key={index}
        href={page.path}
        className={cn(
          "text-md font-medium transition-colors hover:underline text-white",
          page.path.startsWith(`/${segment}`) && "underline underline-offset-2",
        )}
      >
        {page.title}
      </Link>
    );
  });
}
