import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import NavigationMenu from "@/components/NavigationMenu";
import AuthProvider from "@/components/authentication/AuthProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useServerSession } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "its-knowledge-base",
  description: "AI Knowledge Base",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await useServerSession();

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="flex h-16 items-center px-4 border-b">
            <NavigationMenu />
            {session ? (
              <Link
                href="/auth/logout"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "ml-auto flex items-center",
                )}
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "ml-auto flex items-center",
                )}
              >
                Login
              </Link>
            )}
          </div>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
