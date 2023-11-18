import { Inter } from "next/font/google";
import React from "react";
import { cn } from "@/lib/utils";
import ChatboxState from "@/components/chatbox/ChatboxState";
import AuthProvider from "@/components/authentication/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={cn(inter.className, "overflow-hidden")}>
          {children}
          <div className={"fixed bottom-4 right-8"}>
            <ChatboxState />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
