import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import AuthProvider from "@/components/authentication/AuthProvider";
import { cn } from "@/lib/utils";
import ChatboxState from "@/components/ChatboxState";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "its-knowledge-base",
  description: "AI Knowledge Base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-hidden")}>
        {children}
        <div className={"fixed bottom-4 right-8"}>
          <ChatboxState />
        </div>
      </body>
    </html>
  );
}
